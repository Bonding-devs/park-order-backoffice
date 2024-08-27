import { useEffect, useState } from 'react';
import { createWorkOrders, fetchWorkOrders } from '../../api/workOrderApi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useWorkOrder = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateWorkOrder, setShowCreateWorkOrder] = useState(false);
  const [loadingSideView, setLoadingSideView] = useState(false);
  const [loadingCreateWO, setLoadingCreateWO] = useState(false);
  const [showSideView, setShowSideView] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [workOrderDetail, setWorOrderDetail] = useState({
    id: 'd6ee3dc2-9fb1-4933-840c-31cf937461ad',
    title: 'Repair lighting system',
    description: 'The lighting system in the parking lot is not working.',
    status: 'in_progress',
    location: {
      id: 'bf84be3a-5cd7-4b34-8d12-0896c9e99da3',
    },
    assignedUser: null,
    assignedTeam: {
      id: '311477ce-c8d8-45dc-bd20-1f6910d7d65c',
    },
    createdByUser: {
      id: '156009ea-cf05-4994-8242-825f45e251e1',
    },
    category: {
      id: '9df01ff4-af84-4498-9b2d-ea79728d3543',
    },
    issue: {
      id: '34b724e1-ce45-4b36-becf-a5bb3ed90db4',
    },
    priority: 'medium',
    recurrence: 'none',
    recurrenceEndDate: null,
    createdAt: '2024-08-21T21:52:06.846Z',
    updatedAt: '2024-08-21T21:52:06.846Z',
    deletedAt: null,
  });

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

    //Implementing the setInterval method
    setInterval(() => {
      setLoadingSideView(false);
    }, 3000);
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

  const onSubmitWorkOrders = async (data) => {
    setLoadingCreateWO(true);
    try {
      debugger;
      const { title } = data;
      await createWorkOrders(title);
      setError(null);
      toast.success('Successfully created!');
      reFetchDataWorkOrders();
    } catch (err) {
      setError('Failed to create work orders');
    } finally {
      setLoadingCreateWO(false);
    }
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
    workOrderDetail,
    onSubmitWorkOrders,
    register,
    handleSubmit,
  };
};
