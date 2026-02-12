# Allstar Tech Rebranding Guide

## Brand Identity

### Company Name
**Allstar Tech** - Your trusted technology partner

### Tagline
"Innovation • Quality • Excellence"

### Business Focus
- Computers & Laptops
- Computer Components & Accessories
- Electronics & Technology Products
- Gaming Equipment
- Networking Solutions
- Mobile Devices & Tablets

### Color Scheme

#### Primary Color: Teal Blue
- Light: `oklch(0.55 0.14 195)` - #0d9488 equivalent
- Dark: `oklch(0.60 0.16 195)`
- Usage: Primary buttons, links, brand elements

#### Secondary Color: Orange
- Light: `oklch(0.68 0.19 35)` - #f97316 equivalent  
- Dark: `oklch(0.72 0.20 35)`
- Usage: Accents, CTAs, highlights

### Typography
- Font Family: Inter (via Google Fonts)
- Headings: Bold, uppercase for brand name
- Body: Regular weight, clean and readable

## Updated Files

### Core Branding
- ✅ `package.json` - Updated project name to "allstar-tech"
- ✅ `README.md` - Updated description and branding
- ✅ `app/layout.tsx` - Updated metadata and title
- ✅ `app/globals.css` - Updated color palette to teal blue and orange
- ✅ `app/page.tsx` - Restructured landing page with new design

### Components
- ✅ `components/header.tsx` - Updated logo references and search placeholder
- ✅ `components/footer.tsx` - Updated branding, contact info, and messaging

### Data & Content
- ✅ `lib/seed.js` - Updated categories to technology-focused items
- ✅ `lib/seed.js` - Updated sample products to computers and electronics

## Product Categories

1. **Laptops** - High-performance laptops for work, gaming, and creativity
2. **Desktop Computers** - Powerful PCs and workstations
3. **Computer Components** - CPUs, GPUs, RAM, motherboards, storage
4. **Monitors & Displays** - High-resolution monitors and screens
5. **Peripherals** - Keyboards, mice, webcams
6. **Networking** - Routers, switches, network adapters
7. **Storage Solutions** - External drives, SSDs, NAS systems
8. **Printers & Scanners** - Office printing solutions
9. **Audio & Headphones** - Premium audio equipment
10. **Mobile & Tablets** - Smartphones and tablets
11. **Gaming** - Gaming consoles and accessories
12. **Smart Home & IoT** - Connected devices
13. **Cables & Adapters** - Connectivity accessories
14. **Power & UPS** - Power management solutions
15. **Software & Licenses** - Operating systems and software

## Sample Products

- Dell XPS 13 Laptop (multiple configurations)
- ASUS ROG Gaming Laptop
- HP EliteDesk Desktop PC
- LG UltraWide Monitor 34"
- Logitech MX Mechanical Keyboard
- Samsung T7 Portable SSD (multiple capacities)

## Contact Information

- **Phone**: +254 713 065 412
- **Email**: info@allstartech.co.ke
- **Location**: Nairobi, Kenya
- **Hours**: Mon-Fri: 8AM-6PM, Sat: 9AM-5PM

## Next Steps

### Required Assets
1. Create logo files:
   - `/public/allstar-tech-logo.svg` - Full logo
   - `/public/allstar-tech-icon.svg` - Icon only
   - `/public/favicon.svg` - Favicon

2. Update images:
   - Hero section images
   - Category images
   - Product images

### Database Updates
Run the seed script to update categories and products:
```bash
npm run seed
```

### Testing Checklist
- [ ] Verify all pages load correctly
- [ ] Check color consistency across components
- [ ] Test responsive design on mobile
- [ ] Verify search functionality
- [ ] Test cart and checkout flow
- [ ] Check all links and navigation

## Design Inspiration

Landing page structure inspired by modern e-commerce design with:
- Bold hero section with gradient backgrounds
- Clear category showcases
- Product sections (Best Sellers, New Arrivals, Top Picks)
- Prominent CTAs with gradient buttons
- Clean, spacious layout
- Trust indicators and social proof

## Brand Voice

- Professional yet approachable
- Tech-savvy and knowledgeable
- Customer-focused
- Innovation-driven
- Quality-oriented
