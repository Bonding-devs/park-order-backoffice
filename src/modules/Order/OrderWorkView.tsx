import React, { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';

const WorkOrdersView: React.FC = ({}) => {
  /* Location,
    Files,
    Categories,
    Assets,
    Issues. */
  return (
    <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
      <div className="px-4 sm:px-0">
        <h1 className="text-3xl font-semibold  leading-7 text-black dark:text-white">
          title
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl text-sm leading-6">
          Details
        </p>
      </div>
      <div className="border-gray-100 mt-6 border-t">
        <div className="divide-gray-400 divide-y">
          <div className="px-4 py-6 sm:px-0">
            <label className="text-gray-900 block text-sm font-medium leading-6 ">
              Priority
            </label>
            <span className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></span>
          </div>
          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 text-sm font-medium leading-6">
              Status
            </label>
            <span className="text-gray-700 mt-1 block text-sm leading-6 sm:col-span-2 sm:mt-0"></span>
          </div>
          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 block text-sm font-medium leading-6">
              Due Date
            </label>
            <span className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></span>
          </div>
          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 text-sm font-medium leading-6">
              Assign to [users/teams]
            </label>
            <span className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></span>
          </div>

          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 text-sm font-medium leading-6">
              Issues
            </label>
            <span className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></span>
          </div>
          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 block text-sm font-medium leading-6">
              Photo
            </label>
            <div className="text-gray-900 mt-2 text-sm sm:col-span-2 sm:mt-0"></div>
          </div>

          <div className="px-4 py-6  sm:px-0">
            <label className="text-gray-900 block text-sm font-medium leading-6">
              Assets
            </label>
            <div className="text-gray-900 mt-2 text-sm sm:col-span-2 sm:mt-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrdersView;
