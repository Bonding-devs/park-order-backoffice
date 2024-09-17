import { Column } from 'react-table';
import ManualPaginatedDataTable from '../../components/DataTables/ManualPaginationDataTable';
import { useGetMembers } from '../../modules/OrganizationMembers/useGetMembers';
import ImageWithPlaceholder from '../../common/Image/ImageWithPlaceholder';
import { Loader } from '../../common/LoaderPage/Loader';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { InviteMemberForm } from './InviteMemberForm';
import { useOrganizationMember } from '../../context/OrganizationMemberContext';

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
  const { invite, setInvite } = useOrganizationMember();
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const handleClick = () => {
    setInvite(false);
  };
  return (
    <div className="custom-border rounded-sm border shadow-default">
      <div className="flex h-[calc(100vh-186px)] w-full rounded-sm bg-white transition-all duration-1000 sm:h-[calc(100vh-174px)]">
        <div
          className={`flex-1 overflow-x-auto ${
            invite
              ? 'w-1/2 transition-all duration-300'
              : 'w-full transition-all duration-300'
          }`}
        >
          <div className="flex min-w-[800px] flex-col">
            <ManualPaginatedDataTable
              columns={columns}
              data={members}
              showActions={false}
              handleClick={handleClick}
            />
            {loading && (
              <div className="self-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div
          className={`custom-border h-full  ${
            invite
              ? 'w-1/2 opacity-100 transition-all duration-300'
              : 'pointer-events-none w-0 opacity-0 transition-all duration-300'
          }  
          border-l transition-all duration-300`}
        >
          <InviteMemberForm />
        </div>
      </div>
    </div>
  );
};
