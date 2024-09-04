import React from 'react';
import { CiLocationOn, CiCalendarDate } from 'react-icons/ci';

interface DetailsPageProps {
  name: string;
  address: string;
  description: string;
  photo: string;
  createdAt: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({
  name,
  address,
  description,
  photo,
  createdAt,
}) => {
  return (
    <div className="dark:bg-gray-800 rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">{name}</h1>

      <div className="mb-4">
        <img
            src={photo?? "https://www.casasnuevasaqui.com/guia/wp-content/uploads/2020/02/modern-spanish-style-house-1.jpg.webp"}
          alt={`${name} photo`}
          className="mb-2 h-48 w-full rounded-md object-cover"
        />
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <div className="mb-4 flex items-center ">
      <CiLocationOn size={22} className="mr-2" />
        <p className="text-gray-600 dark:text-gray-400">{address}</p>
      </div>

      <div className="mb-4 mr-4 flex items-center">
      <CiCalendarDate size={22} className="mr-2" />
        <p className="text-gray-600 dark:text-gray-400">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default DetailsPage;
