-- SPORTBET AI - Complete Supabase Database Setup
-- Copy and paste this entire script into Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLES
-- =============================================

-- 1. Enhanced profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    website TEXT,
    bio TEXT,
    location TEXT,
    total_tokens DECIMAL(20, 8) DEFAULT 0,
    total_predictions INTEGER DEFAULT 0,
    correct_predictions INTEGER DEFAULT 0,
    win_rate DECIMAL(5, 2) DEFAULT 0,
    total_earned DECIMAL(20, 8) DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    rank TEXT DEFAULT 'Bronze',
    reputation_score INTEGER DEFAULT 0,
    referral_code TEXT UNIQUE,
    referred_by UUID REFERENCES public.profiles(id),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('purchase', 'stake', 'unstake', 'reward', 'prediction_payout', 'referral_bonus')),
    amount DECIMAL(20, 8) NOT NULL,
    token_amount DECIMAL(20, 8),
    payment_method TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    transaction_hash TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enhanced predictions table
CREATE TABLE IF NOT EXISTS public.predictions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sport TEXT NOT NULL,
    league TEXT NOT NULL,
    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    match_date TIMESTAMP WITH TIME ZONE NOT NULL,
    prediction_type TEXT NOT NULL CHECK (prediction_type IN ('winner', 'over_under', 'handicap', 'both_teams_score')),
    odds DECIMAL(10, 2) NOT NULL,
    confidence INTEGER CHECK (confidence >= 1 AND confidence <= 5),
    analysis TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'won', 'lost', 'cancelled', 'void')),
    result TEXT,
    total_stakes DECIMAL(20, 8) DEFAULT 0,
    total_participants INTEGER DEFAULT 0,
    min_stake DECIMAL(20, 8) DEFAULT 10,
    max_stake DECIMAL(20, 8) DEFAULT 1000,
    created_by UUID REFERENCES public.profiles(id),
    is_featured BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE,
    settled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. User prediction purchases table
CREATE TABLE IF NOT EXISTS public.user_prediction_purchases (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    prediction_id UUID REFERENCES public.predictions(id) ON DELETE CASCADE NOT NULL,
    stake_amount DECIMAL(20, 8) NOT NULL,
    potential_payout DECIMAL(20, 8) NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'won', 'lost', 'refunded')),
    payout_amount DECIMAL(20, 8) DEFAULT 0,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    settled_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, prediction_id)
);

-- 5. Staking pools table
CREATE TABLE IF NOT EXISTS public.staking_pools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    apy DECIMAL(5, 2) NOT NULL,
    lock_period_days INTEGER NOT NULL,
    min_stake DECIMAL(20, 8) NOT NULL,
    max_stake DECIMAL(20, 8),
    total_staked DECIMAL(20, 8) DEFAULT 0,
    total_participants INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    pool_type TEXT DEFAULT 'flexible' CHECK (pool_type IN ('flexible', 'locked', 'vip')),
    requirements JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. User stakes table
