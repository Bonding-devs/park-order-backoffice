import React from 'react';

const CustomStatus: React.FC = ({ status }) => {
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return (
          <button className="inline-flex rounded border border-[#EFEFEF] px-2 py-1 text-sm font-medium text-[#212B36] hover:opacity-80 dark:text-white">
            To Do
          </button>
        );

      case 2:
        return (
          <button className="inline-flex rounded bg-[#3CA745] px-2 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            Done
          </button>
        );

      default:
        return (
          <button className="inline-flex rounded border border-[#EFEFEF] px-2 py-1 text-sm font-medium text-[#212B36] hover:opacity-80 dark:text-white">
            To Do
          </button>
        );
    }
  };

  return <div className="">{renderStatus(status)}</div>;
};

export default CustomStatus;
