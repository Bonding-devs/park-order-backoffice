import moment from 'moment';

// table header

export const columnWorkOrders = [
  {
    Header: 'Photo',
    accessor: 'contractor',
    Cell: ({ row }) => {
      return (
        <div className="flex items-stretch gap-3 p-2.5 xl:p-5">
          <div className="mr-4 ">
            <img
              className="h-12 w-12 rounded-full object-cover"
              alt="Photo Contractor"
            />
          </div>

          <p className="hidden font-medium text-black dark:text-white sm:block"></p>
        </div>
      );
    },
  },

  {
    Header: 'Title',
    accessor: 'Title',
    Cell: ({ row }) => {
      return (
        <div className="flex items-stretch gap-3 p-2.5 xl:p-5">
          <div className="inline-flex  bg-opacity-10 text-sm font-medium text-warning">
            <div className="mr-4 flex-shrink-0"></div>
          </div>
        </div>
      );
    },
  },
  {
    Header: 'Description',
    accessor: 'Description',

    Cell: ({ row }) => {
      return (
        <div className="flex items-stretch gap-3 p-2.5 xl:p-5">
          <p className="hidden font-medium text-black dark:text-white sm:block"></p>
        </div>
      );
    },
  },
  {
    Header: 'Assign to [users/teams]',
    accessor: 'assingto',

    Cell: ({ row }) => {
      return (
        <div className="flex items-stretch gap-3 p-2.5 xl:p-5">
          <p className="hidden font-medium text-black dark:text-white sm:block"></p>
        </div>
      );
    },
  },
  {
    Header: 'Due date',
    accessor: 'Due_date',

    Cell: ({ row }) => {
      return (
        <div className="flex items-stretch gap-3 p-2.5 xl:p-5">
          <p className="hidden font-medium text-black dark:text-white sm:block">
            {row.original.detail}
          </p>
        </div>
      );
    },
  },
  {
    Header: 'Location',
    accessor: 'Location',

    Cell: ({ row }) => {
      return (
        <div className="flex items-stretch gap-3 p-2.5 xl:p-5">
          <p className="hidden font-medium text-black dark:text-white sm:block">
            {row.original.detail}
          </p>
        </div>
      );
    },
  },

  {
    Header: 'Priority',
    accessor: 'Priority',

    Cell: ({ row }) => {
      return (
        <div className="flex items-stretch gap-3 p-2.5 xl:p-5">
          <p className="hidden font-medium text-black dark:text-white sm:block">
            {row.original.detail}
          </p>
        </div>
      );
    },
  },
];
