import { Column } from 'react-table';
import ManualPaginatedDataTable from '../../components/DataTables/ManualPaginationDataTable';
import { useGetMembers } from '../../modules/OrganizationMembers/useGetMembers';
import ImageWithPlaceholder from '../../common/Image/ImageWithPlaceholder';
import { Loader } from '../../common/LoaderPage/Loader';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const columns: Column<any>[] = [
  {
    Header: 'Photo',
    accessor: 'photo.path',
    Cell: ({ value }) => (
      <ImageWithPlaceholder src={value} size={8} alt="User photo" />
    ),
    disableSortBy: true,
  },
  { Header: 'Name', accessor: 'firstName' },
  { Header: 'Last Name', accessor: 'lastName' },
  {
    Header: 'Role',
    accessor: 'role.name',
  },
];

export const MembersBody: React.FC = () => {
  const { members, loading, error, setError } = useGetMembers();

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <div className="custom-border rounded-sm border shadow-default">
      <div className="flex flex-col h-[calc(100vh-186px)] overflow-scroll rounded-sm bg-white sm:h-[calc(100vh-174px)]">
        <ManualPaginatedDataTable
          columns={columns}
          data={members}
          showActions={false}
        />
        {loading ? (
          <div className="self-center">
            <Loader></Loader>
          </div>
        ) : null}
      </div>
    </div>
  );
};
