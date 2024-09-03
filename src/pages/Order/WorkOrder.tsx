import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../common/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import WorkOrdersForm from '../../modules/Order/OrderWorkForm';
import {
  columnWorkOrders,
  optionStatusWorkOrders,
} from '../../modules/Order/configuration';
import { useWorkOrder } from '../../modules/Order/useWorkOrder';
import { CustomGrid, CustomTableView } from '../../components';
import WorkOrdersView from '../../modules/Order/OrderWorkView';
import Loader from '../../common/LoaderPage';

const WorkOrderPage: React.FC = () => {
  const {
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
    onFilterWorkOrder,
  } = useWorkOrder();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const renderView = () => {
    switch (showView) {
      case 'loading':
        return <Loader />;
      case 'workorderform':
        return (
          <WorkOrdersForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmitWorkOrders={onSubmitWorkOrders}
          />
        );

      case 'workorderview':
        return (
          <WorkOrdersView
            data={workOrderDetail}
            status={optionStatusWorkOrders}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb
          pageName="Work Orders"
          reDirectionUrl="/work-order"
          render={() => (
            <>
              <button
                onClick={() => onClickCreateWorkOrder()}
                className="rounded-md bg-primary px-9 py-3 font-medium text-white hover:bg-opacity-90"
              >
                New Order Work
              </button>
            </>
          )}
        />
        <ToastContainer />

        <div className="">
          <CustomTableView
            data={workOrders}
            onClickDetailWorkOrder={onClickDetailWorkOrder}
            loading={loading}
            onScroll={onScroll}
            listInnerRef={listInnerRef}
            onFilter={onFilterWorkOrder}
            loadingScroll={loadingScroll}
          >
            {renderView(workOrderDetail)}
          </CustomTableView>
        </div>
      </DefaultLayout>
    </>
  );
};

export default WorkOrderPage;
