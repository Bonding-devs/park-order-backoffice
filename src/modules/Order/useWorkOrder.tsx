import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  createWorkOrders,
  fetchWorkOrders,
  getWorkOrderById,
} from '../../api/workOrderApi';
import { mergeUniqueElementsById } from '../../utils/mergeUniqueElementsById';
import { usePagination } from './usePagination';
import { useTabs } from './useTabs';

export const useWorkOrder = () => {
  const listInnerRef = useRef();
  const [workOrders, setWorkOrders] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingScroll, setLoadingScroll] = useState(false);
  const [showView, setShowView] = useState('loading');
  const limit = 10;

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
  const [workOrderDetail, setWorOrderDetail] = useState({});


  const { currPage, lastList, incrementPage, resetPagination, getOffset, setLastList } =
    usePagination({ limit });


  const { activeTab, changeTab } = useTabs();


  useEffect(() => {
    reFetchDataWorkOrders(activeTab);
  }, [activeTab]);


  useEffect(() => {
    if (!lastList) {
      onLoadPaginateData({
        params: activeTab === 'done' ? { status: 'done' } : {},
        scroll: true,
        paginate: { offset: getOffset(), limit },
      });
    }
  }, [currPage]);

  const getWorkOrders = async ({ params = {}, paginate = {} }) => {
    try {
      const workOrdersResponse = await fetchWorkOrders({
        ...params,
        ...paginate,
      });

      setError(null);
      return workOrdersResponse;
    } catch (err) {
      setError('Failed to fetch work orders');
    }
  };

  const reFetchDataWorkOrders = (filter = 'all') => {
    setWorkOrders([]);
    resetPagination();
    onLoadPaginateData({
      params: filter === 'done' ? { status: 'done' } : {},
      scroll: false,
      paginate: { offset: getOffset(), limit },
    });
  };

  const onClickCreateWorkOrder = () => {
    setShowView('loading');
    later(1000)
      .then(() => {
        setShowView('workorderform');
      })
      .catch(() => {
        console.log('error');
      });
  };

  const onClickDetailWorkOrder = async (id) => {
    setShowView('loading');
    try {
      const workOrdersResponseDetail = await getWorkOrderById({
        id,
      });

      setWorOrderDetail(workOrdersResponseDetail);
      setShowView('workorderview');

      setError(null);
    } catch (err) {
      setError('Failed to fetch work order');
    }
  };

  const onSubmitWorkOrders = async (data) => {
    try {
      await createWorkOrders(data);
      setError(null);
      reset();
      toast.success('Successfully created!');
      reFetchDataWorkOrders();
    } catch (err) {
      setError('Failed to create work orders');
    }
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (Math.round(scrollTop + clientHeight) === scrollHeight) {
        incrementPage();
      }
    }
  };

  function later(delay) {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  }

  const onLoadPaginateData = async ({
    params,
    scroll = false,
    paginate,
  }) => {
    if (!scroll) setLoading(true);
    try {
      const workOrdersResponse = await getWorkOrders({
        params,
        paginate,
      });

      if (!workOrdersResponse.length) {
        setLastList(true);
        return;
      }

      if (!scroll) {
        setShowView('workorderview');
        setWorOrderDetail(workOrdersResponse[0]);
      }

      if (scroll) {
        setWorkOrders((prevOrders) =>
          mergeUniqueElementsById(prevOrders, workOrdersResponse)
        );
      } else {
        setWorkOrders(workOrdersResponse);
      }

      setError(null);
    } catch (err) {
      setError('Failed to fetch work orders');
    } finally {
      if (!scroll) setLoading(false);
    }
  };

  return {
    workOrders,
    loading,
    error,
    reFetchDataWorkOrders,
    onClickCreateWorkOrder,
    onClickDetailWorkOrder,
    loadingScroll,
    workOrderDetail,
    onSubmitWorkOrders,
    register,
    handleSubmit,
    onScroll,
    listInnerRef,
    showView,
    control,
    errors,
    activeTab,
    changeTab,
  };
};
