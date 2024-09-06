import { useLocation } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../../../layout/DefaultLayout';

const DetailsNavigatorPage: React.FC = () => {
  const location = useLocation();
  const { selectedItem } = location.state || {}; // Desestructurar el objeto item
  console.log(location.state);
  if (!selectedItem) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <DefaultLayout>
        <ToastContainer />
        <DetailsPage
          name={selectedItem.name}
          address={selectedItem.address}
          description={selectedItem.description}
          photo={selectedItem.photo}
          id={selectedItem.id}
          team={selectedItem.team}
        />
      </DefaultLayout>
    </div>
  );
};

export default DetailsNavigatorPage;
