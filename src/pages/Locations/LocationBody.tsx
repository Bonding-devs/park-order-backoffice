import { useNavigate } from 'react-router-dom';
import { useGetLocations } from '../../modules/Locations/useLocations';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';
import DetailsPage from './View/DetailsPage';
import { LocationItem } from './LocationItem';
import { RightSideOptions, useLocations } from '../../context/LocationContext';
import { LocationModel } from '../../models/location-model';
import { LocationFormProvider } from './Form/LocationFormProvider';

export const LocationBody: React.FC = ({}) => {
  const navigate = useNavigate();
  const { loading, items, error, lastItemRef, selectedItem, setSelectedItem } =
    useGetLocations();
  const { setMode } = useLocations();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleClick = (index: number) => {
    const location = items[index];
    setSelectedItem(index);
    setMode(RightSideOptions.VIEW);
    if (window.innerWidth < 768) {
      navigate(`/locations/details/${location.id}`, {
        state: { selectedItem: location },
      });
    }
  };
  return (
    <>
      <div className="custom-border rounded-sm border shadow-default">
        <div className="flex h-[calc(100vh-186px)] overflow-hidden  rounded-sm sm:h-[calc(100vh-174px)] ">
          {/* left */}
          <div className="h-full overflow-scroll border-stroke bg-white xsm:w-full xl:w-2/4">
            {
              <div className="flex flex-col">
                <div className="m-3">
                  {items.map((location, item) => {
                    const isSelected = selectedItem == item;
                    return (
                      <LocationItem
                        location={location}
                        handleClick={() => handleClick(item)}
                        key={item}
                        isSelected={isSelected}
                      />
                    );
                  })}
                  <div ref={lastItemRef} />
                  {loading ? <Loader></Loader> : null}
                </div>

                {}
              </div>
            }
          </div>
          {/* Right */}
          <div className="custom-border hidden h-full flex-col overflow-scroll border-l bg-white xl:flex xl:w-3/4">
            <RightSide
              selectedItem
              location={items[selectedItem] ? items[selectedItem] : null}
            />
          </div>
        </div>
      </div>
    </>
  );
};

interface RightSideParams {
  location?: LocationModel;
  selectedItem?: boolean;
}

const RightSide: React.FC<RightSideParams> = ({ location, selectedItem }) => {
  const { mode } = useLocations();

  switch (mode) {
    case RightSideOptions.VIEW:
      return selectedItem !== null && location != null ? (
        <DetailsPage
          id={location.id}
          name={location.name}
          address={location.address}
          description={location.description}
          photo={location.photo.path}
          team={location.teamInCharge?.name}
        />
      ) : null;
    case RightSideOptions.CREATE:
      return <LocationFormProvider option={mode}/>;

    case RightSideOptions.UPDATE:
      return (
        <LocationFormProvider
          option={mode}
          location={location}
        />
      );
    default:
      break;
  }
};
