import React, { useState, useEffect } from 'react';
import { Star, Gift, Clock, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Balance } from '../../types';
import { Link } from 'react-router';
import { loyaltyAPI } from '../../services/api';
import usePoints from '../../hooks/usePoints';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const points = usePoints();

  const quickActions = [
    {
      title: 'Earn Points',
      description: 'Purchase products to earn points',
      icon: Plus,
      color: 'from-green-500 to-emerald-600',
      link: '/earn',
    },
    {
      title: 'Redeem Rewards',
      description: 'Use your points for rewards',
      icon: Gift,
      color: 'from-purple-500 to-violet-600',
      link: '/redeem',
    },
    {
      title: 'View History',
      description: 'See all your transactions',
      icon: Clock,
      color: 'from-blue-500 to-cyan-600',
      link: '/history',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-purple-100">Here's your loyalty overview</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-6 w-6 text-yellow-300" />
              <span className="text-lg font-semibold">Gold Member</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 rounded-lg p-3">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{points}</p>
            <p className="text-sm text-gray-600">Available Points</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;