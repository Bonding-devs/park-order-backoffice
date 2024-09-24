import { useEffect, useState } from 'react';
import {
  PrincipalButton,
  SizeButton,
} from '../../../components/CustomButtons/PrincipalButton';
import { useManageTeamMembers } from '../../../modules/teams/useManageTeamMembers';
import TeamMemberItem from '../TeamMemberItem';
import { MembersControl, useTeam } from './TeamContext';
import { toast } from 'react-toastify';
import ModalConfirmExtended from '../../../components/Common/ModalConfirmExtended';

export const MembersEdit: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { team, setMode } = useTeam();
  const {
    selected,
    onHandleSelect,
    onEditSubmit,
    error,
    isLoading: isLoadingAdd,
  } = useManageTeamMembers(team.id);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = () => {
    setModalOpen(true);
  }

  const onDeactivate = () => {
    setModalOpen(false);
    onEditSubmit();
  };

  const textButton = 'Remove';
  return (
    <>
     <ModalConfirmExtended
        textButton="Remove"
        title="Remove Users"
        color="bg-red"
        description="Are you sure you want to remove the selected users from the team?"
        modalOpen={modalOpen}
        onDeactivate={onDeactivate}
        setModalOpen={setModalOpen}
      />
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="flex-1 font-bold">Edit Members</h2>
          <PrincipalButton
            disabled={isLoadingAdd}
            size={SizeButton.Small}
            onClick={onSubmit}
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
          {team.users.map((member) => {
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
        </div>
      </div>
    </>
  );
};
