import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchLocations } from '../../api/locationsApi';
import { LocationModel } from '../../models/location-model';
import { RightSideOptions, useLocations } from '../../context/LocationContext';
import { useNearScreen } from '../../hooks/useNearScreen';
import { debounce } from 'throttle-debounce';

const limit = 10;

export const useGetLocations = () => {
  const [items, setItems] = useState<LocationModel[]>([]);
  const [last, setLast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const externalRef = useRef();
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { load, setLoad, setMode } = useLocations();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  });

  useEffect(() => {
    if (load) {
      setLoad(false);
      defaultValues();
      setMode(RightSideOptions.VIEW);
      loadMoreItems(true);
    }
  }, [load]);

  const defaultValues = () => {
    setOffset(0);
    setLast(() => false);
    setItems(() => []);
    setError(() => null);
    setSelectedItem(null);
  };

  const handleNextPage = () => setOffset(offset + 1);

  const debounceHandleNextPage = useCallback(
    debounce(1000, handleNextPage, { atBegin: false }),
    []
  );

  useEffect(() => {
    if (isNearScreen) debounceHandleNextPage();
  }, [debounceHandleNextPage, isNearScreen]);

  const loadMoreItems = async (start = false): Promise<void> => {
    if (last || loading) return;

    try {
      setLoading(true);
      const newItems = (await fetchLocations({
        offset: offset * limit,
        limit,
      })) as LocationModel[];

      console.log(`${offset} offset, ${newItems.length} newItems.length`);
      setItems((prevItems) => [...prevItems, ...newItems]);

      if (newItems.length % limit !== 0) {
        setLast(true);
        return;
      }
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
    loadMoreItems();
  }, [offset]);

  return {
    items,
    loading,
    error,
    externalRef,
    selectedItem,
    setSelectedItem,
  };
};
