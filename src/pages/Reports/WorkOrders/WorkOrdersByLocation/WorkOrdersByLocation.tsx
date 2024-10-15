import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../../../../layout/DefaultLayout';

const WorkOrdersByLocation: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
        <div className="mt-4 ">
          {/* <Chart /> */}
          WorkOrdersByLocation
        </div>
      </DefaultLayout>
    </>
  );
};

export default WorkOrdersByLocation;