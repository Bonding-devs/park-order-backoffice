import React, { useState } from 'react';

import CustomPriority from '../CustomPriority/CustomPriority';
import CustomStatus from '../CustomStatus/CustomStatus';
import userEmpty from '../../images/user/user-empty.jpg';

const CustomTableCell: React.FC = ({ object, item, onClick }: any) => {
  return (
    <div
      key={item}
      className="flex cursor-pointer  rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark "
      onClick={() => onClick()}
    >
      <div className="relative mr-3.5 mt-1 h-11 w-full max-w-11 content-start  rounded-full">
        <img
          src={object.imgSrc || userEmpty}
          alt="profile"
          className="h-full w-full rounded-full object-cover object-center"
        />
      </div>

      <div className=" block w-full ">
        <div>
          <div className="">
            <h5 className="text-sm font-medium text-black dark:text-white">
              {object.title}
            </h5>
            <p className="text-sm">{object.description}</p>
          </div>
        </div>
        <div className=" mt-2">
          <div className="flex-auto text-right">
            <CustomStatus status={object.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTableCell;
