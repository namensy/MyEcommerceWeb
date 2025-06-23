# 🛍️ Dove.CO - Modern E-commerce Platform

A fully responsive React e-commerce application built with TypeScript, Material-UI (MUI), and modern web technologies. Features a complete shopping experience with product browsing, cart management, and checkout functionality.

## 🚀 Live Demo

[View Live Demo](Deploying...)

## ✨ Features

### 🎨 **Modern UI/UX Design**

- **Fully Responsive Design** - Optimized for Mobile, Tablet, and Desktop
- **Material Design 3** - Using MUI v7 with custom theming
- **Smooth Animations** - CSS transitions and hover effects
- **Interactive Components** - Modern cards, buttons, and navigation

### 🛒 **E-commerce Functionality**

- **Product Catalog** - Browse products with search and filtering
- **Product Details** - Detailed product pages with images and specifications
- **Shopping Cart** - Add, remove, and update quantities
- **Checkout Process** - Multi-step checkout with form validation
- **Cart Context** - Global state management for cart items

### 📱 **Responsive Features**

- **Mobile-First Approach** - Optimized for all screen sizes
- **Adaptive Layouts** - Grid systems that adjust to screen width
- **Touch-Friendly** - Proper button sizes and touch targets
- **Responsive Typography** - Font sizes that scale appropriately

### 🔍 **Product Management**

- **Search Functionality** - Real-time product search
- **Category Filtering** - Browse by product categories
- **API Integration** - Connected to DummyJSON for product data
- **Dynamic Loading** - Efficient data fetching and caching

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 19.1.0** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### **UI Library & Styling**

- **Material-UI (MUI) v7.1.2** - React component library
- **Emotion** - CSS-in-JS styling
- **Custom Fonts** - Roboto, Unbounded Variable, Prompt

### **State Management**

- **React Context API** - Global cart state management
- **React Hooks** - useState, useEffect, useContext, custom hooks

### **Routing & Navigation**

- **React Router DOM v7.6.2** - Client-side routing
- **Dynamic Routes** - Product details with URL parameters

### **API & Data**

- **Axios** - HTTP client for API requests
- **DummyJSON API** - External API for product data
- **Custom Hooks** - Reusable API logic

### **Additional Libraries**

- **SweetAlert2** - Beautiful alert dialogs
- **React CountUp** - Animated counters
- **MUI Icons** - Material Design icons

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/dove-ecommerce.git
   cd dove-ecommerce
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── HeroSection.tsx      # Homepage hero section
│   ├── Navigation.tsx       # Main navigation bar
│   ├── NewArrivalsSection.tsx # New products section
│   ├── TopSellingSection.tsx  # Top selling products
│   └── Footer.tsx           # Website footer
├── pages/               # Page components
│   ├── HomePage.tsx         # Landing page
│   ├── ShopPage.tsx         # Product listing page
│   ├── ProductsDetailPage.tsx # Product details
│   ├── CartPage.tsx         # Shopping cart
│   └── CheckoutPage.tsx     # Checkout process
├── contexts/            # React Context providers
│   └── CartContext.tsx      # Cart state management
├── hooks/               # Custom React hooks
│   ├── useCategoryApi.ts    # Product fetching hook
│   └── useSearchApi.ts      # Search functionality
├── data/                # Static data and mock data
│   ├── products.ts          # Product data
│   └── footer.ts            # Footer data
├── assets/              # Static assets
├── theme.ts             # MUI theme configuration
└── main.tsx             # Application entry point
```

## 🎯 Key Components

### **Navigation (Navigation.tsx)**

- Responsive navigation bar with search functionality
- Shopping cart badge with item count
- Mobile-optimized layout with collapsible menu

### **Product Sections (NewArrivalsSection.tsx, TopSellingSection.tsx)**

- Grid-based product display
- Responsive card design with hover effects
- Star ratings and pricing information
- "View All Products" navigation

### **Cart Management (CartContext.tsx)**

- Global state for cart items
- Add, remove, and update quantities
- Calculate totals and manage cart persistence

### **Pages**

- **ShopPage**: Product browsing with search and filters
- **ProductsDetailPage**: Detailed product view with add to cart
- **CartPage**: Cart management and order summary
- **CheckoutPage**: Multi-step checkout process

## 🔧 Configuration

### **Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://dummyjson.com
VITE_APP_TITLE=Dove.CO
```

### **Theme Customization**

Modify `src/theme.ts` to customize the Material-UI theme:

```typescript
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    // ... other theme options
  },
});
```

## 📱 Responsive Breakpoints

The application uses MUI's breakpoint system:

- **xs**: 0-600px (Mobile)
- **sm**: 600-900px (Tablet)
- **md**: 900-1200px (Desktop)
- **lg**: 1200px+ (Large Desktop)

## 🧪 Development

### **Available Scripts**

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint

# Type Checking
tsc --noEmit      # Type check without building
```

### **Code Quality**

- **ESLint** - Code linting and formatting
- **TypeScript** - Type safety and better DX
- **Prettier** - Code formatting (configured in ESLint)

### **Development Guidelines**

1. **Component Structure**: Use functional components with hooks
2. **Type Safety**: Define proper TypeScript interfaces
3. **Responsive Design**: Use MUI's sx prop for responsive styling
4. **State Management**: Use Context for global state, local state for component state
5. **API Calls**: Use custom hooks for data fetching

## 🚀 Deployment

### **Build for Production**

```bash
pnpm build
```

### **Deployment Options**

- **Vercel** - Recommended for React apps
- **Netlify** - Easy static site deployment
- **GitHub Pages** - Free hosting for public repos
- **AWS S3** - Scalable cloud hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 TODO / Roadmap

- [ ] **User Authentication** - Login/Register functionality
- [ ] **Product Reviews** - User review and rating system
- [ ] **Wishlist** - Save products for later
- [ ] **Order History** - Track past orders
- [ ] **Payment Integration** - Real payment processing
- [ ] **Admin Dashboard** - Product management interface
- [ ] **Dark Mode** - Theme switching
- [ ] **PWA Features** - Offline support and app-like experience

## 🐛 Known Issues

- [ ] Image loading optimization needed for large catalogs
- [ ] Search could be debounced for better performance
- [ ] Cart persistence across browser sessions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI Team** - For the excellent component library
- **DummyJSON** - For providing the product API
- **React Team** - For the amazing framework
- **Vite Team** - For the lightning-fast build tool

---

**Made with ❤️ using React, TypeScript, and Material-UI**
