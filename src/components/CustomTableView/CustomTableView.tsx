import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import CustomTableCell from '../CustomTableCell/CustomTableCell';
import Loader from '../../common/LoaderPage/index.tsx';
import Loading from '../../common/Loading';

const CustomTableView: React.FC = ({
  children,
  onClickDetailWorkOrder,
  data,
  loading,
  onScroll,
  listInnerRef,
  onFilter,
  loadingScroll,
}: any) => {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  return (
    <>
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          <div className="hidden h-full flex-col xl:flex xl:w-2/4">
            {/* <!-- ====== Chat List Start --> */}
            <div className="sticky  items-center border-b border-stroke px-6 py-3 dark:border-strokedark">
              <div className="w-3/3">
                <div className="relative right-0">
                  <ul className="bg-blue-gray-50/60 relative flex list-none flex-wrap rounded-xl">
                    <li
                      className={`flex-auto cursor-pointer border-b-2 pt-2 text-center text-sm font-medium hover:text-primary md:text-base ${
                        openTab === 1 ? activeClasses : inactiveClasses
                      }`}
                      onClick={() => {
                        onFilter({ filter: 'all' });
                        setOpenTab(1);
                      }}
                    >
                      All
                    </li>

                    <li
                      className={`flex-auto cursor-pointer border-b-2 pt-2 text-center text-sm font-medium hover:text-primary md:text-base ${
                        openTab === 2 ? activeClasses : inactiveClasses
                      }`}
                      onClick={() => {
                        onFilter({
                          params: { status: 'done' },
                          filter: 'done',
                          paginate: { offset: 0, limit: 10 },
                        });
                        setOpenTab(2);
                      }}
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
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z"
                      fill="#637381"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.957 11.958C12.2499 11.6651 12.7247 11.6651 13.0176 11.958L16.2801 15.2205C16.573 15.5133 16.573 15.9882 16.2801 16.2811C15.9872 16.574 15.5124 16.574 15.2195 16.2811L11.957 13.0186C11.6641 12.7257 11.6641 12.2508 11.957 11.958Z"
                      fill="#637381"
                    />
                  </svg>
                </button>
              </form>
              <div
                className=" max-h-full  space-y-3.5 overflow-auto"
                onScroll={onScroll}
                ref={listInnerRef}
              >
                {loading ? (
                  <Loader />
                ) : !loadingScroll ? (
                  data.map((object, item) => {
                    return (
                      <CustomTableCell
                        object={object}
                        item={item}
                        onClick={() => onClickDetailWorkOrder(object.id)}
                      />
                    );
                  })
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
