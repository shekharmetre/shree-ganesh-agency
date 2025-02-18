import React from 'react';
import { Heart, Star, ShoppingCart, Shield, Clock, Award, Sparkles, ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Premium Blood Pressure Monitor",
    price: 129.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1631815589068-dc4f81d4d10f?auto=format&fit=crop&q=80&w=400",
    description: "Professional-grade blood pressure monitoring device with smart connectivity",
    offer: "15% OFF",
    features: ["Bluetooth Connected", "App Support", "Memory Storage"],
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Digital Thermometer Pro",
    price: 49.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
    description: "Infrared digital thermometer with instant readings and fever alert",
    offer: "Free Shipping",
    features: ["Instant Reading", "Fever Alert", "Memory Recall"],
    badge: "New"
  },
  {
    id: 3,
    name: "Smart Pulse Oximeter",
    price: 79.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400",
    description: "Advanced SpO2 and pulse rate monitoring with OLED display",
    offer: "Buy 1 Get 1 50% OFF",
    features: ["OLED Display", "24/7 Monitoring", "USB Rechargeable"],
    badge: "Popular"
  },
  {
    id: 4,
    name: "Advanced Glucose Monitor",
    price: 159.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400",
    description: "Smart glucose monitoring system with continuous tracking",
    offer: "20% OFF First Purchase",
    features: ["Continuous Monitoring", "Mobile App", "Alert System"],
    badge: "Premium"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="py-8 px-4 mb-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Medical Innovations
          </h1>
          <p className="text-center text-gray-600 mt-2">Discover Premium Healthcare Solutions</p>
        </div>
      </header>

      {/* Products Section */}
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto pb-6 custom-scrollbar-light">
          <div className="flex space-x-6 min-w-max pb-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="w-[340px] bg-white rounded-[2rem] overflow-hidden group relative"
                style={{
                  boxShadow: '0 10px 40px -12px rgba(0,0,0,0.1)',
                }}
              >
                {/* Image Container */}
                <div className="relative h-56">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Curved overlay */}
                  <div className="absolute -bottom-3 left-0 right-0 h-12 bg-white"
                       style={{
                         borderTopLeftRadius: '50% 100%',
                         borderTopRightRadius: '50% 100%',
                       }} />
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-lg">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">{product.badge}</span>
                    </div>
                  )}
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 bg-white/95 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                  {/* Offer Tag */}
                  {product.offer && (
                    <div className="absolute bottom-8 right-4 bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium transform rotate-2 shadow-lg">
                      {product.offer}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating and Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1.5 font-medium text-gray-700">{product.rating}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${product.price}</div>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <Shield className="w-4 h-4 mr-2 text-blue-500" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3.5 rounded-2xl flex items-center justify-center group/btn relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    <span className="font-medium">Add to Cart</span>
                  </button>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                      Fast Delivery
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Award className="w-4 h-4 mr-1.5 text-blue-500" />
                      Certified
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;