import { useState } from 'react';
import { deleteTeam } from '../../api/teamsApi';
import { useTeams } from '../../context/TeamsContext';
import { ManageData } from '../../models/data-fetch-result';
import { Team } from '../../models/team';
import { toast } from 'react-toastify';
import { delay } from '../../utils/delay';

export const useDeleteTeam = (team: Team) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { manageData } = useTeams();

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTeam(team.id);
      toast.success('Team deleted');
      manageData(team, ManageData.DELETE);
    } catch (error) {
      setError('Error deleting team');
      delay(2000).then(() => setError(null));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onDelete,
    isLoading,
    error,
  };
};
