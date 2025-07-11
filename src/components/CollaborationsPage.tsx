import React from 'react';
import { ArrowLeft, Star, Package, Shirt, Image, Mouse, Crown, Award, Zap } from 'lucide-react';
import ProductPage from './ProductPage';
import { useCart } from '../hooks/useCart';

interface CollaborationsPageProps {
  onBack: () => void;
}

export default function CollaborationsPage({ onBack }: CollaborationsPageProps) {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const { addToCart, addToWishlist } = useCart();

  const collaborations = [
    {
      partner: "Craft Singh",
      collection: "Premium Streetwear Collection",
      description: "Exclusive collaboration featuring high-end streetwear designs with anime aesthetics",
      items: "15 exclusive designs",
      status: "Available Now",
      logo: Crown,
      products: [
        { id: "c1", name: "Craft Singh x Lowkey Dragon Hoodie", price: "R750", anime: "Dragon Ball Z", type: "Designer Collab", category: "hoodies", description: "Exclusive designer collaboration featuring premium streetwear aesthetics with Dragon Ball Z elements. Limited edition with custom embroidery." },
        { id: "c2", name: "Urban Saiyan Tee", price: "R550", anime: "Dragon Ball Z", type: "Designer Collab", category: "tees", description: "High-end streetwear tee with minimalist Saiyan design. Premium cotton blend with subtle metallic accents." },
        { id: "c3", name: "Power Level Poster", price: "R380", anime: "Dragon Ball Z", type: "Designer Collab", category: "posters", description: "Designer poster featuring abstract power level visualization. Museum-quality print with holographic elements." },
        { id: "c4", name: "Kamehameha Wave Mousepad", price: "R580", anime: "Dragon Ball Z", type: "Designer Collab", category: "mousepads", description: "Premium gaming mousepad with energy wave design. RGB-compatible edges and anti-slip base." },
        { id: "c5", name: "Elite Warrior Hoodie", price: "R850", anime: "Dragon Ball Z", type: "Designer Collab", category: "hoodies", description: "Ultra-premium hoodie with hand-finished details. Features custom Craft Singh branding and anime-inspired graphics." }
      ]
    },
    {
      partner: "Exactly Clothing",
      collection: "Precision Anime Wear",
      description: "Meticulously crafted anime apparel with attention to every detail and perfect fit",
      items: "12 exclusive designs",
      status: "Pre-Order",
      logo: Award,
      products: [
        { id: "c6", name: "Exactly x Lowkey Naruto Tee", price: "R520", anime: "Naruto", type: "Precision Fit", category: "tees", description: "Perfectly tailored tee with precise measurements and premium fabric. Features subtle Naruto-inspired design elements." },
        { id: "c7", name: "Hokage Precision Hoodie", price: "R780", anime: "Naruto", type: "Precision Fit", category: "hoodies", description: "Meticulously crafted hoodie with perfect fit guarantee. Premium materials with Hokage-inspired design details." },
        { id: "c8", name: "Village Hidden Poster", price: "R370", anime: "Naruto", type: "Precision Fit", category: "posters", description: "High-precision print featuring Hidden Leaf Village. Exact color matching and premium paper quality." },
        { id: "c9", name: "Shinobi Precision Mousepad", price: "R570", anime: "Naruto", type: "Precision Fit", category: "mousepads", description: "Precisely engineered mousepad with optimal surface texture. Perfect dimensions for competitive gaming." }
      ]
    }
  ];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product, size, quantity) => {
    addToCart(product, size, quantity);
    alert(`Added ${quantity}x ${product.name} (${size}) to cart!`);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    alert(`Added ${product.name} to wishlist!`);
  };

  if (selectedProduct) {
    return (
      <ProductPage 
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    );
  }

  const getIcon = (category: string) => {
    switch (category) {
      case 'tees': return Shirt;
      case 'hoodies': return Package;
      case 'posters': return Image;
      case 'mousepads': return Mouse;
      default: return Star;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Official Collab': return 'from-purple-500 to-purple-700';
      case 'Movie Exclusive': return 'from-blue-500 to-blue-700';
      case 'Artist Series': return 'from-green-500 to-green-700';
      case 'Anniversary Edition': return 'from-yellow-500 to-yellow-700';
      default: return 'from-purple-500 to-purple-700';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4" />
            EXCLUSIVE PARTNERSHIPS
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Epic <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Collaborations</span>
          </h1>
          <p className="text-xl text-gray-400">Official partnerships with legendary anime studios - All artwork by <a href="https://www.instagram.com/garnet_arts._/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">Garnet</a></p>
        </div>

        {/* Collaborations Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {collaborations.map((collab, index) => {
            const LogoIcon = collab.logo;
            return (
              <div key={index} className="bg-gradient-to-br from-purple-900/20 to-black/80 rounded-lg p-8 border border-purple-600/30 group hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-600/10 rounded-full p-3 group-hover:bg-purple-600/20 transition-colors duration-300">
                      <LogoIcon className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-purple-400 transition-colors duration-300">{collab.partner}</h3>
                      <p className="text-purple-400 font-semibold">{collab.collection}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    collab.status === 'Available Now' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {collab.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{collab.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{collab.items}</span>
                  <span className="text-sm text-purple-400 font-semibold">{collab.products.length} products available</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Collaboration Products */}
        <div className="space-y-16">
          {collaborations.map((collab, collabIndex) => (
            <div key={collabIndex}>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-purple-600/10 rounded-full p-3">
                  <collab.logo className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{collab.partner}</h2>
                  <p className="text-purple-400">{collab.collection}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {collab.products.map((product, productIndex) => {
                  const IconComponent = getIcon(product.category);
                  
                  return (
                    <div key={productIndex} className="group cursor-pointer" onClick={() => handleProductSelect(product)}>
                      <div className="bg-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/20 border border-purple-600/30 group-hover:border-purple-400/50 relative">
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`bg-gradient-to-r ${getTypeColor(product.type)} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                            {product.type}
                          </span>
                        </div>
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-black/80 text-purple-300 text-xs px-2 py-1 rounded-full font-semibold">
                            Official
                          </span>
                        </div>
                        <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-purple-900/20 to-black/80 h-80 flex items-center justify-center">
                          <div className="text-center">
                            <div className="bg-purple-600/10 rounded-full p-8 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600/20 transition-colors duration-300">
                              <IconComponent className="h-12 w-12 text-purple-400" />
                            </div>
                            <p className="text-gray-400 text-sm">{product.anime}</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300">{product.name}</h3>
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-purple-400 text-lg font-bold">{product.price}</p>
                            <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full capitalize">
                              {product.category}
                            </span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductSelect(product);
                            }}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                          >
                            {collab.status === 'Pre-Order' ? 'Pre-Order Details' : 'View Details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}