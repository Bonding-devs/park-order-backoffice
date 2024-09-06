import { useEffect, useRef, useState } from 'react';
import { fetchLocations } from '../../api/locationsApi';
import { LocationModel } from '../../models/location-model';
import { RightSideOptions, useLocations } from '../../context/LocationContext';

const limit = 10;

export const useGetLocations = () => {
  const [items, setItems] = useState<LocationModel[]>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  let offset = 0;
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { load, setLoad,setMode } = useLocations();

  useEffect(() => {
    if (load) {
      setLoad(false);
      defaultValues();
      setMode(RightSideOptions.VIEW);
      loadMoreItems(true);
    }
  }, [load]);

  const defaultValues = () => {
    offset = 0;
    setIsLast(() => false);
    setItems(() => []);
    setError(() => null);
    setSelectedItem(null);
  };
  const loadMoreItems = async (start = false): Promise<void> => {
    if (isLast || loading) return;

    try {
      setLoading(true);
      const newItems = (await fetchLocations({
        offset,
        limit,
      })) as LocationModel[];
      console.log(`offset ${offset}`)
      console.log(newItems)
      offset = offset + 1;
      if (!newItems.length) {
        setIsLast(true);
        return;
      }
      setItems((prevItems) => [...prevItems, ...newItems]);      
      if (selectedItem === null || start) {
        setSelectedItem(0);
      }
    } catch (error) {
      setError('Failed to fetch Locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isFetching = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && isLast && !isFetching) {
          isFetching = true;
          loadMoreItems().finally(() => {
            isFetching = false;
          });
        }
      },
      { threshold: 1.0 }
    );

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [loading, isLast, lastItemRef.current]);

  useEffect(() => {
    const fetchDataAndCheckHeight = async () => {
      await loadMoreItems();
      console.log(
        `${lastItemRef.current} && ${
          lastItemRef.current?.getBoundingClientRect().bottom
        } <= ${window.innerHeight}`
      );
      if (
        lastItemRef.current &&
        lastItemRef.current.getBoundingClientRect().bottom <= window.innerHeight
      ) {
        await loadMoreItems();
      }
    };
    fetchDataAndCheckHeight();
  }, []);

  return {
    items,
    loading,
    error,
    lastItemRef,
    selectedItem,
    setSelectedItem,
  };
};
