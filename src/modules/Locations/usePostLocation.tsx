import { useState } from 'react';
import { CreateLocation } from '../../models/location-model';
import { createLocation } from '../../api/locationsApi';
import { delay } from '../../utils/delay';
import { useLocations } from '../../context/LocationContext';


export const usePostLocations = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setCreateError] = useState<string | null>(null);
  const { setLoad } = useLocations();

  const postLocation = async (location: CreateLocation): Promise<void> => {
    setIsLoading(true);
    try {
      await createLocation(location);
      setLoad(true);
    } catch (error) {
      setCreateError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    postLocation,
    setCreateError,

  };
};
