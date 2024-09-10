import React, { useEffect, useRef } from 'react';
import { TitleText } from '../../../components/Text/TitleText';
import { LocationQrCode } from './LocationQrCode';
import {
  RightSideOptions,
  useLocations,
} from '../../../context/LocationContext';
import { LabelValueText } from '../../../components/Text/labelValueText';
import { EditButton } from '../../../components/CustomButtons/EditButton';

interface DetailsPageProps {
  id: string;
  name: string;
  address: string;
  description: string;
  photo: string;
  team: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({
  id,
  name,
  address,
  description,
  photo,
  team,
}) => {
  const { setMode } = useLocations();
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [id]);

  const handleEdit = () => {
    setMode(RightSideOptions.UPDATE);
  };

  return (
    <div className="dark:bg-gray-800 bg-white px-6 py-7.5" ref={componentRef}>
      <div className="mb-6 ">
        <div className="flex justify-between">
          <TitleText>{name}</TitleText>
          <EditButton onHandleClick={handleEdit} />
        </div>
        <p className="text-gray-500 mt-3 max-w-2xl text-sm leading-6 ">
          {description}
        </p>
      </div>

      <div className="custom-border border-t" />
      <div className=" py-6">
        <div className="custom-border mb-4 border-t">
          <img
            src={photo}
            alt={`${name} photo`}
            className="mb-6 h-100 w-full rounded-md object-cover"
          />
          <div className="mb-6 flex space-x-4">
            <LabelValueText label="Address" value={address} />
            <LabelValueText label="Team" value={team} />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <label className="text-gray-900 block text-sm font-medium leading-6 ">
            QR Code
          </label>
          <LocationQrCode id={id} />
        </div>
      </div>
      {/* <div className="flex justify-around">
          <PrincipalButton bgColor="bg-green-700" onClick={handleEdit}>
            Edit
          </PrincipalButton>
          <PrincipalButton bgColor="bg-red">Delete</PrincipalButton>
        </div> */}
    </div>
  );
};

export default DetailsPage;
