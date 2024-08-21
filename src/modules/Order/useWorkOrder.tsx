import { useEffect, useState } from 'react';
import { fetchWorkOrders } from '../../api/workOrderApi';

export const useWorkOrder = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorkOrders();
  }, []);

  const getWorkOrders = async () => {
    setLoading(true);
    try {
      const workOrdersResponse = await fetchWorkOrders();
      setWorkOrders(workOrdersResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch work orders');
    } finally {
      setLoading(false);
    }
  };

  const reFetchDataWorkOrders = () => {
    getWorkOrders();
  };

  return {
    workOrders,
    loading,
    error,
    getWorkOrders,
    reFetchDataWorkOrders,
  };
};
