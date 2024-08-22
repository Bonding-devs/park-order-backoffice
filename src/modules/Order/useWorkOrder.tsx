import { useEffect, useState } from 'react';
import { fetchWorkOrders } from '../../api/workOrderApi';

export const useWorkOrder = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateWorkOrder, setShowCreateWorkOrder] = useState(false);
  const [loadingSideView, setLoadingSideView] = useState(true);
  const [showSideView, setShowSideView] = useState(true);

  useEffect(() => {
    getWorkOrders();
  }, []);

  const getWorkOrders = async () => {
    setLoading(true);
    try {
      const workOrdersResponse = await fetchWorkOrders();
      setWorkOrders(workOrdersResponse);
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

  const onClickCreateWorkOrder = () => {
    setLoadingSideView(true);
    setShowSideView(false);
    setShowCreateWorkOrder(true);
    setLoadingSideView(false);
  };

  const onClickDetailWorkOrder = () => {
    setLoadingSideView(true);
    setShowSideView(false);
    setShowCreateWorkOrder(false);

    //Implementing the setInterval method
    setInterval(() => {
      setLoadingSideView(false);
    }, 3000);
  };

  return {
    workOrders,
    loading,
    error,
    getWorkOrders,
    reFetchDataWorkOrders,
    onClickCreateWorkOrder,
    showCreateWorkOrder,
    onClickDetailWorkOrder,
    loadingSideView,
    showSideView,
  };
};
