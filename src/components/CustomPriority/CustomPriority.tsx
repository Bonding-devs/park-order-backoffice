import React from 'react';

type Priority = {
  priority: string;
};

const CustomPriority: React.FC<Priority> = ({ priority }) => {
  const renderPriority = (priority) => {
    switch (priority) {
      case 'none':
        return (
          <button className="inline-flex rounded-full bg-[#EFEFEF] px-3 py-1 text-sm font-medium text-[#212B36] hover:bg-opacity-90">
            None
          </button>
        );

      case 'low':
        return (
          <button className="inline-flex rounded-full bg-[#3CA745] px-3 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            Low
          </button>
        );

      case 'medium':
        return (
          <button className="inline-flex rounded-full bg-[#F9C107] px-3 py-1 text-sm font-medium text-white hover:bg-opacity-90">
            Medium
          </button>
        );

      case 'high':
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
