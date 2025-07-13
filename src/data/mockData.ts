import { Product, Reward } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee',
    description: 'Artisan roasted coffee beans from Colombia',
    points: 50,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Gourmet Sandwich',
    description: 'Fresh ingredients with premium meats and cheese',
    points: 120,
    category: 'Food',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Organic Salad',
    description: 'Fresh organic vegetables with house dressing',
    points: 80,
    category: 'Food',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Smoothie Bowl',
    description: 'Acai bowl with fresh fruits and granola',
    points: 95,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Pastry Delight',
    description: 'Freshly baked croissant with chocolate filling',
    points: 60,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    name: 'Energy Drink',
    description: 'Natural energy boost with vitamins',
    points: 40,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockRewards: Reward[] = [
  {
    id: '5d0de7d6-5305-339b-9d00-1edfd342639c',
    name: 'Free Coffee',
    description: 'Any coffee of your choice',
    points_required: 200,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: 50
  },
  {
    id: '696d35e3-fb2c-3c74-8339-a30eec422881',
    name: '10% Discount',
    description: '10% off your next purchase',
    points_required: 150,
    category: 'Discounts',
    image: 'https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: 100
  },
  {
    id: 'cabf2817-99a2-3208-bbf0-82406c01db65',
    name: 'Free Meal',
    description: 'Complete meal of your choice',
    points_required: 500,
    category: 'Food',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: 25
  },
];