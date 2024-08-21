import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../common/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import WorkOrdersForm from '../../modules/Order/OrderWorkForm';
import { columnWorkOrders } from '../../modules/Order/configuration';
import { useWorkOrder } from '../../modules/Order/useWorkOrder';
import { CustomGrid, CustomTableView } from '../../components';
import TabThree from '../../components/Tabs/TabThree';
import ProFormLayout from '../Form/ProFormLayout';

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
          <CustomTableView>
            <WorkOrdersForm />
          </CustomTableView>
        </div>
      </DefaultLayout>
    </>
  );
};

export default WorkOrderPage;
