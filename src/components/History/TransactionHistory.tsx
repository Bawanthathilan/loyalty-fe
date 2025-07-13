import React, { useEffect, useState } from 'react';
import { History, Plus, Gift } from 'lucide-react';
import { Transaction } from '../../types';
import { loyaltyAPI } from '../../services/api';

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'earn' | 'redeem'>('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await loyaltyAPI.getHistory();
        const mapped: Transaction[] = response.accounts.map((acc: any) => {
          const r = acc.response;
          let type: 'earn' | 'redeem' = 'earn';
          let points = 0;
          let description = '';

          if (r.type === 'ACCUMULATE_POINTS' && r.accumulate_points) {
            type = 'earn';
            points = r.accumulate_points.points;
            description = `Points earned`;
          } else if (r.type === 'CREATE_REWARD' && r.create_reward) {
            type = 'redeem';
            points = r.create_reward.points;
            description = `Redeemed reward ${r.create_reward.reward_id}`;
          } else if (r.type === 'REDEEM_REWARD' && r.redeem_reward) {
            type = 'redeem';
            points = 0;
            description = `Redeemed reward ${r.redeem_reward.reward_id}`;
          }

          return {
            id: r.id,
            type,
            points,
            description,
            date: r.created_at,
            reference: r.id,
          };
        });
        setTransactions(mapped);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(t =>
    filter === 'all' ? true : t.type === filter
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {filter === 'all' ? 'All Transactions' :
             filter === 'earn' ? 'Points Earned' : 'Points Redeemed'}
            <span className="text-gray-500 font-normal ml-2">({filteredTransactions.length})</span>
          </h2>
          <div className="space-x-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>All</button>
            <button onClick={() => setFilter('earn')} className={`px-3 py-1 rounded ${filter === 'earn' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>Earn</button>
            <button onClick={() => setFilter('redeem')} className={`px-3 py-1 rounded ${filter === 'redeem' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}>Redeem</button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTransactions.map(transaction => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'earn'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'earn' ? <Plus className="h-6 w-6" /> : <Gift className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                      {transaction.reference && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{transaction.reference}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${ transaction.type === 'earn' ? 'text-green-600' : 'text-red-600' }`}>
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
