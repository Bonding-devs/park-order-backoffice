import { useEffect, useRef, useState } from 'react';
import {
  createWorkOrders,
  fetchWorkOrders,
  getWorkOrderById,
  updateWorkOrder,
} from '../../api/workOrderApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { mergeUniqueElementsById } from '../../utils/mergeUniqueElementsById';

export const useWorkOrder = () => {
  const listInnerRef = useRef();
  const [workOrders, setWorkOrders] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingScroll, setLoadingScroll] = useState(false);
  const [lastList, setLastList] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [offset, setOffSet] = useState(0);
  const [showView, setShowView] = useState('loading');
  const limit = 10;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [workOrderDetail, setWorOrderDetail] = useState({});

  useEffect(() => {
    onLoadPaginateData({
      params: {},
      scroll: false,
      filter: 'all',
      paginate: { offset, limit },
    });
  }, []);

  useEffect(() => {
    if (!lastList && prevPage !== currPage) {
      onLoadPaginateData({
        params: {},
        scroll: true,
        filter: 'all',
        paginate: { offset, limit },
      });
    }
  }, [offset]);

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

  const reFetchDataWorkOrders = () => {
    onLoadPaginateData({
      params: {},
      scroll: true,
      filter: 'all',
      paginate: { offset: 0, limit },
      refetch: true,
    });
  };

  const onClickCreateWorkOrder = () => {
    setShowView('loading');
    //Implementar the todas las llamadas que se necesitan
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
      console.log(Math.round(scrollTop + clientHeight) === scrollHeight);
      if (Math.round(scrollTop + clientHeight) === scrollHeight) {
        setOffSet(currPage * limit);
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
    filter = 'all',
    paginate,
    refetch = false,
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

      if (filter != 'all') {
        setOffSet(0);
        setPrevPage(0);
        setCurrPage(0);
        setLastList(false);
        setWorkOrders(workOrdersResponse);
      } else {
        const counterResponse = workOrdersResponse.length < limit ? 0 : 1;
        setPrevPage(currPage);
        setCurrPage(currPage + counterResponse);
        setWorkOrders(
          mergeUniqueElementsById(workOrders, workOrdersResponse, refetch)
        );
      }

      setError(null);
    } catch (err) {
      setError('Failed to fetch work orders');
    } finally {
      if (!scroll) setLoading(false);
    }
  };

  const editWorkOrder = async ({ id, data }) => {
    try {
      const workOrdersResponseEdited = await updateWorkOrder({
        id,
        data,
      });
      setError(null);
      setWorOrderDetail(workOrdersResponseEdited);
      toast.success('Work Order Successfully Edited');
    } catch (err) {
      setError('Failed to fetch work orders');
    }
  };

  return {
    workOrders,
    loading,
    error,
    getWorkOrders,
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
    onFilterWorkOrder: onLoadPaginateData,
    control,
    errors,
    editWorkOrder,
  };
};
