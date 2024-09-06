import { useState } from 'react';
import { CreateLocation } from '../../models/location-model';
import { createLocation, putLocation } from '../../api/locationsApi';
import { delay } from '../../utils/delay';
import { useLocations } from '../../context/LocationContext';
import { useFormContext } from 'react-hook-form';


export const usePostLocations = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setCreateError] = useState<string | null>(null);
  const { setLoad } = useLocations();
  const {reset} = useFormContext();

  const postLocation = async (location: CreateLocation): Promise<void> => {
    setIsLoading(true);
    try {
      await createLocation(location);
      setLoad(true);
      reset();
    } catch (error) {
      setCreateError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocation = async (locationId: string,location: CreateLocation): Promise<void> => {
    setIsLoading(true);
    try {
      await putLocation(locationId,location);
      setLoad(true);
      reset();
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
    updateLocation,
  };
};
