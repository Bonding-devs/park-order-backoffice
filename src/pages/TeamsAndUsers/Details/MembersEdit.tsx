import { useTeam } from './TeamContext';

export const MembersEdit: React.FC = () => {
  const { team } = useTeam();
  return (
    <>
       <div className="flex items-center">
        <h2 className="flex-1 font-bold">Edit Members</h2>
       
      </div>
      <div className="mx-3 my-3">
        {/* {team.users.map((member) => (
          <TeamMemberItem key={member.id} member={member} />
        ))} */}
      </div>
    </>
  );
};
