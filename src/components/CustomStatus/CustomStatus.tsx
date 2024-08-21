import React from 'react';

const CustomStatus: React.FC = ({ status }) => {
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return (
          <button className="inline-flex rounded border border-[#3BA2B8] px-2 py-1 text-sm font-medium text-[#3BA2B8] hover:opacity-80">
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
          <button className="inline-flex rounded border border-[#3BA2B8] px-2 py-1 text-sm font-medium text-[#3BA2B8] hover:opacity-80">
            To Do
          </button>
        );
    }
  };

  return <div className="">{renderStatus(status)}</div>;
};

export default CustomStatus;
