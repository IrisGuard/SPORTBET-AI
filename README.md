# 🏆 SPORTBET AI - Decentralized Sports Prediction Platform

## 🎯 **Overview**
SPORTBET AI is a comprehensive blockchain-based sports prediction platform with SBET tokens. Users can purchase predictions, stake tokens for passive income, and earn rewards through successful predictions.

## ✨ **Features**

### 💰 **Token Economy**
- **SBET Token System**: Complete token ecosystem
- **Token Purchase**: Buy tokens with 4 packages ($50-$500) + bonus
- **Staking Rewards**: 4 staking pools (12%-35% APY)
- **Payment Methods**: Credit Card, Crypto, Bank Transfer

### 🏆 **Sports Predictions**
- **Real Sports Data**: Live sports data integration
- **Multiple Sports**: Football, Basketball, Tennis, etc.
- **Confidence Levels**: Predictions with success percentages
- **Win/Loss Tracking**: Complete user statistics

### 🎮 **User Experience**
- **Modern UI**: Responsive design with dark theme
- **Real-time Updates**: Live data with React Query
- **Personal Dashboard**: User stats and analytics
- **Mobile Responsive**: Works on all devices

### 🔒 **Security & Data**
- **Supabase Backend**: Secure PostgreSQL database
- **RLS Policies**: Row Level Security
- **JWT Authentication**: Secure user authentication
- **Transaction History**: Complete audit trail

## 🛠️ **Tech Stack**

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** + **shadcn-ui**
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Lucide React** for icons

### Backend
- **Supabase** (PostgreSQL + Auth + RLS)
- **Database Functions** for business logic
- **Real-time subscriptions**

### Blockchain
- **Solana Web3.js** for token operations
- **SPL Token** support

## 🚀 **Installation & Setup**

### Prerequisites
- Node.js 18+
- Supabase account
- Git

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/SPORTBET-AI.git
cd SPORTBET-AI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
1. Create new Supabase project
2. Go to **SQL Editor**
3. Run the `supabase/migrations/20240101000000_create_enhanced_tables.sql`
4. Verify tables in **Table Editor**

### 5. Start Development
```bash
npm run dev
```

## 📱 **Deployment**

### Vercel Deployment
1. **Connect Repository**: Connect GitHub repo to Vercel
2. **Environment Variables**: Add Supabase credentials
3. **Deploy**: Auto-deploy on push

### Environment Variables for Vercel:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🗄️ **Database Schema**

### Core Tables
- **profiles**: User data + token balances
- **transactions**: All token movements
- **predictions**: Sports predictions data
- **user_prediction_purchases**: User purchases
- **staking_pools**: Staking configurations
- **user_stakes**: User staking positions
- **staking_stats**: Platform statistics

### Key Features
- **RLS Security**: Row-level security policies
- **Database Functions**: Business logic in PostgreSQL
- **Automated Triggers**: Update timestamps
- **Performance Indexes**: Optimized queries

## 🎯 **Usage**

### User Journey
1. **Register/Login**: Secure authentication
2. **Buy Tokens**: Purchase SBET tokens
3. **Browse Predictions**: Explore sports predictions
4. **Purchase Predictions**: Buy with tokens
5. **Stake Tokens**: Earn passive rewards
6. **Track Performance**: View wins/losses

### Admin Features
- **Manage Predictions**: Add/update predictions
- **Monitor Platform**: View statistics
- **User Management**: Handle user issues

## 🏗️ **Project Structure**
```
src/
├── components/
│   ├── ui/              # shadcn-ui components
│   ├── layout/          # Layout components
│   └── predictions/     # Prediction components
├── pages/
│   ├── Dashboard.tsx    # Main dashboard
│   ├── BuyToken.tsx     # Token purchase
│   ├── Staking.tsx      # Staking interface
│   └── Predictions.tsx  # Predictions marketplace
├── context/
│   └── AuthContext.tsx  # Authentication
├── integrations/
│   └── supabase/        # Supabase client
└── services/           # Business logic
```

## 📊 **Features Overview**

### ✅ Completed Features
- [x] Complete UI/UX design
- [x] User authentication
- [x] Token purchase system
- [x] Staking mechanism
- [x] Sports predictions
- [x] User dashboard
- [x] Transaction history
- [x] Real-time updates
- [x] Responsive design
- [x] Multi-language support

### 🔮 Future Features
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Social features
- [ ] More sports
- [ ] Live betting
- [ ] Affiliate system

## 🤝 **Contributing**
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 **License**
MIT License - see LICENSE file

## 📞 **Support**
- Email: support@sportbetai.com
- Documentation: [Coming Soon]
- Community: [Discord/Telegram]

---

### 🎉 **Ready for Production!**
SPORTBET AI is ready for deployment with all features implemented and tested.

**Built with ❤️ for the sports prediction community**
