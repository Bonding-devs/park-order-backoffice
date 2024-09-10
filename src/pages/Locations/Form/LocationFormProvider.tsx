import { FormProvider, useForm } from 'react-hook-form';
import { LocationForm } from './LocationForm';
import {
  isCreateOption,
  RightSideOptions,
} from '../../../context/LocationContext';
import { LocationModel } from '../../../models/location-model';

interface LocationFormProviderProps {
  option: RightSideOptions;
  location?: LocationModel;
}

export const LocationFormProvider: React.FC<LocationFormProviderProps> = ({
  option,
  location,
}) => {
  const methods = useForm({
    defaultValues: !isCreateOption(option)
      ? {
          name: location.name,
          address: location.address,
          description: location.description,
          teamInChargeId: location.teamInCharge.id,
        }
      : {},
  });

  return (
    <FormProvider {...methods}>
      <LocationForm uLocation={location} option={option} />
    </FormProvider>
  );
};
