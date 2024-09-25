import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { PrincipalButton } from '../../components/CustomButtons/PrincipalButton';
import { RightSideTeamsOptions, useTeams } from '../../context/TeamsContext';

export const TeamsAndUsersHeader: React.FC = ({}) => {
  const { setMode } = useTeams();

  const handleClick = () => {
    setMode(RightSideTeamsOptions.CREATE);
  };
  return (
    <Breadcrumb
      pageName="Teams"
      reDirectionUrl="/teams"
      render={() => (
        <>
          <PrincipalButton onClick={handleClick}>New Team</PrincipalButton>
        </>
      )}
    />
  );
};
