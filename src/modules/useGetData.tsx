import { useCallback, useEffect, useRef, useState } from 'react';
import { useNearScreen } from '../hooks/useNearScreen';
import { debounce } from 'throttle-debounce';
import { Params } from '../models/params';
import { DataFetchResult, ManageData } from '../models/data-fetch-result';
import { delay } from '../utils/delay';

type FetchFunction<T> = (params: Params) => Promise<{ data: T[] }>;

export const useGetData = <T extends { id?: string }>(
  fetchFunction: FetchFunction<T>,
  limit: number = 10,
  type: string
): DataFetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [last, setLast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const externalRef = useRef();
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [externalLoad, setExternalLoad] = useState(false);
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  });

  useEffect(() => {
    if (externalLoad) {
      defaultValues();
      loadMoreItems(true);
      setExternalLoad(false);
    }
  }, [externalLoad]);

  const defaultValues = () => {
    setOffset(0);
    setLast(() => false);
    setData(() => []);
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

    setLoading(true);
    try {
      const result = await fetchFunction({ offset, limit });
      setData((prevData) => {
        const newData = result.data.filter(
          (newItem) => !prevData.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prevData, ...newData];
      });
      if (selectedItem === null || start) {
        setSelectedItem(result.data[0]);
      }
      if (result.data.length % limit !== 0) {
        setLast(true);
        return;
      }
    } catch (error) {
      setError(`Failed to fetch ${type}`);
      delay(1000).then(() => setError(null));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreItems();
  }, [offset]);

  const manageData = (element: T, action: ManageData) => {
    switch (action) {
      case ManageData.CREATE:
        setData((prevData) => [element, ...prevData]);
        setSelectedItem(element);
        break;
      case ManageData.DELETE:
        setSelectedItem(null);
        setData((prevData) =>
          prevData.filter((item) => item.id !== element.id)
        );
        break;
      case ManageData.EDIT:
        setData((prevData) =>
          prevData.map((item) => (item.id === element.id ? element : item))
        );
        setSelectedItem(element);
        break;
    }
  };

  return {
    data,
    loading,
    error,
    externalRef,
    selectedItem,
    setSelectedItem,
    setExternalLoad,
    manageData,
  };
};
