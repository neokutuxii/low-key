import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Star, 
  Package, 
  Shirt, 
  Image, 
  Mouse, 
  Zap, 
  Crown, 
  Sparkles,
  ChevronRight,
  Play
} from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';

// Lazy load heavy components
const AuthModal = lazy(() => import('./components/AuthModal'));
const CartModal = lazy(() => import('./components/CartModal'));
const SearchModal = lazy(() => import('./components/SearchModal'));
const ProductPage = lazy(() => import('./components/ProductPage'));
const CheckoutPage = lazy(() => import('./components/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./components/OrderConfirmationPage'));
const LimitedEditionsPage = lazy(() => import('./components/LimitedEditionsPage'));
const CollaborationsPage = lazy(() => import('./components/CollaborationsPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
  </div>
);

// Optimized product data - reduced initial load
const featuredProducts = [
  { id: "1", name: "Dragon Ball Z Hoodie", price: "R650", anime: "Dragon Ball Z", category: "hoodies" },
  { id: "2", name: "Naruto Akatsuki Tee", price: "R450", anime: "Naruto", category: "tees" },
  { id: "3", name: "Attack on Titan Poster", price: "R250", anime: "Attack on Titan", category: "posters" },
  { id: "4", name: "One Piece Mousepad", price: "R380", anime: "One Piece", category: "mousepads" }
];

const allProducts = [
  ...featuredProducts,
  { id: "5", name: "Demon Slayer Hoodie", price: "R680", anime: "Demon Slayer", category: "hoodies" },
  { id: "6", name: "Jujutsu Kaisen Tee", price: "R420", anime: "Jujutsu Kaisen", category: "tees" },
  { id: "7", name: "Studio Ghibli Poster", price: "R280", anime: "Studio Ghibli", category: "posters" },
  { id: "8", name: "Tokyo Ghoul Mousepad", price: "R400", anime: "Tokyo Ghoul", category: "mousepads" },
  { id: "9", name: "Bleach Bankai Hoodie", price: "R720", anime: "Bleach", category: "hoodies" },
  { id: "10", name: "Hunter x Hunter Tee", price: "R460", anime: "Hunter x Hunter", category: "tees" },
  { id: "11", name: "Evangelion Poster", price: "R300", anime: "Evangelion", category: "posters" },
  { id: "12", name: "Chainsaw Man Mousepad", price: "R420", anime: "Chainsaw Man", category: "mousepads" }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [orderData, setOrderData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user, login, signup, logout, checkAuth } = useAuth();
  const { 
    cartItems, 
    addToCart, 
    removeFromCart: removeItem, 
    updateQuantity, 
    addToWishlist, 
    getCartTotal, 
    getCartItemCount 
  } = useCart();

  // Initialize auth and set loaded state
  useEffect(() => {
    checkAuth();
    // Simulate initial load completion
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Optimized handlers
  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      setIsAuthModalOpen(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    const result = await signup(name, email, password);
    if (result.success) {
      setIsAuthModalOpen(false);
    }
  };

  const handleAddToCart = (product: any, size: string, quantity: number) => {
    addToCart(product, size, quantity);
    alert(`Added ${quantity}x ${product.name} (${size}) to cart!`);
  };

  const handleCheckout = () => {
    setIsCartModalOpen(false);
    setCurrentPage('checkout');
  };

  const handleOrderComplete = (data: any) => {
    setOrderData(data);
    setCurrentPage('order-confirmation');
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'tees': return Shirt;
      case 'hoodies': return Package;
      case 'posters': return Image;
      case 'mousepads': return Mouse;
      default: return Star;
    }
  };

  // Show loading state initially
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Lowkey! Otaku...</p>
        </div>
      </div>
    );
  }

  // Render different pages
  if (currentPage === 'checkout') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <CheckoutPage
          onBack={() => setCurrentPage('home')}
          cartItems={cartItems}
          cartTotal={getCartTotal()}
          onOrderComplete={handleOrderComplete}
        />
      </Suspense>
    );
  }

  if (currentPage === 'order-confirmation') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <OrderConfirmationPage
          orderData={orderData}
          onBackToHome={() => setCurrentPage('home')}
        />
      </Suspense>
    );
  }

  if (currentPage === 'limited-editions') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LimitedEditionsPage onBack={() => setCurrentPage('home')} />
      </Suspense>
    );
  }

  if (currentPage === 'collaborations') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <CollaborationsPage onBack={() => setCurrentPage('home')} />
      </Suspense>
    );
  }

  if (selectedProduct) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <ProductPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onAddToWishlist={addToWishlist}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Lowkey! Otaku</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => setCurrentPage('limited-editions')}
                  className="nav-link flex items-center gap-1 text-red-400 hover:text-red-300"
                >
                  <Crown className="h-4 w-4" />
                  Limited Editions
                </button>
                <button 
                  onClick={() => setCurrentPage('collaborations')}
                  className="nav-link flex items-center gap-1 text-purple-400 hover:text-purple-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Collaborations
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/80">Hi, {user.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </button>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white/80 hover:text-white"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              <button 
                onClick={() => {
                  setCurrentPage('limited-editions');
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left py-2 text-red-400 hover:text-red-300"
              >
                <Crown className="h-4 w-4" />
                Limited Editions
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('collaborations');
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left py-2 text-purple-400 hover:text-purple-300"
              >
                <Sparkles className="h-4 w-4" />
                Collaborations
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Optimized */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4" />
              PREMIUM ANIME MERCHANDISE
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Stay <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Lowkey!</span>
              <br />
              <span className="text-3xl md:text-5xl">Express Your Otaku Pride</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover exclusive anime merchandise designed by talented artists. From hoodies to posters, we've got everything for the true otaku.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('limited-editions')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Crown className="h-5 w-5" />
                Limited Drops
              </button>
              <button 
                onClick={() => setCurrentPage('collaborations')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Collaborations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Simplified */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-400">Handpicked favorites from our premium collection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => {
              const IconComponent = getIcon(product.category);
              
              return (
                <div 
                  key={product.id} 
                  className="group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="bg-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/20 border border-blue-600/30 group-hover:border-blue-400/50">
                    <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-blue-900/20 to-black/80 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-blue-600/10 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-colors duration-300">
                          <IconComponent className="h-10 w-10 text-blue-400" />
                        </div>
                        <p className="text-gray-400 text-sm">{product.anime}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-blue-400 text-lg font-bold">{product.price}</p>
                        <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full capitalize">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div className="animate-fade-in-up animation-delay-100">
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-400">Anime Series</div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-3xl font-bold text-red-400 mb-2">100+</div>
              <div className="text-gray-400">Unique Designs</div>
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Lowkey! Otaku</span>
            </div>
            <p className="text-gray-400 mb-4">Premium anime merchandise for true otaku</p>
            <p className="text-sm text-gray-500">
              All artwork by <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Garnet</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Modals - Lazy Loaded */}
      <Suspense fallback={null}>
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}
        
        {isCartModalOpen && (
          <CartModal
            isOpen={isCartModalOpen}
            onClose={() => setIsCartModalOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckout={handleCheckout}
            cartTotal={getCartTotal()}
          />
        )}
        
        {isSearchModalOpen && (
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
            onProductSelect={setSelectedProduct}
            products={allProducts}
          />
        )}
      </Suspense>
    </div>
  );
}