# .gitignore Guide - Allstar Tech

## 🔒 What's Being Ignored (Not Committed to Git)

### ✅ Already Configured

#### 1. Environment Variables (CRITICAL - Never Commit!)
```
.env
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local
```

**Why?** These contain sensitive information:
- MongoDB connection strings with passwords
- JWT secrets
- API keys
- Payment gateway credentials
- Email passwords

**⚠️ NEVER commit these files to Git!**

#### 2. Dependencies
```
node_modules/
package-lock.json
```

**Why?** These are large and can be regenerated with `npm install`

#### 3. Build Files
```
/.next/
/out/
/build
/dist
*.tsbuildinfo
```

**Why?** Generated files that can be rebuilt

#### 4. Test Files
```
test-*.html
create-*.html
test-mongodb-connection.js
```

**Why?** Development/testing files not needed in production

#### 5. Logs & Debug Files
```
*.log
npm-debug.log*
yarn-debug.log*
```

**Why?** Temporary files that change frequently

#### 6. OS & IDE Files
```
.DS_Store
Thumbs.db
.vscode/
.idea/
```

**Why?** System-specific files that vary by developer

---

## 📚 Documentation Files

### Currently Included in Git:

These documentation files ARE committed to Git:
- ✅ `README.md` - Project overview
- ✅ `SETUP_INSTRUCTIONS.md` - Setup guide
- ✅ `QUICK_START.md` - Quick start guide
- ✅ `ADMIN_FEATURES.md` - Admin features
- ✅ `REBRANDING.md` - Branding guide
- ✅ `ADD_CATEGORIES.md` - Category guide
- ✅ `GITIGNORE_GUIDE.md` - This file
- ✅ `docs/` folder - All documentation

### To Exclude Documentation:

If you want to keep docs private, uncomment these lines in `.gitignore`:

```gitignore
# Documentation (Optional - uncomment if you don't want to commit docs)
docs/
*.md
!README.md
```

This will:
- ❌ Ignore all `.md` files
- ❌ Ignore `docs/` folder
- ✅ Keep `README.md` (important for GitHub)

---

## 🔐 Security Best Practices

### Files That Should NEVER Be Committed:

1. **Environment Variables**
   - `.env.local`
   - `.env`
   - Any file with passwords or API keys

2. **Database Credentials**
   - MongoDB connection strings
   - Database dumps with real data

3. **API Keys & Secrets**
   - Payment gateway keys
   - Email service passwords
   - OAuth client secrets
   - JWT secrets

4. **Private Keys**
   - SSL certificates
   - SSH keys
   - Encryption keys

### What TO Commit:

1. **Source Code**
   - All `.ts`, `.tsx`, `.js`, `.jsx` files
   - Component files
   - API routes
   - Utility functions

2. **Configuration Templates**
   - `.env.example` (without real values)
   - Config files with placeholders

3. **Documentation**
   - README files
   - Setup guides
   - API documentation

4. **Public Assets**
   - Images (logos, icons)
   - Fonts
   - Public files

---

## 📝 Creating .env.example

Create a template for other developers:

<function_calls>
<invoke name="fsWrite">
<parameter name="path">.env.examplengoDB Connection
# Get from: https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/allstartech?retryWrites=true&w=majority

# JWT Secret for Authentication
# Generate with: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth (Optional)
# Get from: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Cloudinary (Optional - for image uploads)
# Get from: https://cloudinary.com/
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# M-Pesa Configuration (Optional - for payments)
MPESA_CONSUMER_KEY=your-mpesa-consumer-key
MPESA_CONSUMER_SECRET=your-mpesa-consumer-secret
MPESA_SHORTCODE=your-shortcode
MPESA_PASSKEY=your-passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback

# Node Environment
NODE_ENV=development
