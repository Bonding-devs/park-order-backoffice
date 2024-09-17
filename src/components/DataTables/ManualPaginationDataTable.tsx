import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Column, usePagination, useSortBy, useTable } from 'react-table';

export interface TableAction {
  name: string;
  redirectTo: string;
}

interface DataTableProps {
  columns: readonly Column<any>[];
  data: any[];
  tableActions?: TableAction[];
  pageSize?: number;
  handleClick?(row: any): void;
  onPageChange?: (newPageIndex: number) => void;
  hasNextPage?: boolean;
  manualPagination?: boolean;
  pageNumber?: number;
  showActions?: boolean;
}

const ManualPaginatedDataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  tableActions,
  handleClick,
  onPageChange,
  hasNextPage = true,
  manualPagination = false,
  pageNumber = 0,
  showActions = true,
}) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: pageNumber,
      },
      manualPagination: manualPagination,
      pageCount: -1,
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
  } = tableInstance;

  const { pageIndex } = state;

  const handlePreviousPage = () => {
    if (canPreviousPage && pageIndex + 1 !== 0) {
      previousPage();
      onPageChange && onPageChange(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (canNextPage && hasNextPage) {
      nextPage();
      onPageChange && onPageChange(pageIndex + 1);
    }
  };
  return (
    <section className="data-table-common py-4">
      {tableActions && (
        <div className="flex justify-end px-8 pb-4">
          {tableActions.map((action, key) => (
            <Link
              key={key}
              to={action.redirectTo}
              className="font-medium text-primary"
            >
              {action.name}
            </Link>
          ))}
        </div>
      )}
      <table
        {...getTableProps()}
        className="datatable-table datatable-one w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8"
      >
        <thead className="border-separate px-4">
          {headerGroups.map((headerGroup, key) => (
            <tr
              className="custom-border border-t"
              {...headerGroup.getHeaderGroupProps()}
              key={key}
            >
              {headerGroup.headers.map((column, key) => {
                return (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={key}
                  >
                    <div className="flex items-center">
                      <span> {column.render('Header')}</span>

                      {!column.disableSortBy && (
                        <div className="ml-2 inline-flex flex-col space-y-[2px]">
                          <span className="inline-block">
                            <FaChevronUp size={10} />
                          </span>
                          <span className="inline-block">
                            <FaChevronDown size={10} />
                          </span>
                        </div>
                      )}
                    </div>

                    {column.canFilter ? column.render('Filter') : null}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={key}
                onClick={() => {
                  handleClick && handleClick(row.original);
                }}              
              >
                {row.cells.map((cell, key) => (
                  <td {...cell.getCellProps()} key={key} className='truncate pb-0 '>
                    <div className="p-0 text-gray-700 font-serif text-sm font-normal ">
                      {cell.render('Cell')}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showActions && (
        <div className="flex justify-between border-t border-stroke px-6 pt-5 dark:border-strokedark">
          <div className="flex">
            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={handlePreviousPage}
              disabled={!canPreviousPage || pageNumber === 0}
            >
              <FaChevronLeft />
            </button>

            {pageOptions.map((_page, index) => (
              <button
                key={index}
                onClick={() => {
                  gotoPage(index);
                }}
                className={`${
                  pageIndex === index && 'bg-primary text-white'
                } mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={handleNextPage}
              disabled={!canNextPage || !hasNextPage}
            >
              <FaChevronRight />
            </button>
          </div>
          <p className="font-medium">Showing page {pageIndex + 1}</p>
        </div>
      )}
    </section>
  );
};

export default ManualPaginatedDataTable;
