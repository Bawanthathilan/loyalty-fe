import React, { useState } from 'react';
import { Plus, ShoppingCart, Check } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import {loyaltyAPI} from '../../services/api'

const EarnPoints: React.FC = () => {
  const { user } = useAuth();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === selectedCategory);

  

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleEarnPoints = async () => {
    if (selectedProducts.length === 0) return;

    setProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const totalPoints = selectedProducts.reduce((total, productId) => {
        const product = mockProducts.find(p => p.id === productId);
        return total + (product?.points || 0);
      }, 0);

      const earn = loyaltyAPI.earnPoints(
        totalPoints
      )

      await earn;

      setSuccess(true);
      setSelectedProducts([]);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to earn points:', error);
    } finally {
      setProcessing(false);
    }
  };

  const totalPoints = selectedProducts.reduce((total, productId) => {
    const product = mockProducts.find(p => p.id === productId);
    return total + (product?.points || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Earn Loyalty Points</h1>
            <p className="text-gray-600">Purchase products to earn points and unlock rewards</p>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-3">
            <Plus className="h-6 w-6 text-white" />
          </div>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <Check className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-medium">Points earned successfully!</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product: Product) => {
          const isSelected = selectedProducts.includes(product.id);
          return (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                isSelected ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'
              }`}
              onClick={() => handleProductSelect(product.id)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-purple-600 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-white rounded-lg px-2 py-1 shadow-sm">
                  <span className="text-sm font-semibold text-purple-600">+{product.points} pts</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProducts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-w-80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {selectedProducts.length} item{selectedProducts.length > 1 ? 's' : ''} selected
              </p>
              <p className="text-purple-600 font-medium">+{totalPoints} points total</p>
            </div>
            <ShoppingCart className="h-6 w-6 text-gray-400" />
          </div>
          <button
            onClick={handleEarnPoints}
            disabled={processing}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {processing ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                <span>Earn {totalPoints} Points</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default EarnPoints;