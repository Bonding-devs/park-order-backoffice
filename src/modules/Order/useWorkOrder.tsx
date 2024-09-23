import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  createWorkOrders,
  fetchWorkOrders,
  getWorkOrderById,
} from '../../api/workOrderApi';
import { WorkOrder } from '../../models/workOrder';
import { mergeUniqueElementsById } from '../../utils/mergeUniqueElementsById';
import { usePagination } from './usePagination';
import { useTabs, WorkOrderFilter } from './useTabs';

export enum WorkOrderView {
  Loading = 'loading',
  Form = 'workorderform',
  View = 'workorderview',
}

export const useWorkOrder = () => {
  const listInnerRef = useRef<HTMLDivElement>(null);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showView, setShowView] = useState<WorkOrderView>(WorkOrderView.Loading);
  const limit = 10;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
  const [workOrderDetail, setWorOrderDetail] = useState<WorkOrder | null>(null);

  const { currPage, lastList, incrementPage, resetPagination, getOffset, setLastList } =
    usePagination({ limit });

  const { activeTab, changeTab } = useTabs();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);


  useEffect(() => {
    setSearchTerm('');
    reFetchDataWorkOrders(activeTab, '');
  }, [activeTab]);


  useEffect(() => {
    reFetchDataWorkOrders(activeTab, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!lastList) {
      onLoadPaginateData({
        params: {
          status: activeTab === WorkOrderFilter.Done ? WorkOrderFilter.Done : undefined,
          textToSearch: debouncedSearchTerm || undefined,
        },
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

  const reFetchDataWorkOrders = (filter = WorkOrderFilter.All, textToSearch = '') => {
    setWorkOrders([]);
    resetPagination();
    onLoadPaginateData({
      params: {
        status: filter === WorkOrderFilter.Done ? WorkOrderFilter.Done : undefined,
        textToSearch: textToSearch || undefined,
      },
      scroll: false,
      paginate: { offset: getOffset(), limit },
    });
  };

  const onClickCreateWorkOrder = () => {
    setShowView(WorkOrderView.Loading);
    later(1000)
      .then(() => {
        setShowView(WorkOrderView.Form);
      })
      .catch(() => {
        console.log('error');
      });
  };

  const onClickDetailWorkOrder = async (id: string) => {
    setShowView(WorkOrderView.Loading);
    try {
      const workOrdersResponseDetail = await getWorkOrderById({ id });
      setWorOrderDetail(workOrdersResponseDetail);
      setShowView(WorkOrderView.View);
      setError(null);
    } catch (err) {
      setError('Failed to fetch work order');
    }
  };

  const onSubmitWorkOrders = async (data: any) => {
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

  function later(delay: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  }

  const onLoadPaginateData = async ({
    params,
    scroll = false,
    paginate,
  }: any) => {
    if (!scroll) setLoading(true);
    try {
      const workOrdersResponse: WorkOrder[] = await getWorkOrders({
        params,
        paginate,
      });

      if (!workOrdersResponse.length) {
        setLastList(true);
        return;
      }

      if (!scroll) {
        setShowView(WorkOrderView.View);
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
    onClickCreateWorkOrder,
    onClickDetailWorkOrder,
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
    searchTerm,
    setSearchTerm,
  };
};