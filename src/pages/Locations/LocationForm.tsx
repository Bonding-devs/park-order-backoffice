import { useEffect, useState } from 'react';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { CustomTextarea } from '../../components/CustomInput/CustomTextarea';
import { CustomLabel } from '../../components/CustomLabel/CustomLabel';
import { UploadImage } from './UploadImage';
import { CustomOutlineSelect } from '../../components/CustomInput/CustomOutlineSelect';
import { useForm, useFormContext } from 'react-hook-form';
import { PrincipalButton } from '../../components/CustomButons/PrincipalButton';
import { ImageDetails } from '../../models/image-details';
import { SelectTeam } from './SelectTeam';
import { CreateLocation } from '../../models/location-model';
import { usePostLocations } from '../../modules/Locations/usePostLocation';
import { toast, ToastContainer } from 'react-toastify';
import { useLocations } from '../../context/LocationContext';

export const LocationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useFormContext();
  const [uploadedFile, setUploadedFile] = useState<ImageDetails | null>(null);
  const { postLocation, isLoading, error,setCreateError } = usePostLocations();
  

  const onSubmit = (data) => {
    if (!uploadedFile) {
      setError('file', {
        type: 'manual',
        message: 'An image file is required. Please select an image.',
      });
      return;
    }
    const location: CreateLocation = {
      name: data.name,
      address: data.address,
      description: data.description,
      teamInChargeId: data.teamInChargeId,
      photoId: uploadedFile.id,
    };
    postLocation(location);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setCreateError(null);
    }
  }, [error]);

  return (
    <>
      
      <div className="border-b border-stroke px-6 py-3 dark:border-strokedark">
        <h2 className="pt-2  text-title-md2 font-medium text-black dark:text-white">
          New Location
        </h2>
      </div>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col space-y-6 px-6 py-7.5">
          <div>
            <CustomLabel>Name</CustomLabel>
            <CustomInput
              type="text"
              placeholder="Name"
              register={register('name', {
                required: 'Please complete this field to continue.',
              })}
              error={errors.name?.message.toString()}
            />
          </div>

          <div>
            <CustomLabel>Address</CustomLabel>
            <CustomInput
              type="text"
              placeholder="Address"
              register={register('address', {
                required: 'Please complete this field to continue.',
              })}
              error={errors.address?.message.toString()}
            />
          </div>

          <div>
            <CustomLabel>Description</CustomLabel>
            <CustomTextarea
              rows={2}
              placeholder="Description"
              register={register('description', {
                required: 'Please complete this field to continue.',
              })}
              error={errors.description?.message.toString()}
            />
          </div>
          <div className=" flex flex-col md:flex-row">
            <div className=" mx-auto mb-5 flex max-w-sm flex-1 flex-col items-start space-y-2.5 md:mb-0">
              <CustomLabel>Image</CustomLabel>
              <UploadImage
                setUploadedFile={setUploadedFile}
                uploadedFile={uploadedFile}
              />
            </div>
            <div className="mx-auto max-w-sm flex-1">
              <CustomLabel>Team</CustomLabel>
              <SelectTeam />
            </div>
          </div>
          <div className="pt-6">
            <PrincipalButton type="submit" disabled={isLoading}>
              {!isLoading ? 'Create' : 'Create...'}
            </PrincipalButton>
          </div>
        </div>
      </form>
    </>
  );
};
