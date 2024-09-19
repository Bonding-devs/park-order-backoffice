import { RightSideTeamsOptions, useTeams } from '../../context/TeamsContext';
import { TeamDetailsValidator } from './TeamDetails';

export const RightSideTeam: React.FC = () => {
  const { mode, selectedItem } = useTeams();

  switch (mode) {
    case RightSideTeamsOptions.VIEW:
      return <TeamDetailsValidator team={selectedItem} />;
    default:
      break;
  }
};
