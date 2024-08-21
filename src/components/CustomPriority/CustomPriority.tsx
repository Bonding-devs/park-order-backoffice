import React from 'react';

const CustomPriority: React.FC = ({ priority }) => {
  const renderPriority = (priority) => {
    switch (priority) {
      case 1:
        return (
          <button className="inline-flex rounded-full bg-[#EFEFEF] px-3 py-1 text-sm font-medium text-[#212B36] hover:bg-opacity-90">
            None
          </button>
        );

      case 2:
        return (
          <button className="inline-flex rounded-full bg-[#3CA745] px-3 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            Low
          </button>
        );

      case 3:
        return (
          <button className="inline-flex rounded-full bg-[#F9C107] px-3 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            Medium
          </button>
        );

      case 4:
        return (
          <button className="inline-flex rounded-full bg-[#DC3545] px-3 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            High
          </button>
        );

      default:
        return (
          <button className="inline-flex rounded-full bg-[#EFEFEF] px-3 py-1 text-sm font-medium text-[#212B36] hover:bg-opacity-90">
            None
          </button>
        );
    }
  };

  return <div className="">{renderPriority(priority)}</div>;
};

export default CustomPriority;
