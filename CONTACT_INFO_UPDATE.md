# Contact Information Update - Allstar Tech

## ✅ Updated Contact Details

All contact information has been centralized and updated throughout the project.

### New Contact Information:

```
Company Name: Allstar Tech
Email:        sales@allstar.co.ke
Phone:        0712345678
WhatsApp:     254712345678
Address:      HH Towers, 4th Floor, Moi Avenue, Nairobi
City:         Nairobi
Country:      Kenya
```

### Business Hours:
```
Monday - Saturday: 8:00 AM - 6:00 PM
Sunday:           Closed
```

---

## 📝 What Was Updated

### 1. Environment Variables (`.env.local`)
Added company contact information:
```env
NEXT_PUBLIC_COMPANY_NAME=Allstar Tech
NEXT_PUBLIC_COMPANY_EMAIL=sales@allstar.co.ke
NEXT_PUBLIC_COMPANY_PHONE=0712345678
NEXT_PUBLIC_COMPANY_PHONE_FORMATTED=+254712345678
NEXT_PUBLIC_WHATSAPP_NUMBER=254712345678
NEXT_PUBLIC_COMPANY_ADDRESS=HH Towers, 4th Floor, Moi Avenue, Nairobi
NEXT_PUBLIC_COMPANY_CITY=Nairobi
NEXT_PUBLIC_COMPANY_COUNTRY=Kenya
```

### 2. Utility File (`lib/company-info.ts`)
Created centralized company information with helper functions:
- `companyInfo` - All company details
- `getWhatsAppLink()` - Generate WhatsApp links
- `getPhoneLink()` - Generate phone call links
- `getEmailLink()` - Generate email links
- `getFullAddress()` - Get formatted address

### 3. Updated Components

#### Header (`components/header.tsx`)
- ✅ Phone number from environment variables
- ✅ Clickable phone link
- ✅ Dynamic contact bar

#### Footer (`components/footer.tsx`)
- ✅ Phone number with click-to-call
- ✅ WhatsApp link with proper formatting
- ✅ Email address
- ✅ Full address display
- ✅ Updated business hours

#### Contact Page (`app/contact/page.tsx`)
- ✅ All contact information from environment
- ✅ WhatsApp integration
- ✅ Updated business hours
- ✅ Dynamic contact cards

#### About Page (`app/about/page.tsx`)
- ✅ Phone and email from environment
- ✅ Updated business hours

---

## 🔗 WhatsApp Integration

### Features:
- ✅ Clickable WhatsApp links throughout the site
- ✅ Pre-filled messages for customer convenience
- ✅ Opens in new tab
- ✅ Works on mobile and desktop

### WhatsApp Links:
- **Footer**: Quick support link
- **Contact Page**: Contact card + floating button
- **All pages**: Accessible via contact information

---

## 🎯 Benefits

### 1. Easy Updates
Change contact info in one place (`.env.local`) and it updates everywhere:
```env
# Just update these values
NEXT_PUBLIC_COMPANY_PHONE=0712345678
NEXT_PUBLIC_COMPANY_EMAIL=sales@allstar.co.ke
```

### 2. Consistent Information
All pages show the same contact details automatically.

### 3. Click-to-Action
- Phone numbers are clickable (opens dialer)
- Email addresses are clickable (opens email client)
- WhatsApp links open WhatsApp directly

### 4. SEO Friendly
Contact information is properly structured for search engines.

---

## 📱 How to Use

### Update Contact Information:

1. **Edit `.env.local`**:
   ```env
   NEXT_PUBLIC_COMPANY_PHONE=0712345678
   NEXT_PUBLIC_COMPANY_EMAIL=sales@allstar.co.ke
   ```

2. **Restart Development Server**:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

3. **Changes Apply Everywhere**:
   - Header
   - Footer
   - Contact page
   - About page
   - Any other component using `companyInfo`

### Add Contact Info to New Components:

```typescript
import { companyInfo, getWhatsAppLink } from '@/lib/company-info'

// Use in your component
<a href={getWhatsAppLink()}>
  Contact us on WhatsApp: {companyInfo.phone}
</a>
```

---

## 🔧 Helper Functions

### Available Functions:

```typescript
// Get WhatsApp link
getWhatsAppLink('Hello, I need help!')
// Returns: https://wa.me/254712345678?text=Hello%2C%20I%20need%20help!

// Get phone link
getPhoneLink()
// Returns: tel:+254712345678

// Get email link
getEmailLink('Product Inquiry')
// Returns: mailto:sales@allstar.co.ke?subject=Product%20Inquiry

// Get full address
getFullAddress()
// Returns: HH Towers, 4th Floor, Moi Avenue, Nairobi, Nairobi, Kenya
```

---

## 📋 Checklist

- [x] Added contact info to `.env.local`
- [x] Created `lib/company-info.ts` utility
- [x] Updated header component
- [x] Updated footer component
- [x] Updated contact page
- [x] Updated about page
- [x] WhatsApp integration working
- [x] Phone links working
- [x] Email links working
- [x] Business hours updated

---

## 🚀 Next Steps

### Optional Enhancements:

1. **Add Google Maps**:
   - Embed map on contact page
   - Show store location

2. **Add Social Media**:
   ```env
   NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/allstartech
   NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/allstartech
   NEXT_PUBLIC_TWITTER_URL=https://twitter.com/allstartech
   ```

3. **Add Multiple Locations**:
   - Support for multiple store locations
   - Location selector

4. **Add Live Chat**:
   - Integrate live chat widget
   - Real-time customer support

---

## 📞 Current Contact Points

### Where Contact Info Appears:

1. **Header** - Top bar with phone number
2. **Footer** - Full contact section with:
   - Phone (click-to-call)
   - WhatsApp (click-to-chat)
   - Email (click-to-email)
   - Address
3. **Contact Page** - Dedicated contact information
4. **About Page** - Company contact details
5. **Floating WhatsApp Button** - On contact page

---

## 🔐 Security Note

Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser. This is fine for:
- ✅ Phone numbers
- ✅ Email addresses
- ✅ Public addresses
- ✅ Social media links

Never use `NEXT_PUBLIC_` for:
- ❌ API keys
- ❌ Database credentials
- ❌ Secret tokens
- ❌ Private information

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Project**: Allstar Tech
