import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../../layout/DefaultLayout';
import WorkOrdersByLocation from './WorkOrdersByLocation';
import OrdersSummary from './OrdersSummary';


const Reports: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
        <div className="space-y-4">
        <OrdersSummary />
        <WorkOrdersByLocation />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Reports;
