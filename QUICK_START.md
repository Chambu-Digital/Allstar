# 🚀 Quick Start - Allstar Tech

## Fix Login Issue - Create Super Admin

You're getting a 401 error because you need to create a user account in the database, not just an admin request.

### Solution: Run This Command

```bash
npm run create-admin
```

This will:
- ✅ Create a super admin account directly in the database
- ✅ Set up full permissions
- ✅ Give you login credentials

### Login Credentials

After running the command, use these credentials:

```
Email:    admin@allstartech.co.ke
Password: admin123
```

**⚠️ IMPORTANT**: Change this password immediately after logging in!

### Login URL

```
http://localhost:3000/admin/login
```

---

## Complete Setup Steps

### 1. Configure Environment Variables

Edit `.env.local` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/allstartech?retryWrites=true&w=majority
JWT_SECRET=your-random-secret-key-here
```

**Get MongoDB Connection String:**
- Go to https://www.mongodb.com/cloud/atlas
- Create free account
- Create cluster
- Click "Connect" → "Connect your application"
- Copy connection string
- Replace username, password, and cluster name

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Super Admin

```bash
npm run create-admin
```

### 4. Seed Database (Optional)

```bash
# Add categories and sample products
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Login to Admin Panel

1. Open: http://localhost:3000/admin/login
2. Email: admin@allstartech.co.ke
3. Password: admin123
4. **Change password immediately!**

---

## Troubleshooting

### Error: "MONGODB_URI not found"

**Solution**: Add MongoDB connection string to `.env.local`

```env
MONGODB_URI=mongodb+srv://your-connection-string
```

### Error: "Super admin already exists"

**Solution**: The script will ask if you want to reset the password. Type `yes` to reset.

### Error: "Cannot connect to MongoDB"

**Solutions**:
1. Check your connection string is correct
2. Verify your IP is whitelisted in MongoDB Atlas
3. Make sure your cluster is running

### Still Getting 401 Error?

**Check these:**
1. ✅ Super admin was created successfully
2. ✅ Using correct email: admin@allstartech.co.ke
3. ✅ Using correct password: admin123
4. ✅ MongoDB is connected
5. ✅ Development server is running

**Test MongoDB Connection:**
```bash
node test-mongodb-connection.js
```

---

## What's Next?

After logging in:

1. **Change Your Password**
   - Go to Settings → Profile
   - Update password

2. **Review Categories**
   - Go to Categories section
   - Edit or add new categories

3. **Add Products**
   - Go to Products section
   - Click "Add Product"
   - Fill in details

4. **Approve Admin Requests**
   - Go to Admin Requests
   - Approve pending requests
   - Assign permissions

---

## Important Commands

```bash
# Create super admin
npm run create-admin

# Seed database with categories
npm run seed

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Default Admin Credentials

```
Email:    admin@allstartech.co.ke
Password: admin123
Role:     super_admin
```

**⚠️ Security Warning**: 
- Change the default password immediately
- Use a strong, unique password
- Enable 2FA when available

---

## Need More Help?

- 📖 Read `SETUP_INSTRUCTIONS.md` for detailed setup
- 📚 Check `docs/ADMIN_SETUP_GUIDE.md` for admin features
- 🎨 See `REBRANDING.md` for customization
- 🔧 Review `ADMIN_FEATURES.md` for feature list

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Project**: Allstar Tech
