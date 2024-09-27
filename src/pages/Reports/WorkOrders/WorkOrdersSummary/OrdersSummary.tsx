import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../../../../layout/DefaultLayout';
import Chart from './Chart';

const OrdersSummary: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
        <div className="mt-4 ">
        <Chart />
        </div>
      </DefaultLayout>
    </>
  );
};

export default OrdersSummary;
