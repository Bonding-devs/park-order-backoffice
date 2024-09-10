import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { RightSideOptions, useLocations } from '../../context/LocationContext';

export const LocationHeader: React.FC = ({}) => {
  const { setMode } = useLocations();

  const handleClick = () => {
    setMode(RightSideOptions.CREATE);
  };
  return (
    <Breadcrumb
      pageName="Locations"
      reDirectionUrl="/locations"
      render={() => (
        <>
          <button
            onClick={handleClick}
            className="rounded-md bg-primary px-9 py-3 font-medium text-white hover:bg-opacity-90"
          >
            New Location
          </button>
        </>
      )}
    />
  );
};
