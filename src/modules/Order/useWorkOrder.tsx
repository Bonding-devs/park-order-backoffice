import { useEffect, useMemo, useRef, useState } from 'react';
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
import { useSearch } from './useSearch';
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

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
  const [workOrderDetail, setWorOrderDetail] = useState<WorkOrder | null>(null);


  const { searchTerm, setSearchTerm, debouncedSearchTerm } = useSearch('', 1000);

  const { currPage, incrementPage, resetPagination, getOffset, setIsLastList } = usePagination({ limit });
  const { activeTab, changeTab } = useTabs();


  const queryParams = useMemo(() => ({
    status: activeTab === WorkOrderFilter.Done ? WorkOrderFilter.Done : undefined,
    textToSearch: debouncedSearchTerm || undefined,
  }), [activeTab, debouncedSearchTerm]);


  useEffect(() => {
    reFetchDataWorkOrders(activeTab, debouncedSearchTerm);
  }, [activeTab, debouncedSearchTerm]);

  useEffect(() => {
    onLoadPaginateData({
      params: queryParams,
      scroll: true,
      paginate: { offset: getOffset(), limit },
    });
  }, [currPage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  const getWorkOrders = async ({ params = {}, paginate = {} }) => {
    try {
      const workOrdersResponse = await fetchWorkOrders({ ...params, ...paginate });
      setError(null);
      return workOrdersResponse;
    } catch (err) {
      setError('Failed to fetch work orders');
      return [];
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
    setTimeout(() => setShowView(WorkOrderView.Form), 1000);
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

  const onLoadPaginateData = async ({
    params,
    scroll = false,
    paginate,
  }) => {
    if (!scroll) setLoading(true);
    try {
      const workOrdersResponse = await getWorkOrders({ params, paginate });

      if (!workOrdersResponse.length) {
        setIsLastList(true);
        return;
      }

      if (!scroll) {
        setShowView(WorkOrderView.View);
        setWorOrderDetail(workOrdersResponse[0]);
      }

      setWorkOrders(prevOrders => (
        scroll ? mergeUniqueElementsById(prevOrders, workOrdersResponse) : workOrdersResponse
      ));

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
