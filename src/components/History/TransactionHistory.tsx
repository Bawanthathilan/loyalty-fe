import React, { useEffect, useState } from 'react';
import { History, Plus, Gift } from 'lucide-react';
import { Transaction } from '../../types';
import {loyaltyAPI} from '../../services/api'

const TransactionHistory: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'earn',
      points: 50,
      description: 'Premium Coffee purchase',
      date: '2024-01-15T10:30:00Z',
      reference: 'TXN001'
    },
    {
      id: '2',
      type: 'redeem',
      points: -200,
      description: 'Free Coffee reward',
      date: '2024-01-14T15:45:00Z',
      reference: 'RDM001'
    },
    {
      id: '3',
      type: 'earn',
      points: 120,
      description: 'Gourmet Sandwich purchase',
      date: '2024-01-13T12:20:00Z',
      reference: 'TXN002'
    },
    {
      id: '4',
      type: 'earn',
      points: 80,
      description: 'Organic Salad purchase',
      date: '2024-01-12T14:15:00Z',
      reference: 'TXN003'
    },
    {
      id: '5',
      type: 'redeem',
      points: -150,
      description: '10% Discount coupon',
      date: '2024-01-11T09:30:00Z',
      reference: 'RDM002'
    },
    {
      id: '6',
      type: 'earn',
      points: 95,
      description: 'Smoothie Bowl purchase',
      date: '2024-01-10T16:45:00Z',
      reference: 'TXN004'
    },
    {
      id: '7',
      type: 'earn',
      points: 60,
      description: 'Pastry Delight purchase',
      date: '2024-01-09T11:20:00Z',
      reference: 'TXN005'
    },
    {
      id: '8',
      type: 'redeem',
      points: -300,
      description: 'VIP Access reward',
      date: '2024-01-08T13:10:00Z',
      reference: 'RDM003'
    }
  ]);

  const [history, setHistory] = useState<Transaction[]>([]);

  const [filter, setFilter] = useState<'all' | 'earn' | 'redeem'>('all');

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await loyaltyAPI.getHistory();
        console.log("Fetched transactions:", response);
        setHistory(response.accounts);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  },[])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {filter === 'all' ? 'All Transactions' : 
             filter === 'earn' ? 'Points Earned' : 'Points Redeemed'}
            <span className="text-gray-500 font-normal ml-2">({history.length})</span>
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'earn' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'earn' ? (
                      <Plus className="h-6 w-6" />
                    ) : (
                      <Gift className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </span>
                      {transaction.reference && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {transaction.reference}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${
                    transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'earn' ? '+' : ''}{transaction.points}
                  </div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500">Try adjusting your filters or date range.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;