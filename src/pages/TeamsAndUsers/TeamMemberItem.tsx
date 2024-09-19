// TeamMember.tsx
import React from 'react';
import { BasicUser } from '../../models/user';
import ImageWithPlaceholder from '../../common/Image/ImageWithPlaceholder';

interface TeamMemberProps {
  member: BasicUser;
}

const TeamMemberItem: React.FC<TeamMemberProps> = ({ member }) => {
  const name = `${member.firstName} ${member.lastName}`;
  return (
    <li className="mb-2 flex items-center space-x-4">
      <ImageWithPlaceholder src={member.photo?.path} alt="photo" size={8} />
      <p className="text-sm font-medium">{name} </p>
      <p>&middot;</p>
      <p className="text-gray-500 text-xs">{'role'}</p>
    </li>
  );
};

export default TeamMemberItem;
