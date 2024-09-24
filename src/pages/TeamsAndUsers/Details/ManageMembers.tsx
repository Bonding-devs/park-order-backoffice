import { useEffect } from 'react';
import { MembersView } from './MembersView';
import { MembersControl, useTeam } from './TeamContext';
import { MembersEdit } from './MembersEdit';
import { MembersAdd } from './MembersAdd';

export const ManageMembers: React.FC = () => {
  const { team, setMode, mode} = useTeam();

  useEffect(() => {
    setMode(MembersControl.VIEW);
  }, [team]);

  switch (mode) {
    case MembersControl.VIEW:
      return <MembersView />;
    case MembersControl.ADD:
      return <MembersAdd />;
    case MembersControl.EDIT:
      return <MembersEdit />;
    default:
      break;
  }
};
