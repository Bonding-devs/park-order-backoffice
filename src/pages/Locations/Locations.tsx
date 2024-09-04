import { toast, ToastContainer } from 'react-toastify';
import DefaultLayout from '../../layout/DefaultLayout';
import { useGetLocations } from '../../modules/Locations/useLocations';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DetailsPage from './DetailsPage';
import { LocationItem } from './LocationItem';

export const Locations: React.FC = () => {
  const navigate = useNavigate();
  const { loading, items, error, lastItemRef,selectedItem, setSelectedItem,} = useGetLocations();
  

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleClick = (index: number) => {
    const location = items[index];
    setSelectedItem(index);
    if (window.innerWidth < 768) { 
      navigate(`/locations/details/${location.id}`, {
        state: { selectedItem: location },
      });
    }
  };
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
        <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-[calc(100vh-186px)] overflow-hidden  rounded-sm sm:h-[calc(100vh-174px)]">
            {/* left */}
            <div className="h-full border-stroke bg-white xsm:w-full xl:w-2/4 ">
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
            <div className="hidden h-full flex-col border-l border-stroke bg-white p-5 dark:border-strokedark xl:flex xl:w-3/4 ">
              {selectedItem !== null ? (
                <DetailsPage
                  name={items[selectedItem].name}
                  address={items[selectedItem].address}
                  description={items[selectedItem].description}
                  photo={items[selectedItem].photo.path}
                  createdAt={items[selectedItem].createdAt}
                />
              ) : null}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};
