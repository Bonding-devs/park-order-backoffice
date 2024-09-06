import React from 'react';
import { CiLocationOn, CiCalendarDate } from 'react-icons/ci';
import { PrincipalButton } from '../../components/CustomButons/PrincipalButton';
import { TitleText } from '../../components/Text/TitleText';
import { LocationQrCode } from './View/LocationQrCode';

interface DetailsPageProps {
  id: string;
  name: string;
  address: string;
  description: string;
  photo: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({
  id,
  name,
  address,
  description,
  photo,
}) => {
  return (
    <div className="dark:bg-gray-800 bg-white py-7.5">
      <div className="mb-6 px-6 ">
        <TitleText>{name}</TitleText>
      </div>
      <div className="custom-border border-t" />
      <div className="px-4 py-6">
        <div className="custom-border mb-4 border-t">
          <img
            src={photo}
            alt={`${name} photo`}
            className="mb-6 h-100 w-full rounded-md object-cover"
          />
          <div className="flex flex-1 items-center">
            <div>
              <CiLocationOn size={22} className="mr-2" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 break-all">
              {address}
            </p>
          </div>
        </div>

        <div className="mb-8 flex justify-between">
          <div className="flex flex-1 items-center">
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          <div className="flex flex-1  justify-center">
            <LocationQrCode id={id} />
          </div>
        </div>
        <div className="flex justify-around">
          <PrincipalButton bgColor="bg-green-700">Edit</PrincipalButton>
          <PrincipalButton bgColor="bg-red">Delete</PrincipalButton>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
