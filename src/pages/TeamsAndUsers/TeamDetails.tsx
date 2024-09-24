import { useEffect, useRef, useState } from 'react';
import { TitleText } from '../../components/Text/TitleText';
import { Team } from '../../models/team';
import { ManageMembers } from './Details/ManageMembers';
import React from 'react';
import { TeamProvider } from './Details/TeamContext';
import { IconButton } from '../../components/CustomButtons/IconButton';
import { FaTrashAlt } from 'react-icons/fa';
import { useDeleteTeam } from '../../modules/teams/useDeleteTeam';
import ModalConfirmExtended from '../../components/Common/ModalConfirmExtended';
import { toast } from 'react-toastify';

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
  const { onDelete, error, isLoading } = useDeleteTeam(team);
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
          <div className="flex justify-between items-center">
            <TitleText>{team.name}</TitleText>
            <IconButton
              Icon={FaTrashAlt}
              size={16}
              color="red"
              onClick={() => setModalOpen(true)}
              disabled={isLoading}
            />
          </div>
          <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-6 ">
            {team.description}
          </p>
        </div>
        <div className="custom-border mb-4 border-t" />
        <TeamProvider team={team}>
          <ManageMembers />
        </TeamProvider>
      </div>
    </>
  );
};
