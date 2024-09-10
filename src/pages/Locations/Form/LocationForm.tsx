import { useEffect, useState } from 'react';
import { CustomInput } from '../../../components/CustomInput/CustomInput';
import { CustomTextarea } from '../../../components/CustomInput/CustomTextarea';
import { CustomLabel } from '../../../components/CustomLabel/CustomLabel';
import { UploadImage } from './UploadImage';
import { useFormContext } from 'react-hook-form';
import { PrincipalButton } from '../../../components/CustomButtons/PrincipalButton';
import { ImageDetails } from '../../../models/image-details';
import { SelectTeam } from './SelectTeam';
import { CreateLocation, LocationModel } from '../../../models/location-model';
import { usePostLocations } from '../../../modules/Locations/usePostLocation';
import { toast, ToastContainer } from 'react-toastify';
import { TitleText } from '../../../components/Text/TitleText';
import {
  isCreateOption,
  RightSideOptions,
} from '../../../context/LocationContext';
import ModalConfirmExtended from '../../../components/Common/ModalConfirmExtended';
import { FaExclamationTriangle } from 'react-icons/fa';

interface LocationFormProps {
  option: RightSideOptions;
  uLocation?: LocationModel;
}

let location: CreateLocation;

export const LocationForm: React.FC<LocationFormProps> = ({
  option,
  uLocation,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useFormContext();

  const [uploadedFile, setUploadedFile] = useState<ImageDetails | null>(
    !isCreateOption(option)
      ? {
          name: 'image.jpg',
          ...uLocation.photo,
        }
      : null
  );
  const { postLocation, updateLocationInfo, isLoading, error, setCreateError } =
    usePostLocations();
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = (data) => {
    if (!uploadedFile) {
      setError('file', {
        type: 'manual',
        message: 'An image file is required. Please select an image.',
      });
      return;
    }
    location = {
      name: data.name,
      address: data.address,
      description: data.description,
      teamInChargeId: data.teamInChargeId,
      photoId: uploadedFile.id,
    };
    if (isCreateOption(option)) {
      postLocation(location);
    } else {
      console.log(location);
      console.log('new location');
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setCreateError(null);
    }
  }, [error]);

  const onDeactivate = () => {
    updateLocationInfo(uLocation.id, location);
  };

  const textButton = isCreateOption(option) ? 'Create' : 'Update';
  return (
    <>
      <div className="custom-border border-b py-7.5">
        <div className="px-6">
          <TitleText>
            {isCreateOption(option) ? 'New' : 'Update'} Location{' '}
          </TitleText>
        </div>
      </div>
      <ToastContainer />
      <ModalConfirmExtended
        textButton="Update"
        title="Update Location"
        color="bg-green-700"
        description="Are you sure you want to update the information for this location? Changes cannot be undone."
        modalOpen={modalOpen}
        onDeactivate={onDeactivate}
        setModalOpen={setModalOpen}
        icon={<FaExclamationTriangle color="yellow" size={24} />}
      />
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
              <SelectTeam
                value={
                  isCreateOption(option) ? null : uLocation.teamInCharge.id
                }
              />
            </div>
          </div>
        </div>
        <div className="custom-border flex border-t px-6 pt-6">
          <PrincipalButton type="submit" disabled={isLoading}>
            {!isLoading ? textButton : `${textButton}...`}
          </PrincipalButton>
        </div>
      </form>
    </>
  );
};
