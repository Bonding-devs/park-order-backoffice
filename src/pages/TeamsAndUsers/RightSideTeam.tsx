import { RightSideTeamsOptions, useTeams } from '../../context/TeamsContext';
import { TeamForm } from './Form/TeamForm';
import { TeamDetailsValidator } from './Details/TeamDetails';

export const RightSideTeam: React.FC = () => {
  const { mode, selectedItem } = useTeams();

  switch (mode) {
    case RightSideTeamsOptions.VIEW:
      return <TeamDetailsValidator team={selectedItem} />;
    case RightSideTeamsOptions.CREATE:
      return <TeamForm isCreate={true} />;
    case RightSideTeamsOptions.EDIT:
      return <TeamForm isCreate={false} team={selectedItem} />;
    default:
      break;
  }
};
