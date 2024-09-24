import { useState } from 'react';
import { delay } from '../utils/delay';

type FetchFunction<T> = (id?: string) => Promise<{ data: T[] }>;

export const useGetAllData = <T extends { id?: string }>(
  fetchFunction: FetchFunction<T>,
  type: string,
  id?: string,
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (): Promise<void> => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await fetchFunction(id);
      setData(result.data);
    } catch (error) {
      console.error(`Error Getting ${type}:`, error);
      setError(`Error Getting ${type}`);
      delay(2000).then(() => setError(null));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    getData,
  };
};
