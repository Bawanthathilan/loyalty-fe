import React from 'react';
import { NavLink } from 'react-router';
import { Home, Plus, Gift, History } from 'lucide-react';

const Navigation: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/earn', icon: Plus, label: 'Earn Points' },
    { to: '/redeem', icon: Gift, label: 'Redeem' },
    { to: '/history', icon: History, label: 'History' },
  ];

  return (
    <nav className="bg-white shadow-sm border-r border-gray-200">
      <div className="p-4">
        <div className="space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;