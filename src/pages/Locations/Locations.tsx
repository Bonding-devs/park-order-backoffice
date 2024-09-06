import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../../layout/DefaultLayout';
import { LocationBody } from './LocationBody';
import { LocationProvider } from '../../context/LocationContext';
import { LocationHeader } from './LocationHeader';

export const Locations: React.FC = () => {
  return (
    <LocationProvider>
      <DefaultLayout>
        <ToastContainer />
        <LocationHeader />
        <LocationBody />
      </DefaultLayout>
    </LocationProvider>
  );
};
