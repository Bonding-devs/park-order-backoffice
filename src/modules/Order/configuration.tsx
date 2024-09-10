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

export const optionStatusWorkOrders = [
  {
    id: 'open',
    name: 'status',
    value: 'open',
    required: false,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        className="mr-2 h-6 w-6"
      >
        <path
          stroke-linecap="round"
          strokeLinejoin="round"
          d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    ),
    text: 'Open',
  },
  {
    id: 'on_hold',
    name: 'status',
    value: 'on_hold',
    required: false,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        className="mr-2 h-6 w-6"
      >
        <path
          stroke-linecap="round"
          strokeLinejoin="round"
          d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
        />
      </svg>
    ),
    text: 'On Hold',
  },
  {
    id: 'in_progress',
    name: 'status',
    value: 'in_progress',
    required: false,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
        stroke-width="2"
        stroke="currentColor"
        className="mr-2 h-6 w-6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          strokeLinejoin="round"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    ),
    text: 'In Progress',
  },
  {
    id: 'done',
    name: 'status',
    value: 'done',
    required: false,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        className="mr-2 h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    ),
    text: 'Done',
  },
];

export const optionPriorityWorkOrders = [
  {
    id: 'none',
    name: 'priority',
    value: 'none',
    required: false,
    text: 'None',
  },
  {
    id: 'low',
    name: 'priority',
    value: 'low',
    required: false,

    text: 'Low',
  },
  {
    id: 'medium',
    name: 'priority',
    value: 'medium',
    required: false,

    text: 'Medium',
  },
  {
    id: 'high',
    name: 'priority',
    value: 'high',
    required: false,
    text: 'High',
  },
];
