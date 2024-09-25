import { FaPencilAlt } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IconButton } from '../../../components/CustomButtons/IconButton';
import tailwindColors from '../../../utils/tailwindColors';
import TeamMemberItem from './TeamMemberItem';
import { MembersControl, useTeam } from './TeamContext';

interface MembersViewProps {}

export const MembersView: React.FC<MembersViewProps> = ({}) => {
  const { team, setMode } = useTeam();
  return (
    <>
      <div className="flex items-center">
        <h2 className="flex-1 font-bold">Members</h2>
        <IconButton
          Icon={IoIosAddCircleOutline}
          size={24}
          color={tailwindColors.blue}
          onHandleClick={() => setMode(MembersControl.ADD)}
        />
        <IconButton
          Icon={FaPencilAlt}
          size={16}
          color={tailwindColors.green}
          onHandleClick={() => setMode(MembersControl.EDIT)}
        />
      </div>
      {team.users.length === 0 && (
        <p className="text-gray-500 text-center mt-15">
          No members found. You can add new members using the '+' button above.
        </p>
      )}
      <div className="mx-10 my-3 space-y-2">
        {team.users.map((member) => (
          <TeamMemberItem key={member.id} member={member} />
        ))}
      </div>
    </>
  );
};
