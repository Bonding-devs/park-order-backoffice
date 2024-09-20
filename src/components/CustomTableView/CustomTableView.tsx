import React, { RefObject } from 'react';
import Loader from '../../common/LoaderPage';
import Loading from '../../common/Loading';
import { WorkOrder } from '../../models/workOrder';
import { WorkOrderFilter } from '../../modules/Order/useTabs';
import CustomTableCell from '../CustomTableCell/CustomTableCell';

interface CustomTableViewProps {
  children: React.ReactNode;
  onClickDetailWorkOrder: (id: string) => void;
  data: WorkOrder[];
  loading: boolean;
  onScroll: () => void;
  listInnerRef: RefObject<HTMLDivElement>;
  activeTab: WorkOrderFilter;
  changeTab: (tab: WorkOrderFilter) => void;
  loadingScroll: boolean;
}

const CustomTableView: React.FC<CustomTableViewProps> = ({
  children,
  onClickDetailWorkOrder,
  data,
  loading,
  onScroll,
  listInnerRef,
  activeTab,
  changeTab,
  loadingScroll,
}) => {
  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  return (
    <>
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-200px)]">
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          <div className="hidden h-full flex-col xl:flex xl:w-2/4">
            <div className="sticky items-center border-b border-stroke px-6 py-3 dark:border-strokedark">
              <div className="w-3/3">
                <div className="relative right-0">
                  <ul className="bg-blue-gray-50/60 relative flex list-none flex-wrap rounded-xl">
                    <li
                      className={`flex-auto cursor-pointer border-b-2 pt-2 text-center text-sm font-medium hover:text-primary md:text-base ${activeTab === WorkOrderFilter.All ? activeClasses : inactiveClasses
                        }`}
                      onClick={() => changeTab(WorkOrderFilter.All)}
                    >
                      All
                    </li>

                    <li
                      className={`flex-auto cursor-pointer border-b-2 pt-2 text-center text-sm font-medium hover:text-primary md:text-base ${activeTab === WorkOrderFilter.Done ? activeClasses : inactiveClasses
                        }`}
                      onClick={() => changeTab(WorkOrderFilter.Done)}
                    >
                      Done
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex max-h-full flex-col overflow-auto p-5">
              <form className="sticky mb-7">
                <input
                  type="text"
                  className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                  placeholder="Search..."
                />
              </form>
              <div className="max-h-full space-y-3.5 overflow-auto" onScroll={onScroll} ref={listInnerRef}>
                {loading ? (
                  <Loader />
                ) : !loadingScroll ? (
                  data.map((object, index) => (
                    <CustomTableCell
                      key={object.id}
                      object={object}
                      item={index}
                      onClick={() => onClickDetailWorkOrder(object.id)}
                    />
                  ))
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTableView;
