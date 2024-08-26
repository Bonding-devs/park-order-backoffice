import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectGroupThree from '../../components/Forms/SelectGroup/SelectGroupThree';
import SelectOptionTwo from '../../components/Forms/SelectOption/SelectOptionTwo';
import SelectOptionThree from '../../components/Forms/SelectOption/SelectOptionThree';
import SelectOptionOne from '../../components/Forms/SelectOption/SelectOptionOne';

const WorkOrdersForm: React.FC = ({ onSubmit }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <>
      <div className="sticky flex items-center justify-between border-b border-stroke px-6 py-3 dark:border-strokedark">
        <div className="flex items-center">
          <h2 className="font-medium text-black dark:text-white">
            New Order Work
          </h2>
        </div>
      </div>
      <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
        <form action="#">
          <div>
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full ">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={2}
                placeholder="Type your message"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Status
                </label>
                <input
                  type="email"
                  placeholder="yourmail@gmail.com"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Priority
                </label>
                <input
                  type="text"
                  placeholder="(321) 5555-0115"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Due Date
                </label>
                <input
                  type="email"
                  placeholder="yourmail@gmail.com"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Work ID
                </label>
                <input
                  type="text"
                  placeholder="(321) 5555-0115"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <SelectOptionOne />
          </div>
        </form>
      </div>
      <div className="sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
        <div className="relative w-full">
          <div className="inline-flex justify-end space-x-4">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="flex items-center justify-center rounded bg-primary px-8 py-2.5 text-center font-medium text-gray hover:bg-opacity-90"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOrdersForm;
