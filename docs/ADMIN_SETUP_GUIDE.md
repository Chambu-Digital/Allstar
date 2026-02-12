# Admin Account Setup Guide

## Creating Your First Admin Account

### Step 1: Request Admin Access

1. **Navigate to Admin Register Page**
   ```
   URL: http://localhost:3000/admin/register
   ```

2. **Fill in the Registration Form**
   - First Name
   - Last Name
   - Email Address
   - Password (minimum 6 characters)
   - Confirm Password

3. **Submit the Request**
   - Click "Submit Access Request"
   - You'll see a success message if the request is submitted

### Step 2: Approve the Request (Super Admin Required)

Since this is your first admin, you'll need to manually approve it in the database or use a seed script.

#### Option A: Use Seed Script (Recommended)

Create a super admin directly:

```bash
npm run seed:admin
```

This will create a super admin account with:
- Email: admin@allstartech.co.ke
- Password: admin123 (change this immediately!)

#### Option B: Manual Database Approval

1. **Connect to MongoDB**
   - Use MongoDB Compass or mongo shell
   - Connect to your database

2. **Find the Admin Request**
   ```javascript
   db.adminrequests.find()
   ```

3. **Create a Super Admin User**
   ```javascript
   db.users.insertOne({
     firstName: "Admin",
     lastName: "User",
     email: "admin@allstartech.co.ke",
     password: "$2a$12$hashedPasswordHere", // Use bcrypt to hash
     role: "super_admin",
     isActive: true,
     permissions: {
       products: { view: true, create: true, edit: true, delete: true },
       categories: { view: true, create: true, edit: true, delete: true },
       orders: { view: true, create: true, edit: true, delete: true },
       customers: { view: true, create: true, edit: true, delete: true },
       admins: { view: true, create: true, edit: true, delete: true },
       settings: { view: true, create: true, edit: true, delete: true },
       reports: { view: true, create: true, edit: true, delete: true }
     },
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

### Step 3: Login as Super Admin

1. **Navigate to Admin Login**
   ```
   URL: http://localhost:3000/admin/login
   ```

2. **Enter Credentials**
   - Email: admin@allstartech.co.ke
   - Password: admin123 (or your password)

3. **Access Admin Panel**
   - You should now have full access to the admin dashboard

### Step 4: Approve Pending Requests

1. **Go to Admin Requests**
   ```
   URL: http://localhost:3000/admin/requests
   ```

2. **Review Pending Requests**
   - You'll see all pending admin access requests

3. **Approve or Reject**
   - Click "Approve" to grant access
   - Select permissions for the new admin
   - Click "Reject" to deny access

## Troubleshooting

### Error: 500 Internal Server Error

**Possible Causes:**
1. MongoDB connection issue
2. Missing environment variables
3. Database model issues

**Solutions:**

1. **Check MongoDB Connection**
   ```bash
   # Verify MONGODB_URI in .env.local
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

2. **Check Server Logs**
   - Look at the terminal where `npm run dev` is running
   - Check for detailed error messages

3. **Verify Database Connection**
   ```bash
   node test-mongodb-connection.js
   ```

### Error: Validation Failed

**Cause:** Form data doesn't meet requirements

**Solutions:**
- Ensure all fields are filled
- Password must be at least 6 characters
- Email must be valid format
- Passwords must match

### Error: Request Already Exists

**Cause:** An admin request with this email already exists

**Solutions:**
1. Use a different email address
2. Delete the existing request from database
3. Contact super admin to approve/reject existing request

### Cannot Login After Approval

**Possible Causes:**
1. Account not activated
2. Wrong credentials
3. Session issues

**Solutions:**
1. Clear browser cache and cookies
2. Verify email and password
3. Check if account is marked as active in database

## Security Best Practices

### 1. Change Default Passwords
```bash
# After first login, change your password immediately
# Go to: /admin/settings/profile
```

### 2. Use Strong Passwords
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Don't reuse passwords

### 3. Limit Super Admin Access
- Only create super admins when absolutely necessary
- Use role-based permissions for other admins
- Regularly review admin access

### 4. Enable Two-Factor Authentication (Future Feature)
- Coming soon for enhanced security

## Admin Roles

### Super Admin
- Full access to all features
- Can approve/reject admin requests
- Can manage other admins
- Can modify system settings

### Regular Admin
- Access based on assigned permissions
- Cannot manage other admins
- Cannot approve admin requests
- Limited to assigned features

## Permission Categories

1. **Products** - Manage product catalog
2. **Categories** - Organize product categories
3. **Orders** - View and manage orders
4. **Customers** - Manage customer accounts
5. **Admins** - Manage admin users (super admin only)
6. **Settings** - Configure system settings
7. **Reports** - View analytics and reports

## Quick Reference

### URLs
- Admin Register: `/admin/register`
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin`
- Admin Requests: `/admin/requests`
- Categories: `/admin/categories`
- Products: `/admin/products`

### Default Super Admin (After Seed)
- Email: admin@allstartech.co.ke
- Password: admin123
- **⚠️ Change this immediately after first login!**

### API Endpoints
- POST `/api/admin/requests` - Submit admin request
- GET `/api/admin/requests` - List admin requests (super admin)
- PATCH `/api/admin/requests/[id]` - Approve/reject request

## Need Help?

1. Check server logs for detailed errors
2. Verify MongoDB connection
3. Ensure all environment variables are set
4. Review this guide for common issues
5. Check the API response for error details

---

**Last Updated**: February 2026
**Version**: 1.0 - Allstar Tech
