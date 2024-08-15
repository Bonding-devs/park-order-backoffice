import moment from 'moment';

// table header
export const columnPaymentMethod = [
  {
    Header: 'Card Brand',
    accessor: 'cardBrand',
  },
  {
    Header: 'Card Number',
    accessor: 'cardLastFour',
    Cell: ({ row }) => {
      return (
        <div>
          <strong>{`XXXX-XXXX-XXXX-${row.original.cardLastFour}`}</strong>
        </div>
      );
    },
  },
  {
    Header: 'State',
    accessor: 'isActive',
    Cell: ({ row }) => {
      return (
        <div>
          <strong>{row.original.isActive ? 'Active' : 'No Active'}</strong>
        </div>
      );
    },
  },
  {
    Header: 'Created Date',
    accessor: 'createdAt',
    Cell: ({ row }) => {
      return <>{moment(row.original.createdAt).format('MM-DD-YYYY')}</>;
    },
  },
];
