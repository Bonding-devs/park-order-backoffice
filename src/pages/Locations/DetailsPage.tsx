import React from 'react';
import { CiLocationOn, CiCalendarDate } from 'react-icons/ci';
import { PrincipalButton } from '../../components/CustomButons/PrincipalButton';
import { TitleText } from '../../components/Text/TitleText';

interface DetailsPageProps {
  name: string;
  address: string;
  description: string;
  photo: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({
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
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        <div className="mb-8 flex items-center ">
          <CiLocationOn size={22} className="mr-2" />
          <p className="text-gray-600 dark:text-gray-400">{address}</p>
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
