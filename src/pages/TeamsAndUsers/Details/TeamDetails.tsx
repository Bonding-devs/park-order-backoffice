import { useEffect, useRef, useState } from 'react';
import { TitleText } from '../../../components/Text/TitleText';
import { Team } from '../../../models/team';
import { ManageMembers } from './ManageMembers';
import React from 'react';
import { TeamProvider } from './TeamContext';
import { IconButton } from '../../../components/CustomButtons/IconButton';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useManageTeam } from '../../../modules/teams/useDeleteTeam';
import ModalConfirmExtended from '../../../components/Common/ModalConfirmExtended';
import { toast } from 'react-toastify';
import tailwindColors from '../../../utils/tailwindColors';
import { RightSideTeamsOptions, useTeams } from '../../../context/TeamsContext';

interface TeamDetailsProps {
  team: Team;
}

export const TeamDetailsValidator: React.FC<TeamDetailsProps> = ({ team }) => {
  if (team === null) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Select a team to view details</p>
      </div>
    );
  }
  return <TeamDetails team={team} />;
};

const TeamDetails: React.FC<TeamDetailsProps> = ({ team }) => {
  const { onDelete, error, isLoading } = useManageTeam(team);
  const { setMode } = useTeams();
  const [modalOpen, setModalOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [team.id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onDeactivate = () => {
    setModalOpen(false);
    onDelete();
  };

  const onEdit = () => {
    setMode(RightSideTeamsOptions.EDIT);
  };
  
  return (
    <>
      <ModalConfirmExtended
        textButton="Remove"
        title="Remove team"
        color="bg-red"
        description="Are you sure you want to remove this team?"
        modalOpen={modalOpen}
        onDeactivate={onDeactivate}
        setModalOpen={setModalOpen}
      />
      <div className="dark:bg-gray-800 bg-white px-6 py-7.5" ref={componentRef}>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <TitleText>{team.name}</TitleText>
            <div className="flex">
              <IconButton
                Icon={FaPencilAlt}
                size={16}
                color={tailwindColors.green}
                onHandleClick={onEdit}
              />
              <IconButton
                Icon={FaTrashAlt}
                size={16}
                color="red"
                onClick={() => setModalOpen(true)}
                disabled={isLoading}
              />
            </div>
          </div>
          <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-6 ">
            {team.description}
          </p>
        </div>
        <div className="custom-border mb-4 border-t h-full" />
        <TeamProvider team={team}>
          <ManageMembers />
        </TeamProvider>
      </div>
    </>
  );
};
