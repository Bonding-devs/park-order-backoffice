import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CustomDatePicker, CustomSelect } from '../../components';
import {
  optionPriorityWorkOrders,
  optionStatusWorkOrders,
} from './configuration';

const WorkOrdersForm: React.FC = ({
  register,
  handleSubmit,
  onSubmitWorkOrders,
}) => {
  const handleSubmitData = async (data) => {
    onSubmitWorkOrders(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className="no-scrollbar max-h-full space-y-3.5 overflow-auto "
    >
      <div className="sticky flex items-center justify-between border-b border-stroke px-6 py-3 dark:border-strokedark">
        <div className="flex items-center pb-1">
          <h2 className="pt-2  text-title-md2 font-medium text-black dark:text-white">
            New Order Work
          </h2>
        </div>
      </div>
      <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
        <div>
          <div className="mb-5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full ">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Title
              </label>

              <input
                type="text"
                {...register('title', { required: true })}
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
              {...register('description', { required: true })}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Status
              </label>
              <CustomSelect
                data={optionStatusWorkOrders}
                name={'status'}
                register={register}
                required={false}
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Priority
              </label>

              <CustomSelect
                data={optionPriorityWorkOrders}
                name={'priority'}
                register={register}
                required={false}
              />
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Due Date
              </label>
              <CustomDatePicker name={'scheduledDate'} register={register} />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Work ID
              </label>
              <input
                type="text"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
        <div className="relative w-full">
          <div className="inline-flex justify-end space-x-4">
            <input
              type="submit"
              className="flex items-center justify-center rounded bg-primary px-8 py-2.5 text-center font-medium text-gray hover:bg-opacity-90"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default WorkOrdersForm;
