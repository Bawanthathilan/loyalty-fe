import { useEffect, useState } from 'react';
import { loyaltyAPI } from '../services/api';

const usePoints = (): number => {
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { response: { balance } } = await loyaltyAPI.getBalance();
        setPoints(balance);
      } catch (error) {
        console.error('Failed to fetch points:', error);
      }
    };

    fetchPoints();
  }, []);

  return points;
};

export default usePoints;
