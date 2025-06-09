-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-secret-jwt-token-here';

-- Create enhanced profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  token_balance BIGINT DEFAULT 0,
  total_earned BIGINT DEFAULT 0,
  total_spent BIGINT DEFAULT 0,
  predictions_purchased INTEGER DEFAULT 0,
  successful_predictions INTEGER DEFAULT 0,
  win_streak INTEGER DEFAULT 0,
  max_win_streak INTEGER DEFAULT 0,
  reputation_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create transactions table for all token movements
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'stake', 'unstake', 'prediction_buy', 'prediction_win', 'reward')),
  amount BIGINT NOT NULL,
  description TEXT,
  reference_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create predictions table
CREATE TABLE IF NOT EXISTS predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  sport TEXT NOT NULL,
  league TEXT,
  match_date TIMESTAMP WITH TIME ZONE,
  team_a TEXT NOT NULL,
  team_b TEXT NOT NULL,
  prediction_type TEXT NOT NULL,
  predicted_outcome TEXT NOT NULL,
  confidence INTEGER CHECK (confidence >= 1 AND confidence <= 100),
  price BIGINT NOT NULL,
  is_free BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'won', 'lost', 'cancelled')),
  actual_outcome TEXT,
  settled_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user prediction purchases table
CREATE TABLE IF NOT EXISTS user_prediction_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  prediction_id UUID REFERENCES predictions(id) ON DELETE CASCADE NOT NULL,
  amount_paid BIGINT NOT NULL,
  winnings BIGINT DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'won', 'lost')),
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  settled_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, prediction_id)
);

-- Create staking pools table
CREATE TABLE IF NOT EXISTS staking_pools (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  apy DECIMAL(5,2) NOT NULL,
  min_stake BIGINT NOT NULL,
  max_stake BIGINT,
  duration_days INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user stakes table
CREATE TABLE IF NOT EXISTS user_stakes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  pool_id INTEGER REFERENCES staking_pools(id) NOT NULL,
  amount BIGINT NOT NULL,
  apy DECIMAL(5,2) NOT NULL,
  staked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  unlock_date TIMESTAMP WITH TIME ZONE,
  rewards_earned BIGINT DEFAULT 0,
  is_locked BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true
);

