import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useOrganizationMember } from '../../context/OrganizationMemberContext';

export const MembersHeader: React.FC = () => {
  const { setInvite } = useOrganizationMember();
  const handleClick = () => {
    setInvite(true);
  };
  return (
    <Breadcrumb
      pageName="Members"
      reDirectionUrl="/organization-members"
      render={() => (
        <>
          <button
            onClick={handleClick}
            className="rounded-md bg-primary px-9 py-3 font-medium text-white hover:bg-opacity-90"
          >
            Invite
          </button>
        </>
      )}
    />
  );
};
