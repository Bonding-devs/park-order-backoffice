// TeamMember.tsx
import React from 'react';
import ImageWithPlaceholder from '../../common/Image/ImageWithPlaceholder';
import { OrganizationMember } from '../../models/organization-member';
import { CustomCheckbox } from '../../components/CustomInput/CustomCheckbox';

interface TeamMemberProps {
  member: OrganizationMember;
  activateCheckbox?: boolean;
  onHandleSelect?: (id: string) => void;
  checked?: boolean;
}

const TeamMemberItem: React.FC<TeamMemberProps> = ({
  member,
  activateCheckbox = false,
  onHandleSelect,
  checked,
}) => {
  const name = `${member.firstName} ${member.lastName}`;
  return (
    <label
      className={`custom-border flex flex-1 items-center space-x-4 border-b p-2 ${
        checked && 'bg-gray'
      }`}
      htmlFor={member.id}
    >
      {activateCheckbox && (
        <CustomCheckbox
          id={member.id}
          checked={checked}
          onChange={() => onHandleSelect(member.id)}
        />
      )}
      <ImageWithPlaceholder src={member.photo?.path} alt="photo" size={8} />
      <p className="flex-1 text-sm font-medium">{name} </p>
      <p className="text-gray-500 text-xs">
        {member.role?.name ?? 'undefined'}
      </p>
    </label>
  );
};

export default TeamMemberItem;
