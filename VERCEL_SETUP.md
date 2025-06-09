# VERCEL DEPLOYMENT SETUP - SPORTBET AI

## 🚀 ΒΗΜΑ ΠΡΟ ΒΗΜΑ ΟΔΗΓΟΣ ΓΙΑ VERCEL

### 1. ΠΗΓΑΙΝΕ ΣΤΟ VERCEL DASHBOARD

1. Πήγαινε στο [vercel.com](https://vercel.com)
2. Κάνε login με GitHub
3. Κλικ **"Add New Project"**
4. Import το repository: **`IrisGuard/SPORTBET-AI`**

### 2. ΠΡΟΣΘΕΣΕ TA ENVIRONMENT VARIABLES

Στο Vercel dashboard → **Settings** → **Environment Variables**

Κάνε copy-paste αυτά τα κλειδιά:

---

## 📋 ENVIRONMENT VARIABLES (ΑΝΤΙΓΡΑΨΕ ΑΥΤΑ)

### ✅ VITE_SUPABASE_URL
```
VITE_SUPABASE_URL
```
**Value:**
```
https://elizkeyziqbqkuqhcvq.supabase.co
```

---

### ✅ VITE_SUPABASE_ANON_KEY  
```
VITE_SUPABASE_ANON_KEY
```
**Value:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsaXprZXl6aXFicWt1cWhjdnEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNzU3ODYwOCwiZXhwIjoyMDUzMTU0NjA4fQ.v5d2g8YoT5O5OTXWl_6GNzd-8NfLR0NF6d6c1cBlA2s
```

---

### ✅ VITE_SUPABASE_SERVICE_KEY (Optional - για admin features)
```
VITE_SUPABASE_SERVICE_KEY
```
**Value:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsaXprZXl6aXFicWt1cWhjdnEiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzM3NTc4NjA4LCJleHAiOjIwNTMxNTQ2MDh9.dXBhYmFzZV9qd3Rfc2VjcmV0X2lzX25vdF9zdXBwb3J0ZWRfaW5fcHJvZHVjdGlvbi1ldmVudC1kcml2ZW4tYWZmYWlycy1hcmUtdXNlZC1pbnN0ZWFkLWFuZC1wcm9kdWN0aW9uLW9ubHktZmVhdHVyZXMtYXJlLWF2YWlsYWJsZS1vbmx5LWluLWVudGVycHJpc2UtcGxhbnM
```

---

### ✅ VITE_SUPABASE_JWT_SECRET (Optional - για advanced features)
```
VITE_SUPABASE_JWT_SECRET
```
**Value:**
```
A3AHV9WIL4SGtBK0Cr0R9gSbeifDd3s6vwZ5ALDyITlrztpSrhvwRDuzXU+ilKDqE
```

---

### ✅ VITE_SOLANA_RPC_URL (Optional - για Solana features)
```
VITE_SOLANA_RPC_URL
```
**Value:**
```
https://api.mainnet-beta.solana.com
```

---

## 🎯 ΒΗΜΑΤΑ ΣΤΟΥ VERCEL:

### ΒΗΜΑ 1: Add Environment Variable
1. Κλικ **"Add New"** στο Environment Variables
2. Copy-paste το **Name** (π.χ. `VITE_SUPABASE_URL`)
3. Copy-paste το **Value** 
4. Environment: **Production, Preview, Development** (όλα)
5. Κλικ **"Save"**

### ΒΗΜΑ 2: Επανάλαβε για όλα τα variables
- `VITE_SUPABASE_URL` ← ΥΠΟΧΡΕΩΤΙΚΟ
- `VITE_SUPABASE_ANON_KEY` ← ΥΠΟΧΡΕΩΤΙΚΟ  
- `VITE_SUPABASE_SERVICE_KEY` ← Optional
- `VITE_SUPABASE_JWT_SECRET` ← Optional
- `VITE_SOLANA_RPC_URL` ← Optional

### ΒΗΜΑ 3: Deploy
1. Μετά από τα environment variables, κλικ **"Deploy"**
2. Περίμενε 2-3 λεπτά για το build
3. Θα σου δώσει ένα URL: `https://sportbet-ai-xyz.vercel.app`

---

## 🔧 ΑΝ ΕΧΕΙΣ ΠΡΟΒΛΗΜΑΤΑ:

### Build Errors:
1. Έλεγξε αν έβαλες όλα τα variables σωστά
2. Κάνε redeploy: Deployments → κλικ τα 3 dots → "Redeploy"

### Environment Variable Errors:
- Σιγουρέψου ότι έβαλες **όλα** τα environments: Production, Preview, Development
- Δεν πρέπει να έχει κενά πριν/μετά τα values

### Database Errors:
- Πρέπει πρώτα να τρέξεις το SQL script στο Supabase (δες DEPLOYMENT_GUIDE.md)

---

## ✅ ΤΕΛΙΚΟΣ ΕΛΕΓΧΟΣ:

Μετά το deployment:
1. Πήγαινε στο Vercel URL
2. Κάνε Sign Up με email
3. Έλεγξε αν φαίνεται το dashboard
4. Δοκίμασε το staking page
5. Δοκίμασε το token purchase

**Αν όλα δουλεύουν = SUCCESS! 🎉**

---

## 📞 ΑΝ ΧΡΕΙΑΖΕΣΑΙ ΒΟΗΘΕΙΑ:

Στείλε μου screenshot από:
- Vercel Environment Variables page
- Console errors (F12)
- Build logs

**Θα το φτιάξουμε μαζί!** 💪 