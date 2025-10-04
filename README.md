# VELOUR - Premium Cosmetics Landing Site

A responsive, production-ready React landing site for a luxury cosmetics brand built with modern web technologies.

## 🌟 Features

### Core Features
- **Multi-page routing** (Home, Products, Product Detail, Cart, Checkout, About, Contact)
- **3D Product Viewer** powered by Three.js and react-three-fiber
- **Shopping Cart** with localStorage persistence
- **Product Search & Filtering** by category, price, rating
- **Responsive Design** optimized for all devices
- **Dark/Light Mode** with theme persistence
- **Form Validation** on contact and checkout forms
- **Mock Payment Processing** with order confirmation

### Technical Features
- **React 18** with TypeScript
- **Framer Motion** animations and micro-interactions
- **Three.js** 3D product visualization
- **Zustand** for state management
- **TailwindCSS** with custom design system
- **Accessibility** features (ARIA labels, keyboard navigation)
- **SEO Optimized** with proper meta tags

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation & Development
```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8080` to view the site.

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Cart.tsx        # Shopping cart sidebar
│   ├── Layout.tsx      # Main layout wrapper
│   ├── ProductCard.tsx # Product display card
│   └── Product3DViewer.tsx # 3D product viewer
├── pages/              # Route components
│   ├── Index.tsx       # Home page
│   ├── Products.tsx    # Product listing
│   ├── ProductDetail.tsx # Product detail with 3D viewer
│   ├── Cart.tsx        # Cart page
│   ├── Checkout.tsx    # Checkout flow
│   ├── About.tsx       # About page
│   └── Contact.tsx     # Contact form
├── store/              # State management
│   ├── cartStore.ts    # Shopping cart state
│   └── themeStore.ts   # Theme preference state
├── data/               # Mock data
│   └── products.json   # Product catalog
└── lib/                # Utilities
```

## 🎨 Design System

The site uses a sophisticated design system with:
- **Rose Gold & Blush** primary colors
- **Luxury Typography** (Playfair Display + Inter)
- **Elegant Animations** with Framer Motion
- **Custom Gradients & Shadows**
- **Responsive Grid Layouts**

## 🛒 E-commerce Features

### Shopping Cart
- Add/remove products with different shades
- Quantity management
- Persistent storage with localStorage
- Tax and shipping calculations

### Product Catalog
- 6 sample luxury cosmetics products
- Multiple product images per item
- Shade variations and ingredient lists
- Star ratings and customer reviews
- Product tags (Vegan, Cruelty-free, etc.)

### 3D Product Viewer
- Interactive 3D models with orbit controls
- Fallback geometric models for missing assets
- Toggle between 3D and image gallery views
- Auto-rotation and manual controls

## 🔧 Customization

### Adding New Products
Edit `src/data/products.json` to add new products:
```json
{
  "id": "unique-id",
  "name": "Product Name",
  "category": "Category",
  "price": 99,
  "image": "/path/to/image.jpg",
  "model": "/path/to/model.glb",
  "description": "Product description...",
  "shades": ["Color 1", "Color 2"],
  "tags": ["Vegan", "Cruelty-free"]
}
```

### Replacing 3D Models
Place GLTF/GLB files in the `public/models/` directory and update the `model` field in products.json.

### Theme Customization
Modify the design system in:
- `src/index.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind theme extension

## 🧪 Testing Checklist

- [x] Cart persistence (localStorage)
- [x] Form validation (contact, checkout)
- [x] 3D viewer interaction (orbit, zoom)
- [x] Responsive breakpoints (mobile, tablet, desktop)
- [x] Product search and filtering
- [x] Theme toggle functionality
- [x] Navigation and routing
- [x] Accessibility features

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for luxury beauty enthusiasts