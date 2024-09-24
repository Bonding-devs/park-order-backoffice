import { useState } from 'react';
import { createTeam, deleteTeam, updateTeam } from '../../api/teamsApi';
import { RightSideTeamsOptions, useTeams } from '../../context/TeamsContext';
import { ManageData } from '../../models/data-fetch-result';
import { CreateTeam, Team } from '../../models/team';
import { toast } from 'react-toastify';
import { delay } from '../../utils/delay';

export const useManageTeam = (team?: Team) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { manageData, setMode } = useTeams();

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

  const onCreate = async (data: CreateTeam) => {
    setIsLoading(true);
    try {
      const nTeam = await createTeam(data);
      toast.success('Team created');
      manageData(nTeam, ManageData.CREATE);
      setMode(RightSideTeamsOptions.VIEW);
    } catch (error) {
      setError('Error creating team');
      delay(2000).then(() => setError(null));
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdate = async (data: CreateTeam) => {
    setIsLoading(true);
    try {
      const nTeam = await updateTeam(team.id, data);
      toast.success('Team updated');
      manageData(nTeam, ManageData.EDIT);
      setMode(RightSideTeamsOptions.VIEW);
    } catch (error) {
      setError('Error updating team');
      delay(2000).then(() => setError(null));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onCreate,
    onUpdate,
    onDelete,
    isLoading,
    error,
  };
};