CREATE TABLE IF NOT EXISTS public.user_stakes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    pool_id UUID REFERENCES public.staking_pools(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    rewards_earned DECIMAL(20, 8) DEFAULT 0,
    last_reward_claim TIMESTAMP WITH TIME ZONE,
    auto_compound BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Staking stats table for tracking
CREATE TABLE IF NOT EXISTS public.staking_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    total_staked DECIMAL(20, 8) DEFAULT 0,
    total_rewards DECIMAL(20, 8) DEFAULT 0,
    active_stakes_count INTEGER DEFAULT 0,
    completed_stakes_count INTEGER DEFAULT 0,
    average_apy DECIMAL(5, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON public.profiles(referral_code);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_predictions_sport ON public.predictions(sport);
CREATE INDEX IF NOT EXISTS idx_predictions_status ON public.predictions(status);
CREATE INDEX IF NOT EXISTS idx_predictions_match_date ON public.predictions(match_date);
CREATE INDEX IF NOT EXISTS idx_user_prediction_purchases_user_id ON public.user_prediction_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_user_prediction_purchases_prediction_id ON public.user_prediction_purchases(prediction_id);
CREATE INDEX IF NOT EXISTS idx_user_stakes_user_id ON public.user_stakes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stakes_pool_id ON public.user_stakes(pool_id);
CREATE INDEX IF NOT EXISTS idx_user_stakes_status ON public.user_stakes(status);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_prediction_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staking_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staking_stats ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON public.transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Predictions policies
CREATE POLICY "Predictions are viewable by everyone" ON public.predictions
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create predictions" ON public.predictions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- User prediction purchases policies
CREATE POLICY "Users can view own purchases" ON public.user_prediction_purchases
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own purchases" ON public.user_prediction_purchases
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own purchases" ON public.user_prediction_purchases
    FOR UPDATE USING (auth.uid() = user_id);

-- Staking pools policies
CREATE POLICY "Staking pools are viewable by everyone" ON public.staking_pools
    FOR SELECT USING (true);

-- User stakes policies
CREATE POLICY "Users can view own stakes" ON public.user_stakes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own stakes" ON public.user_stakes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stakes" ON public.user_stakes
    FOR UPDATE USING (auth.uid() = user_id);

-- Staking stats policies
CREATE POLICY "Users can view own staking stats" ON public.staking_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own staking stats" ON public.staking_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own staking stats" ON public.staking_stats
    FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    
    INSERT INTO public.staking_stats (user_id)
    VALUES (new.id);
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update token balance
CREATE OR REPLACE FUNCTION public.update_token_balance(
    user_uuid UUID,
    amount DECIMAL(20, 8)
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.profiles
    SET total_tokens = total_tokens + amount,
        updated_at = NOW()
    WHERE id = user_uuid;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate staking rewards
CREATE OR REPLACE FUNCTION public.calculate_staking_rewards(
    stake_id UUID
)
RETURNS DECIMAL(20, 8) AS $$
DECLARE
    stake_record RECORD;
    pool_record RECORD;
    days_staked INTEGER;
    daily_rate DECIMAL(10, 8);
    rewards DECIMAL(20, 8);
BEGIN
    SELECT * INTO stake_record FROM public.user_stakes WHERE id = stake_id;
    SELECT * INTO pool_record FROM public.staking_pools WHERE id = stake_record.pool_id;
    
    days_staked := EXTRACT(DAY FROM (NOW() - stake_record.start_date));
    daily_rate := pool_record.apy / 365.0 / 100.0;
    rewards := stake_record.amount * daily_rate * days_staked;
    
    RETURN rewards;
END;
$$ LANGUAGE plpgsql;

-- Function to update prediction outcome
CREATE OR REPLACE FUNCTION public.update_prediction_outcome(
    prediction_uuid UUID,
    outcome TEXT,
    result_text TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.predictions
    SET status = outcome,
        result = result_text,
        settled_at = NOW(),
        updated_at = NOW()
    WHERE id = prediction_uuid;
    
    -- Update user purchases based on outcome
    IF outcome = 'won' THEN
        UPDATE public.user_prediction_purchases
        SET status = 'won',
            payout_amount = potential_payout,
            settled_at = NOW()
        WHERE prediction_id = prediction_uuid;
        
        -- Update user profiles with winnings
        UPDATE public.profiles
        SET total_earned = total_earned + (
            SELECT COALESCE(SUM(potential_payout), 0)
            FROM public.user_prediction_purchases
            WHERE prediction_id = prediction_uuid
        ),
        correct_predictions = correct_predictions + 1,
        current_streak = current_streak + 1,
        updated_at = NOW()
        WHERE id IN (
            SELECT user_id FROM public.user_prediction_purchases
            WHERE prediction_id = prediction_uuid
        );
    ELSE
        UPDATE public.user_prediction_purchases
        SET status = 'lost',
            settled_at = NOW()
        WHERE prediction_id = prediction_uuid;
        
        -- Reset streak for losing users
        UPDATE public.profiles
        SET current_streak = 0,
            updated_at = NOW()
        WHERE id IN (
            SELECT user_id FROM public.user_prediction_purchases
            WHERE prediction_id = prediction_uuid
        );
    END IF;
    
    -- Update total predictions count
    UPDATE public.profiles
    SET total_predictions = total_predictions + 1,
        updated_at = NOW()
    WHERE id IN (
        SELECT user_id FROM public.user_prediction_purchases
        WHERE prediction_id = prediction_uuid
    );
    
    -- Recalculate win rates
    UPDATE public.profiles
    SET win_rate = CASE 
        WHEN total_predictions > 0 THEN (correct_predictions::DECIMAL / total_predictions::DECIMAL) * 100
        ELSE 0
    END,
    longest_streak = GREATEST(longest_streak, current_streak),
    updated_at = NOW()
    WHERE id IN (
        SELECT user_id FROM public.user_prediction_purchases
        WHERE prediction_id = prediction_uuid
    );
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_predictions_updated_at BEFORE UPDATE ON public.predictions
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_staking_pools_updated_at BEFORE UPDATE ON public.staking_pools
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_user_stakes_updated_at BEFORE UPDATE ON public.user_stakes
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_staking_stats_updated_at BEFORE UPDATE ON public.staking_stats
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Insert default staking pools
INSERT INTO public.staking_pools (name, description, apy, lock_period_days, min_stake, max_stake, pool_type) VALUES
('Flexible Pool', 'Stake and unstake anytime with no lock period', 12.00, 0, 10, 10000, 'flexible'),
('30-Day Lock Pool', 'Higher rewards with 30-day lock period', 18.00, 30, 50, 50000, 'locked'),
('90-Day Lock Pool', 'Premium rewards with 90-day lock period', 25.00, 90, 100, 100000, 'locked'),
('VIP Pool', 'Exclusive pool for high-value stakers', 35.00, 180, 1000, 1000000, 'vip')
ON CONFLICT DO NOTHING;

-- Insert sample predictions
INSERT INTO public.predictions (sport, league, home_team, away_team, match_date, prediction_type, odds, confidence, analysis, min_stake, max_stake, is_featured) VALUES
('Football', 'Premier League', 'Manchester City', 'Liverpool', NOW() + INTERVAL '2 days', 'winner', 2.15, 4, 'Strong home advantage for City, Liverpool missing key players', 10, 1000, true),
('Basketball', 'NBA', 'Lakers', 'Warriors', NOW() + INTERVAL '1 day', 'over_under', 1.90, 3, 'Both teams have strong offensive records this season', 10, 500, false),
('Football', 'Champions League', 'Barcelona', 'PSG', NOW() + INTERVAL '3 days', 'winner', 2.80, 5, 'Barcelona in excellent form, PSG struggling away from home', 20, 2000, true),
('Tennis', 'ATP', 'Djokovic', 'Federer', NOW() + INTERVAL '4 hours', 'winner', 1.65, 4, 'Djokovic has won last 5 meetings', 5, 500, false)
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully! All tables, policies, functions, and sample data have been created.' as status; 