import { useEffect, useRef } from 'react';
import { TitleText } from '../../components/Text/TitleText';
import { Team } from '../../models/team';
import TeamMemberItem from './TeamMemberItem';

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
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [team.id]);

  return (
    <div className="dark:bg-gray-800 bg-white px-6 py-7.5" ref={componentRef}>
      <div className="mb-6 ">
        <div className="flex justify-between">
          <TitleText>{team.name}</TitleText>
        </div>
        <p className="text-gray-500 mt-3 max-w-2xl text-sm leading-6 ">
          {team.description}
        </p>
      </div>
      <div className="custom-border border-t" />
      <h2 className="mt-4 font-bold">Members</h2>
      <div className="mx-8 my-3">
        {team.users.map((member) => (
          <TeamMemberItem key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};
