import { useState } from 'react';
import { addUsersToTeam, removeUsersFromTeam } from '../../api/teamsApi';
import { delay } from '../../utils/delay';
import {
  MembersControl,
  useTeam,
} from '../../pages/TeamsAndUsers/Details/TeamContext';
import { useTeams } from '../../context/TeamsContext';
import { ManageData } from '../../models/data-fetch-result';
import { toast } from 'react-toastify';

export const useManageTeamMembers = (teamId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setMode } = useTeam();
  const { manageData } = useTeams();
  const [selected, setSelected] = useState<string[]>([]);
  const onHandleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const onAddSubmit = async () => {
    setIsLoading(true);
    try {
      const team = await addUsersToTeam(teamId, selected);
      toast.success('Users added to team');
      manageData(team, ManageData.EDIT);
      setMode(MembersControl.VIEW);
    } catch (error) {
      setError('Error adding users to team');
      delay(2000).then(() => setError(null));
    } finally {
      setIsLoading(false);
    }
  };

  const onEditSubmit = async () => { 
    setIsLoading(true);
    try {
      const team = await removeUsersFromTeam(teamId, selected);
      toast.success('Users removed from team');
      manageData(team, ManageData.EDIT);
      setMode(MembersControl.VIEW);
    } catch (error) {
      setError('Error removing users from team');
      delay(2000).then(() => setError(null));
    } finally {
      setIsLoading(false);
    }
  }

  return { selected, onHandleSelect, onAddSubmit, onEditSubmit, isLoading , error};
};
