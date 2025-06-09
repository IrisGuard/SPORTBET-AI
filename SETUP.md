# 🚀 SPORTBET AI Setup Instructions

## 📋 **Prerequisites**
- Node.js 18+ installed
- Git installed
- GitHub account
- Supabase account
- Vercel account (for deployment)

## 🔧 **Step-by-Step Setup**

### 1. **GitHub Repository Setup**
```bash
# Create new repository on GitHub named "SPORTBET-AI"
# Clone the repository
git clone https://github.com/YOUR_USERNAME/SPORTBET-AI.git
cd SPORTBET-AI

# Copy all project files to this directory
# Then push to GitHub:
git add .
git commit -m "Initial SPORTBET AI platform"
git push origin main
```

### 2. **Supabase Database Setup**

#### A. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and name: **"SPORTBET-AI"**
4. Set strong password
5. Choose region (closest to your users)

#### B. Get Credentials
1. Go to **Settings > API**
2. Copy:
   - `Project URL`
   - `anon public` key

#### C. Run Database Migration
1. Go to **SQL Editor** in Supabase dashboard
2. Copy the entire content from `supabase/migrations/20240101000000_create_enhanced_tables.sql`
3. Paste and click **RUN**
4. Verify tables created in **Table Editor**

### 3. **Local Development Setup**

#### A. Install Dependencies
```bash
npm install
```

#### B. Environment Configuration
Create `.env.local` file in root directory:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### C. Start Development Server
```bash
npm run dev
```
Visit: `http://localhost:5173`

### 4. **Vercel Deployment**

#### A. Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: **"SPORTBET-AI"**

#### B. Configure Environment Variables
In Vercel dashboard:
1. Go to **Settings > Environment Variables**
2. Add:
   ```
   VITE_SUPABASE_URL = https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   ```

#### C. Deploy
1. Click **Deploy**
2. Wait for build completion
3. Your app is live! 🎉

### 5. **Post-Deployment Setup**

#### A. Test Core Features
- [ ] User registration/login
- [ ] Token purchase flow
- [ ] Staking functionality
- [ ] Predictions viewing
- [ ] Dashboard statistics

#### B. Database Verification
Check in Supabase **Table Editor**:
- [ ] `profiles` table populated
- [ ] `staking_pools` has 4 pools
- [ ] `predictions` has sample data
- [ ] `staking_stats` initialized

## 🔒 **Security Checklist**
- [ ] Environment variables not in code
- [ ] RLS policies enabled in Supabase
- [ ] HTTPS only in production
- [ ] Database backups enabled

## 🚨 **Troubleshooting**

### Common Issues:

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Supabase Connection Issues
- Verify URLs and keys in `.env.local`
- Check network/firewall settings
- Ensure RLS policies are correctly set

#### Deployment Issues
- Check environment variables in Vercel
- Verify build logs for errors
- Ensure all dependencies are listed in `package.json`

## 📞 **Support**
If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables
3. Ensure database migration completed successfully
4. Check Supabase logs in dashboard

## ✅ **Success Checklist**
After successful setup, you should be able to:
- [ ] Register new user accounts
- [ ] Purchase SBET tokens
- [ ] View staking pools and stake tokens
- [ ] Browse predictions
- [ ] See real-time dashboard updates
- [ ] Complete transaction flows

---

**Congratulations! Your SPORTBET AI platform is ready! 🎉** 