import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../common/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import WorkOrdersForm from '../../modules/Order/OrderWorkForm';
import { columnWorkOrders } from '../../modules/Order/configuration';
import { useWorkOrder } from '../../modules/Order/useWorkOrder';
import { CustomGrid } from '../../components';

const WorkOrderPage: React.FC = () => {
  const { workOrders, loading, error, reFetchDataWorkOrders } = useWorkOrder();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Work Orders" reDirectionUrl="/work-order" />
        <ToastContainer />
        <div className="">
          <Modal buttonText="Add Work Order">
            {({ closeModal }) => (
              <WorkOrdersForm
                closeModal={closeModal}
                reFetchData={reFetchDataWorkOrders}
              />
            )}
          </Modal>

          <CustomGrid
            customData={workOrders}
            customColumn={columnWorkOrders}
            loading={loading}
          />
        </div>
      </DefaultLayout>
    </>
  );
};

export default WorkOrderPage;
