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
import TabThree from '../../components/Tabs/TabThree';
import ProFormLayout from '../Form/ProFormLayout';
import WorkOrdersView from '../../modules/Order/OrderWorkView';
import Loader from '../../common/Loader';

const WorkOrderPage: React.FC = () => {
  const {
    workOrders,
    loading,
    error,
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
  } = useWorkOrder();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const renderView = (workOrderDetail) => {
    if (showSideView) {
      return <></>;
    } else if (loadingSideView) {
      return <Loader />;
    } else if (showCreateWorkOrder) {
      return (
        <WorkOrdersForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmitWorkOrders={onSubmitWorkOrders}
        />
      );
    } else {
      return (
        <WorkOrdersView
          data={workOrderDetail}
          status={optionStatusWorkOrders}
        />
      );
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
            onClickDetailWorkOrder={() => onClickDetailWorkOrder()}
            loading={loading}
          >
            {renderView(workOrderDetail)}
          </CustomTableView>
        </div>
      </DefaultLayout>
    </>
  );
};

export default WorkOrderPage;
