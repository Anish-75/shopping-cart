# 🛒 ShopCart - Modern Shopping Experience

A fully responsive e-commerce shopping cart application built with **React**, **Tailwind CSS**, and **Vite**. ShopCart provides a seamless shopping experience with product browsing, filtering, wishlist management, and a smooth checkout process.

## ✨ Features

### 🛍️ Core Shopping Features
- **Product Catalog** - Browse a curated collection of 20+ products with real-time API integration
- **Category Filtering** - Filter products by category with a smooth horizontal scrolling interface
- **Search Functionality** - Search products by name, description, or category in real-time
- **Product Details Modal** - View detailed product information, images, ratings, and reviews
- **Stock Management** - Real-time stock availability with low-stock indicators

### 🛒 Cart Management
- **Add to Cart** - Easy product addition with quantity management
- **Cart Sidebar** - Floating sidebar showing all cart items with quick actions
- **Quantity Control** - Increment/decrement quantities with automatic stock validation
- **Order Summary** - Detailed breakdown including tax, shipping, and total calculation
- **Free Shipping Threshold** - Free shipping on orders over $500

### ❤️ Wishlist Features
- **Add to Wishlist** - Save favorite products for later
- **Dedicated Wishlist Page** - View all wishlisted items with quick actions
- **Wishlist Persistence** - Wishlist data saved to localStorage
- **Move to Cart** - Quickly add wishlisted items to cart

### 📊 Additional Features
- **Recently Viewed** - Quick access to recently viewed products
- **Product Ratings & Reviews** - Display customer ratings and review comments
- **Product Recommendations** - Suggested products based on browsing history
- **Data Persistence** - Cart, wishlist, and recently viewed items saved locally
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
- **Loading & Error States** - Smooth loading indicators and error handling

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | Frontend framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **Axios** | HTTP client for API requests |
| **PostCSS** | CSS transformations |
| **ESLint** | Code linting |

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   cd Shopping-cart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
Shopping-cart/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation with cart & wishlist
│   │   ├── CartSidebar.jsx         # Floating cart panel
│   │   ├── CategoryFilter.jsx      # Horizontal category selector
│   │   ├── SearchBar.jsx           # Product search with clear button
│   │   ├── ProductCard.jsx         # Individual product display
│   │   ├── ProductDetailModal.jsx  # Full product details
│   │   ├── ProductRating.jsx       # Star rating component
│   │   ├── StockIndicator.jsx      # Stock status display
│   │   ├── OrderSummary.jsx        # Cart totals & checkout
│   │   ├── ProductRecommendations.jsx # Suggested products
│   │   ├── WishlistPage.jsx        # Wishlist view
│   │   └── Footer.jsx              # Footer component
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styles
│   ├── index.css                   # Global styles
│   └── main.jsx                    # React entry point
├── index.html                      # HTML template
├── package.json                    # Project dependencies
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── vite.config.js                  # Vite configuration
└── eslint.config.js                # ESLint configuration
```

## 🚀 Getting Started

### 1. Browse Products
- View the product catalog on the home page
- Use category filter to narrow down products
- Use search bar to find specific items

### 2. Add to Cart
- Click "Add to Cart" on any product card
- Adjust quantity in the cart sidebar
- See real-time order summary with tax & shipping

### 3. Wishlist Items
- Click the heart icon to save products
- Access wishlist from the header
- Move wishlisted items to cart anytime

### 4. View Product Details
- Click "View Details" on product cards
- See full information with multiple images
- Read customer reviews and ratings
- Check stock availability and discount info

### 5. Manage Cart
- Open cart sidebar from header
- Adjust quantities with +/- buttons
- Remove items with trash icon
- View order summary and pricing details

## 💾 Data Persistence

All user data is automatically saved to browser's localStorage:
- **Cart Items** - Persists across sessions
- **Wishlist** - Saved wishlist items
- **Recently Viewed** - Last 5 viewed products

## 📱 Responsive Design

The app is fully responsive with optimized layouts for:
- **Mobile** (< 640px) - Single column, touch-friendly buttons
- **Tablet** (640px - 1024px) - 2-column product grid
- **Desktop** (> 1024px) - 4-column product grid

Mobile features include:
- Collapsible navigation labels
- Optimized touch targets
- Responsive padding and margins
- Mobile-friendly modals

## 🔌 API Integration

Products are fetched from the **DummyJSON API**:
```
https://dummyjson.com/products?limit=20
```

The app handles:
- Automatic data fetching on load
- Loading states with spinner
- Error handling with user feedback
- Real-time product information

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (from-blue-600 to-cyan-500)
- **Success**: Green (#10b981)
- **Alert**: Red (#ef4444)
- **Warning**: Orange (#f59e0b)

### Components
- **Rounded corners**: Tailwind breakpoint-specific (rounded-lg to rounded-3xl)
- **Spacing**: Responsive padding (sm: prefix for mobile adjustments)
- **Typography**: Hierarchical font sizes with responsive scaling

## ⚙️ Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

## 🔧 Configuration Files

- **tailwind.config.js** - Tailwind CSS theming and customization
- **vite.config.js** - Vite build and dev server settings
- **postcss.config.js** - PostCSS plugins (autoprefixer, tailwindcss)
- **eslint.config.js** - Code quality rules

## 📝 Key Features Explained

### Smart Cart Management
- Automatically prevents duplicate items
- Validates stock before addition
- Calculates taxes and shipping in real-time
- Provides coupon-ready structure

### Search Optimization
- Real-time filtering across product titles and descriptions
- Case-insensitive search
- Combined with category filtering

### User-Friendly UI
- Visual feedback for actions (Add to Cart confirmation)
- Badge counters for cart and wishlist
- Smooth transitions and hover effects
- Clear loading and error states

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Performance

- **Code Splitting** - Vite handles automatic code splitting
- **Local Storage** - Reduces API calls for user data
- **Image Optimization** - Lazy loading ready with object-cover
- **CSS Purging** - Tailwind removes unused styles in production

## 🤝 Contributing

Contributions are welcome! Areas for enhancement:
- Payment gateway integration
- User authentication & accounts
- Product reviews submission
- Inventory management
- Order history tracking
- Advanced filtering options
- Dark mode support

## 📄 License

This project is open source and available for personal and educational use.

## 👨‍💻 Author

Built with ❤️ using React + Tailwind CSS

---

**Enjoy your shopping with ShopCart! 🛍️✨**
