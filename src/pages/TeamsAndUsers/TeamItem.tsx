import { InitialName } from '../../common/InitialName';
import { Team } from '../../models/team';
import { getColorByIndex } from '../../utils/randomColor';

interface TeamItemProps {
  team: Team;
  handleClick?: (event: React.MouseEvent<HTMLDivElement>, team: Team) => void;
  isSelected?: boolean;
  index: number;
}

export const TeamItem: React.FC<TeamItemProps> = ({
  team,
  handleClick,
  isSelected = false,
  index,
}) => {
  const initial = team.name.charAt(0);
  return (
    <div
      className="relative flex cursor-pointer items-center px-2  py-2 hover:bg-gray-2 dark:hover:bg-strokedark"
      onClick={(e) => handleClick(e, team)}
    >
      {isSelected && (
        <div className="absolute top-0 h-full w-1 bg-strokedark"></div>
      )}

      <div className="ml-2">
        <InitialName
          initial={initial}
          color={getColorByIndex(index)}
          textColor="text-white"
        />
      </div>

      <h5 className="ml-3 text-sm font-medium text-black dark:text-white">
        {team.name}
      </h5>
    </div>
  );
};
