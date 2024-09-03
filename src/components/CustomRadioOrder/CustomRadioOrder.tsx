import React from 'react';

type StatusProp = {
  status: any;
  statusSelected: string;
};

const CustomRadioOrder: React.FC = ({ status, statusSelected }: StatusProp) => {
  return (
    <>
      <div className="item-center flex flex-wrap gap-2 ">
        {status.map((item) => (
          <label className="w-36" htmlFor={item.value} key={item.id}>
            <input
              type="radio"
              id={item.id}
              name={item.name}
              value={item.value}
              className="peer hidden"
              required={item.required}
              checked={item.value === statusSelected}
            />
            <div className="text-gray-500 border-gray-200 dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 flex w-full cursor-pointer items-center justify-center rounded-lg border bg-white p-3 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:peer-checked:text-blue-500">
              {item.svg}
              <h2 className="text-gray-700 font-medium">{item.text}</h2>
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default CustomRadioOrder;
