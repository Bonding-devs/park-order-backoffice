import React from 'react';

type Status = {
  status: string;
};

const CustomStatus: React.FC<Status> = ({ status }) => {
  const renderStatus = (status) => {
    switch (status) {
      case 'open':
        return (
          <button className="inline-flex rounded border border-[#EFEFEF] px-2 py-1 text-sm font-medium text-[#212B36] hover:opacity-80 dark:text-white">
            Open
          </button>
        );

      case 'on_hold':
        return (
          <button className="inline-flex rounded bg-[#3CA745] px-2 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            On Hold
          </button>
        );

      case 'in_progress':
        return (
          <button className="inline-flex rounded bg-[#3CA745] px-2 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            In Progress
          </button>
        );

      case 'done':
        return (
          <button className="inline-flex rounded bg-[#3CA745] px-2 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            Done
          </button>
        );

      case 'canceled':
        return (
          <button className="inline-flex rounded bg-[#3CA745] px-2 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            Cancelled
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
