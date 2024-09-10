import { useFormContext } from 'react-hook-form';
import { CustomOutlineSelect } from '../../../components/CustomInput/CustomOutlineSelect';
import { useEffect, useState } from 'react';
import { TeamWithoutUsers } from '../../../models/team';
import { fetchAllTeams } from '../../../api/teamsApi';
import { toast } from 'react-toastify';

interface SelectTeamProps {
  value?: string;
}

export const SelectTeam: React.FC<SelectTeamProps> = ({ value }) => {
  const [teams, setTeams] = useState<TeamWithoutUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const response = await fetchAllTeams();
      setTeams(response);
      setIsLoading(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (teams.length < 1) {
      fetchTeams();
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleClick = async () => {
    if (error && teams.length < 1) {
      await fetchTeams();
    }
  };

  return (
    <CustomOutlineSelect
      defaultValue=""
      onClick={handleClick}
      register={register('teamInChargeId', {
        required: 'Please select an option to continue.',
      })}
      error={errors.teamInChargeId?.message.toString()}
    >
      <option value="" defaultChecked disabled>
        Select an option
      </option>
      {!isLoading &&
        teams.map((team) => (
          <option key={team.id} value={team.id} selected={team.id === value}>
            {team.name}
          </option>
        ))}
    </CustomOutlineSelect>
  );
};