-- Create staking stats table
CREATE TABLE IF NOT EXISTS staking_stats (
  id SERIAL PRIMARY KEY,
  total_staked BIGINT DEFAULT 0,
  total_stakers INTEGER DEFAULT 0,
  average_apy DECIMAL(5,2) DEFAULT 0,
  total_rewards_distributed BIGINT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default staking pools
INSERT INTO staking_pools (name, description, apy, min_stake, duration_days) VALUES
('Flexible Pool', 'Unstake anytime with 12% APY', 12.00, 1000, 0),
('30-Day Lock', '30-day lock period with 18% APY', 18.00, 5000, 30),
('90-Day Lock', '90-day lock period with 25% APY', 25.00, 10000, 90),
('VIP Pool', '180-day lock with maximum rewards', 35.00, 50000, 180)
ON CONFLICT DO NOTHING;

-- Insert initial staking stats
INSERT INTO staking_stats (total_staked, total_stakers, average_apy, total_rewards_distributed) VALUES
(45000000, 8547, 22.5, 2850000)
ON CONFLICT DO NOTHING;

-- Create function to update token balance
CREATE OR REPLACE FUNCTION update_token_balance(user_id UUID, amount_change BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles 
  SET 
    token_balance = GREATEST(0, token_balance + amount_change),
    updated_at = timezone('utc'::text, now())
  WHERE id = user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to process prediction outcome
CREATE OR REPLACE FUNCTION process_prediction_outcome(pred_id UUID, outcome TEXT, multiplier DECIMAL DEFAULT 2.0)
RETURNS VOID AS $$
DECLARE
  purchase_record RECORD;
  winning_amount BIGINT;
BEGIN
  -- Update prediction status
  UPDATE predictions 
  SET 
    status = CASE WHEN outcome = predicted_outcome THEN 'won' ELSE 'lost' END,
    actual_outcome = outcome,
    settled_at = timezone('utc'::text, now())
  WHERE id = pred_id;
  
  -- Process all purchases for this prediction
  FOR purchase_record IN 
    SELECT * FROM user_prediction_purchases WHERE prediction_id = pred_id AND status = 'pending'
  LOOP
    IF outcome = (SELECT predicted_outcome FROM predictions WHERE id = pred_id) THEN
      -- Winning prediction
      winning_amount := FLOOR(purchase_record.amount_paid * multiplier);
      
      UPDATE user_prediction_purchases 
      SET 
        status = 'won',
        winnings = winning_amount,
        settled_at = timezone('utc'::text, now())
      WHERE id = purchase_record.id;
      
      -- Add winnings to user balance
      PERFORM update_token_balance(purchase_record.user_id, winning_amount);
      
      -- Record winning transaction
      INSERT INTO transactions (user_id, transaction_type, amount, description, reference_id)
      VALUES (purchase_record.user_id, 'prediction_win', winning_amount, 
              'Winnings from prediction: ' || (SELECT title FROM predictions WHERE id = pred_id), 
              purchase_record.id);
              
      -- Update user stats
      UPDATE profiles 
      SET 
        successful_predictions = successful_predictions + 1,
        total_earned = total_earned + winning_amount,
        win_streak = win_streak + 1,
        max_win_streak = GREATEST(max_win_streak, win_streak + 1),
        updated_at = timezone('utc'::text, now())
      WHERE id = purchase_record.user_id;
    ELSE
      -- Losing prediction
      UPDATE user_prediction_purchases 
      SET 
        status = 'lost',
        settled_at = timezone('utc'::text, now())
      WHERE id = purchase_record.id;
      
      -- Reset win streak
      UPDATE profiles 
      SET 
        win_streak = 0,
        updated_at = timezone('utc'::text, now())
      WHERE id = purchase_record.user_id;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to calculate staking rewards
CREATE OR REPLACE FUNCTION calculate_staking_rewards()
RETURNS VOID AS $$
DECLARE
  stake_record RECORD;
  daily_reward BIGINT;
  days_staked INTEGER;
BEGIN
  FOR stake_record IN 
    SELECT * FROM user_stakes WHERE is_active = true
  LOOP
    -- Calculate days since last reward calculation (simplified to daily)
    days_staked := EXTRACT(DAY FROM (timezone('utc'::text, now()) - stake_record.staked_at));
    
    IF days_staked > 0 THEN
      -- Calculate daily reward: (amount * apy / 100 / 365)
      daily_reward := FLOOR(stake_record.amount * stake_record.apy / 100 / 365);
      
      -- Update rewards
      UPDATE user_stakes 
      SET 
        rewards_earned = rewards_earned + daily_reward
      WHERE id = stake_record.id;
      
      -- Add to user balance
      PERFORM update_token_balance(stake_record.user_id, daily_reward);
      
      -- Record reward transaction
      INSERT INTO transactions (user_id, transaction_type, amount, description, reference_id)
      VALUES (stake_record.user_id, 'reward', daily_reward, 
              'Daily staking reward', stake_record.id);
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_prediction_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE staking_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE staking_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read predictions" ON predictions FOR SELECT USING (true);
CREATE POLICY "Admins can manage predictions" ON predictions FOR ALL USING (auth.uid() IN (
  SELECT id FROM profiles WHERE email LIKE '%@admin.%'
));

CREATE POLICY "Users can read own purchases" ON user_prediction_purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create purchases" ON user_prediction_purchases FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own stakes" ON user_stakes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create stakes" ON user_stakes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stakes" ON user_stakes FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read staking pools" ON staking_pools FOR SELECT USING (true);
CREATE POLICY "Anyone can read staking stats" ON staking_stats FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_token_balance ON profiles(token_balance);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_predictions_sport ON predictions(sport);
CREATE INDEX IF NOT EXISTS idx_predictions_status ON predictions(status);
CREATE INDEX IF NOT EXISTS idx_predictions_match_date ON predictions(match_date);
CREATE INDEX IF NOT EXISTS idx_user_prediction_purchases_user_id ON user_prediction_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_user_prediction_purchases_prediction_id ON user_prediction_purchases(prediction_id);
CREATE INDEX IF NOT EXISTS idx_user_stakes_user_id ON user_stakes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stakes_pool_id ON user_stakes(pool_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_predictions_updated_at BEFORE UPDATE ON predictions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert some sample predictions
INSERT INTO predictions (
  title, description, sport, league, match_date, team_a, team_b, 
  prediction_type, predicted_outcome, confidence, price, is_featured
) VALUES 
(
  'Real Madrid vs Barcelona', 
  'El Clasico showdown - Real Madrid expected to win at home',
  'Football', 'La Liga', 
  timezone('utc'::text, now() + interval '2 days'),
  'Real Madrid', 'Barcelona',
  'Match Winner', 'Real Madrid Win', 85, 150, true
),
(
  'Lakers vs Warriors', 
  'Lakers looking strong with their home advantage',
  'Basketball', 'NBA',
  timezone('utc'::text, now() + interval '1 day'),
  'Los Angeles Lakers', 'Golden State Warriors',
  'Match Winner', 'Lakers Win', 72, 200, false
),
(
  'Manchester City vs Liverpool', 
  'Premier League title race intensifies',
  'Football', 'Premier League',
  timezone('utc'::text, now() + interval '3 days'),
  'Manchester City', 'Liverpool',
  'Both Teams to Score', 'Yes', 78, 120, true
),
(
  'Panathinaikos vs Olympiacos', 
  'Greek derby with high stakes',
  'Football', 'Super League',
  timezone('utc'::text, now() + interval '4 days'),
  'Panathinaikos', 'Olympiacos',
  'Match Winner', 'Panathinaikos Win', 68, 100, false
)
ON CONFLICT DO NOTHING; 