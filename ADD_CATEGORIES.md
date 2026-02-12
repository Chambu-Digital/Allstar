# 📦 Add Categories to Allstar Tech

## 🚀 Quick Method: Automatic Seeding

Run this command to add all 15 technology categories automatically:

```bash
npm run seed:categories
```

This will create:
- ✅ 15 pre-configured technology categories
- ✅ Professional descriptions
- ✅ High-quality placeholder images
- ✅ Appropriate icons for each category
- ✅ All categories set to active

### Categories That Will Be Added:

1. **Laptops** - High-performance laptops
2. **Desktop Computers** - Powerful PCs and workstations
3. **Computer Components** - CPUs, GPUs, RAM, etc.
4. **Monitors & Displays** - High-resolution screens
5. **Peripherals** - Keyboards, mice, webcams
6. **Networking** - Routers, switches, adapters
7. **Storage Solutions** - External drives, SSDs
8. **Printers & Scanners** - Office equipment
9. **Audio & Headphones** - Premium audio
10. **Mobile & Tablets** - Smartphones and tablets
11. **Gaming** - Gaming consoles and accessories
12. **Smart Home & IoT** - Connected devices
13. **Cables & Adapters** - Connectivity accessories
14. **Power & UPS** - Power management
15. **Software & Licenses** - Operating systems and software

---

## 📝 Manual Method: Add Through Admin UI

### Step 1: Go to Categories Page
```
http://localhost:3000/admin/categories/new
```

### Step 2: Fill in the Form

**Example: Adding "Laptops" Category**

1. **Category Name**: `Laptops`
2. **Description**: 
   ```
   High-performance laptops for work, gaming, and creativity. 
   From ultrabooks to gaming powerhouses.
   ```
3. **Icon**: Select `Laptop` from dropdown
4. **Image**: Upload a laptop image (or use URL)
5. **Active**: ✅ Check this box
6. Click **"Create Category"**

### Available Icons:

- **Laptop** - For laptop computers
- **Monitor** - For displays and desktops
- **Cpu** - For processors and components
- **HardDrive** - For storage devices
- **Smartphone** - For mobile devices
- **Tablet** - For tablets
- **Keyboard** - For input devices
- **Mouse** - For pointing devices
- **Headphones** - For audio equipment
- **Wifi** - For networking equipment
- **Printer** - For printers and scanners
- **Camera** - For cameras
- **Gamepad2** - For gaming products
- **Battery** - For power supplies
- **Cable** - For cables and adapters
- **Usb** - For USB accessories
- **Server** - For server equipment
- **Database** - For storage solutions

---

## 🖼️ Image Guidelines

### Option 1: Upload Your Own Images
- Recommended size: 800x600px or larger
- Format: JPG, PNG, WebP
- High quality, professional photos
- Consistent style across categories

### Option 2: Use Placeholder Images
The seed script uses high-quality Unsplash images automatically.

### Option 3: Use Image URLs
You can paste image URLs directly in the form.

---

## ✅ After Adding Categories

### View Your Categories
```
http://localhost:3000/admin/categories
```

### Add Products to Categories
1. Go to: http://localhost:3000/admin/products
2. Click "Add Product"
3. Select a category from the dropdown
4. Fill in product details
5. Save!

### View on Website
Categories will appear on:
- Homepage category grid
- Navigation menu
- Product filtering
- Category pages

---

## 🔄 Managing Categories

### Edit a Category
1. Go to: http://localhost:3000/admin/categories
2. Click the **Edit** button (pencil icon)
3. Update details
4. Save changes

### Toggle Visibility
- Click the **Eye/Eye-off** icon to show/hide categories
- Hidden categories won't appear on the website

### Delete a Category
- Click the **Trash** icon
- Confirm deletion
- ⚠️ This is permanent!

---

## 💡 Tips

### Category Naming
- ✅ Clear and descriptive
- ✅ Customer-friendly language
- ✅ Consistent formatting
- ❌ Avoid technical jargon
- ❌ Don't use abbreviations

### Descriptions
- 2-3 sentences
- Focus on what customers will find
- Include keywords for SEO
- Be specific but not too narrow

### Organization
- Start with 10-15 main categories
- Don't create too many categories
- Group similar products together
- Keep it simple for customers

---

## 🆘 Troubleshooting

### Script Fails to Run
**Check:**
- MongoDB connection in `.env.local`
- Database is accessible
- No network issues

**Solution:**
```bash
# Test MongoDB connection
node test-mongodb-connection.js
```

### Categories Already Exist
The script will ask if you want to:
- Delete and reseed (replaces all)
- Add only new ones (keeps existing)

### Image Upload Issues
**Solutions:**
- Check file size (under 5MB)
- Use supported formats (JPG, PNG, WebP)
- Try a different browser
- Use image URLs instead

---

## 📊 Quick Commands

```bash
# Add all categories automatically
npm run seed:categories

# View categories in admin
# http://localhost:3000/admin/categories

# Add new category manually
# http://localhost:3000/admin/categories/new
```

---

## 🎯 Next Steps

After adding categories:

1. ✅ Review categories in admin panel
2. ✅ Edit descriptions if needed
3. ✅ Upload custom images (optional)
4. ✅ Add products to categories
5. ✅ Test category pages on website
6. ✅ Verify navigation works

---

**Need Help?**
- Check `docs/ADMIN_CATEGORIES_GUIDE.md` for detailed guide
- Review `ADMIN_FEATURES.md` for all features
- See `QUICK_START.md` for setup help

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Project**: Allstar Tech
