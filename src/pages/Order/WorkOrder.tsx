import React from 'react';
import { ToastContainer } from 'react-toastify';
import { CustomTableView } from '../../components';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { PrincipalButton } from '../../components/CustomButtons/PrincipalButton';
import DefaultLayout from '../../layout/DefaultLayout';
import { useWorkOrder } from '../../modules/Order/useWorkOrder';
import WorkOrderDetail from './WorkOrderDetail';

const WorkOrderPage: React.FC = () => {
  const {
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
  } = useWorkOrder();

  return (
    <>
      <DefaultLayout>
        <Breadcrumb
          pageName="Work Orders"
          reDirectionUrl="/work-order"
          render={() => (
            <PrincipalButton onClick={onClickCreateWorkOrder}>
              New Order Work
            </PrincipalButton>
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
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        >
          <WorkOrderDetail
            showView={showView}
            register={register}
            handleSubmit={handleSubmit}
            onSubmitWorkOrders={onSubmitWorkOrders}
            control={control}
            errors={errors}
            workOrderDetail={workOrderDetail}
          />
        </CustomTableView>
      </DefaultLayout>
    </>
  );
};

export default WorkOrderPage;
