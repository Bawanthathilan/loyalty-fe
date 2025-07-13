import React, { useEffect, useState } from 'react';
import { Gift, Star, Check, AlertCircle } from 'lucide-react';
import { mockRewards } from '../../data/mockData';
import { Reward } from '../../types';
import {loyaltyAPI} from '../../services/api'

const RedeemPoints: React.FC = () => {
  const [userPoints] = useState(1250);
  const [processing, setProcessing] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(mockRewards.map(r => r.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRewards = selectedCategory === 'All' 
    ? mockRewards 
    : mockRewards.filter(r => r.category === selectedCategory);

  const handleRedeem = async (reward: Reward) => {
    if (processing || success) return;

    setProcessing(reward.id);
    setError(null);

    try {
      const response = await loyaltyAPI.redeemPoints(reward.id);
      setSuccess(reward.id);
      setProcessing(null);
      // Optionally, update balance or other state here
      console.log('Redeem success:', response);
    } catch (err) {
      console.error('Redeem failed:', err);
      setError('Already redeemed this reward');
      setProcessing(null);
    }
  };


  useEffect(()=>{
    // fetch balance
    const fetchBalance = async () => {
      try {
        const balance = await loyaltyAPI.getBalance();
        setBalance(balance.response.balance);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
        setError('Failed to fetch balance. Please try again later.');
      }
    };

    fetchBalance();
  },[])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Redeem Rewards</h1>
            <p className="text-gray-600">Use your points to unlock amazing rewards</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-600">{balance}</p>
            <p className="text-sm text-gray-600">Available Points</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-700">{error}</span>
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
        {filteredRewards.map((reward: Reward) => {
          const canRedeem = userPoints >= reward.points_required;
          const isProcessing = processing === reward.id;
          const isSuccess = success === reward.id;

          return (
            <div
              key={reward.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 ${
                canRedeem ? 'hover:shadow-md' : 'opacity-75'
              }`}
            >
              <div className="relative">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-1 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {reward.points_required} pts
                    </span>
                  </div>
                </div>
                {reward.availability <= 10 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white rounded-lg px-2 py-1">
                    <span className="text-xs font-medium">Limited</span>
                  </div>
                )}
                {isSuccess && (
                  <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-t-xl flex items-center justify-center">
                    <div className="bg-green-500 rounded-full p-3">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{reward.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {reward.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">
                    {reward.availability} available
                  </span>
                  {!canRedeem && (
                    <span className="text-xs text-red-500 font-medium">
                      Need {reward.points_required - userPoints} more pts
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canRedeem || isProcessing || isSuccess}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isSuccess
                      ? 'bg-green-500 text-white'
                      : canRedeem
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : isSuccess ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Redeemed!</span>
                    </>
                  ) : (
                    <>
                      <Gift className="h-5 w-5" />
                      <span>Redeem</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RedeemPoints;