import { useEffect } from 'react';
import { Loader } from '../../common/LoaderPage/Loader';
import { useTeams } from '../../context/TeamsContext';
import { TeamItem } from './TeamItem';
import { toast } from 'react-toastify';
import { Team } from '../../models/team';

export const TeamsList: React.FC = () => {
  const { data, loading, error, externalRef, selectedItem, setSelectedItem } =
    useTeams();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, team: Team) => {
    event.preventDefault();
    setSelectedItem(team);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="my-2">
          {data.map((team, index) => {
            const isSelected = selectedItem?.id === team.id;
            return (
              <TeamItem
                key={team.id}
                team={team}
                index={index}
                isSelected={isSelected}
                handleClick={handleClick}
              />
            );
          })}
        </div>
        {loading && (
          <div className="self-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};
