import React, { useState } from 'react';

import CustomPriority from '../CustomPriority/CustomPriority';
import CustomStatus from '../CustomStatus/CustomStatus';
import userEmpty from '../../images/user/user-empty.jpg';

const CustomTableCell: React.FC = ({ object, item, onClick }: any) => {
  return (
    <div
      key={item}
      className="flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark"
      onClick={() => onClick()}
    >
      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
        <img
          src={object.imgSrc || userEmpty}
          alt="profile"
          className="h-full w-full rounded-full object-cover object-center"
        />
      </div>

      <div className="flex-grid flex  w-full">
        <div className="flex-auto ">
          <h5 className="text-sm font-medium text-black dark:text-white">
            {object.title}
          </h5>
          <p className="text-sm">{object.description}</p>

          <CustomStatus status={object.status} />
        </div>
        <div className="flex-auto text-right">
          <h5 className="text-sm font-medium text-black dark:text-white">
            {`# ${item}`}
          </h5>
          <CustomPriority priority={object.priority} />
        </div>
      </div>
    </div>
  );
};

export default CustomTableCell;
