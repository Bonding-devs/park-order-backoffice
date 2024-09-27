import React from 'react';

export interface LegendItem {
  color: string;
  label: string;
  borderColor: string;
  textColor: string;
}

interface LegendProps {
  items: LegendItem[];
}

const Legend: React.FC<LegendProps> = ({ items }) => {
  return (
    <div className="flex w-full flex-wrap gap-3 sm:gap-5">
      {items.map((item, index) => (
        <div key={index} className="flex min-w-47.5">
          <span
            className={`mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border ${item.borderColor}`}
          >
            <span
              className={`block h-2.5 w-full max-w-2.5 rounded-full ${item.color}`}
            ></span>
          </span>
          <div className="w-full">
            <p className={`font-semibold ${item.textColor}`}>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Legend;
