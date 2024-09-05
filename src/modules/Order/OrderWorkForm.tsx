import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CustomDatePicker, CustomSelect } from '../../components';
import {
  optionPriorityWorkOrders,
  optionStatusWorkOrders,
} from './configuration';
import { Controller } from 'react-hook-form';

const WorkOrdersForm: React.FC = ({
  register,
  handleSubmit,
  onSubmitWorkOrders,
  control,
  errors,
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
          <h2 className="text-title-md2 font-medium text-black dark:text-white">
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
                {...register('title', { required: 'Please Enter a Title' })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.title && (
                <span className="mt-2 text-sm font-bold text-red">
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Type your message"
              {...register('description', {
                required: 'Please Enter a Description',
              })}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.description && (
              <span className="mt-2 text-sm font-bold text-red">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Status
              </label>

              <Controller
                name="status"
                control={control}
                rules={{
                  required: 'Please Select a Status Option',
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <CustomSelect
                    data={optionStatusWorkOrders}
                    name={'status'}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.status}
                  />
                )}
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Priority
              </label>

              <Controller
                name="priority"
                control={control}
                rules={{
                  required: 'Please Select a Priority Option',
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <CustomSelect
                    data={optionPriorityWorkOrders}
                    name={'priority'}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.priority}
                  />
                )}
              />
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Due Date
              </label>
              <CustomDatePicker name={'scheduledDate'} register={register} />
              {errors.scheduledDate && (
                <span className="mt-2 text-sm font-bold text-red">
                  {errors.scheduledDate.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
        <div className="relative w-full">
          <div className="inline-flex justify-end space-x-4">
            <input
              type="submit"
              value="Create"
              className="flex items-center justify-center rounded bg-primary px-8 py-2.5 text-center font-medium text-gray hover:bg-opacity-90"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default WorkOrdersForm;
