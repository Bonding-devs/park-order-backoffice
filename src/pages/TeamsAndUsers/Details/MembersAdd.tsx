import { useEffect } from 'react';
import { useMembers } from '../../../context/MembersContext';
import { MembersControl, useTeam } from './TeamContext';
import TeamMemberItem from '../TeamMemberItem';
import { useManageTeamMembers } from '../../../modules/teams/useManageTeamMembers';
import {
  PrincipalButton,
  SizeButton,
} from '../../../components/CustomButtons/PrincipalButton';
import { toast } from 'react-toastify';
import { Loader } from '../../../common/LoaderPage/Loader';

export const MembersAdd: React.FC = () => {
  const { loadData, members, error, isLoading } = useMembers();
  const { team, setMode } = useTeam();
  const {
    selected,
    onHandleSelect,
    onAddSubmit,
    error: errorAdd,
    isLoading: isLoadingAdd,
  } = useManageTeamMembers(team.id);

  useEffect(() => {
    const errorText = error || errorAdd;
    if (errorText) {
      toast.error(errorText);
    }
  }, [error, errorAdd]);

  useEffect(() => {
    loadData();
  }, []);

  const filteredMembers = members.filter(
    (member) => !team.users.some((user) => user.id === member.id)
  );
  const textButton = 'Add';
  return (
    <>
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="flex-1 font-bold">Add Members</h2>
          <PrincipalButton
            disabled={isLoadingAdd}
            size={SizeButton.Small}
            onClick={onAddSubmit}
          >
            {!isLoadingAdd ? textButton : `${textButton}ing...`}
          </PrincipalButton>
          <PrincipalButton
            disabled={isLoadingAdd}
            bgColor="bg-red"
            size={SizeButton.Small}
            onClick={() => setMode(MembersControl.VIEW)}
          >
            Cancel
          </PrincipalButton>
        </div>
        <div
          className={`my-3 flex flex-col ${
            isLoadingAdd && 'pointer-events-none'
          }`}
        >
          {filteredMembers.map((member) => {
            const checked = selected.includes(member.id);
            return (
              <TeamMemberItem
                key={member.id}
                member={member}
                activateCheckbox={true}
                onHandleSelect={onHandleSelect}
                checked={checked}
              />
            );
          })}
          {isLoading && (
            <div className="self-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
