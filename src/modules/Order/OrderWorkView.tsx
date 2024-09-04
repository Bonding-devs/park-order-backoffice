import React, { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import CustomRadioOrder from '../../components/CustomRadioOrder/CustomRadioOrder';
import moment from 'moment';

const WorkOrdersView: React.FC = ({ data, status }: any) => {
  return (
    <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
      <div className="px-4 sm:px-0">
        <h1 className="text-3xl font-semibold  leading-7 text-black dark:text-white">
          {data.title}
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl text-sm leading-6">
          {data.description}
        </p>
      </div>
      <div className="mt-6 border-t border-stroke dark:border-strokedark">
        <div>
          <div className="px-4 py-6  sm:px-0">
            <div>
              <label className="text-gray-900 text-sm font-medium leading-6">
                Status
              </label>
              <div className=" block">
                <CustomRadioOrder
                  status={status}
                  statusSelected={data.status}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="text-gray-900 block text-sm font-medium leading-6 ">
                  Priority
                </label>
                <span className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  {data.priority}
                </span>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="text-gray-900 block text-sm font-medium leading-6">
                  Due Date
                </label>
                <span className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  {data.scheduledDate
                    ? moment(data.scheduledDate).format('DD/MM/YYYY')
                    : ''}
                </span>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="text-gray-900 block text-sm font-medium leading-6">
                  Work Order ID:
                </label>
                <span className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  {data.recurrenceEndDate || ''}
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 text-sm font-medium leading-6">
              Assign to [users/teams]
            </label>
            <div className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {`${data.assignedUser?.firstName || ''} ${
                data.assignedUser?.lastName || ''
              }`}
            </div>
          </div>

          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 text-sm font-medium leading-6">
              Issues
            </label>
            <div className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {data.issue?.name || ''}
            </div>
          </div>
          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 block text-sm font-medium leading-6">
              Location
            </label>
            <div className="text-gray-900 mt-2 text-sm sm:col-span-2 sm:mt-0">
              {data.location?.name || ''}
            </div>
          </div>

          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 block text-sm font-medium leading-6">
              Category
            </label>
            <div className="text-gray-900 mt-2 text-sm sm:col-span-2 sm:mt-0">
              {data.category?.name || ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrdersView;
