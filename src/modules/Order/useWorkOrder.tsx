import { useEffect, useRef, useState } from 'react';
import { createWorkOrders, fetchWorkOrders } from '../../api/workOrderApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useWorkOrder = () => {
  const listInnerRef = useRef();
  const [workOrders, setWorkOrders] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingSideView, setLoadingSideView] = useState(false);
  const [lastList, setLastList] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [offset, setOffSet] = useState(0);
  const [showView, setShowView] = useState('loading');
  const limit = 10;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [workOrderDetail, setWorOrderDetail] = useState({});

  useEffect(() => {
    getWorkOrders({});
  }, []);

  useEffect(() => {
    if (!lastList && prevPage !== currPage) {
      getWorkOrders({
        scroll: true,
      });
    }
  }, [offset]);

  const getWorkOrders = async ({ scroll = false }) => {
    if (!scroll) setLoading(true);
    try {
      const workOrdersResponse = await fetchWorkOrders({
        offset,
        limit,
      });
      if (!workOrdersResponse.length) {
        setLastList(true);
        return;
      }

      setWorkOrders([...workOrders, ...workOrdersResponse]);
      if (!scroll) {
        setShowView('workorderview');
        setWorOrderDetail(workOrdersResponse[0]);
      }
      setPrevPage(currPage);
      setCurrPage(currPage + 1);
      setError(null);
    } catch (err) {
      setError('Failed to fetch work orders');
    } finally {
      if (!scroll) setLoading(false);
    }
  };

  const reFetchDataWorkOrders = () => {
    getWorkOrders({});
  };

  const onClickCreateWorkOrder = () => {
    setShowView('loading');
    //Implementar the todas las llamadas que se necesitan

    later(2000)
      .then(() => {
        setShowView('workorderform');
      })
      .catch(() => {
        console.log('error');
      });
  };

  const onClickDetailWorkOrder = () => {
    setShowView('loading');
    //Implementar the todas las llamadas que se necesitan

    later(2000)
      .then(() => {
        setShowView('workorderview');
      })
      .catch(() => {
        console.log('error');
      });
  };

  const onSubmitWorkOrders = async (data) => {
    try {
      await createWorkOrders(data);
      setError(null);
      toast.success('Successfully created!');
      reFetchDataWorkOrders();
    } catch (err) {
      setError('Failed to create work orders');
    }
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      console.log('entra', Math.round(scrollTop + clientHeight), scrollHeight);
      if (Math.round(scrollTop + clientHeight) === scrollHeight) {
        console.log('currPage * limit', currPage * limit);
        setOffSet(currPage * limit);
      }
    }
  };

  function later(delay) {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  }

  return {
    workOrders,
    loading,
    error,
    getWorkOrders,
    reFetchDataWorkOrders,
    onClickCreateWorkOrder,
    onClickDetailWorkOrder,
    loadingSideView,
    workOrderDetail,
    onSubmitWorkOrders,
    register,
    handleSubmit,
    onScroll,
    listInnerRef,
    showView,
  };
};
