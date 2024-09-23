import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../common/LoaderPage';
import { CustomTableView } from '../../components';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import WorkOrdersForm from '../../modules/Order/OrderWorkForm';
import WorkOrdersView from '../../modules/Order/OrderWorkView';
import { optionStatusWorkOrders } from '../../modules/Order/configuration';
import { useWorkOrder, WorkOrderView } from '../../modules/Order/useWorkOrder';

const WorkOrderPage: React.FC = () => {
  const {
    workOrders,
    loading,
    error,
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
    searchTerm,
    setSearchTerm,
  } = useWorkOrder();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const renderView = () => {
    switch (showView) {
      case WorkOrderView.Loading:
        return <Loader />;
      case WorkOrderView.Form:
        return (
          <WorkOrdersForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmitWorkOrders={onSubmitWorkOrders}
            control={control}
            errors={errors}
          />
        );
      case WorkOrderView.View:
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
        <CustomTableView
          data={workOrders}
          onClickDetailWorkOrder={onClickDetailWorkOrder}
          loading={loading}
          onScroll={onScroll}
          listInnerRef={listInnerRef}
          activeTab={activeTab}
          changeTab={changeTab}
          loadingScroll={loadingScroll}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        >
          {renderView()}
        </CustomTableView>
      </DefaultLayout>
    </>
  );
};

export default WorkOrderPage;
