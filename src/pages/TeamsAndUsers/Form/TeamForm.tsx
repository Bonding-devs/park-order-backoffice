import { useForm } from 'react-hook-form';
import { PrincipalButton } from '../../../components/CustomButtons/PrincipalButton';
import { CustomInput } from '../../../components/CustomInput/CustomInput';
import { CustomTextarea } from '../../../components/CustomInput/CustomTextarea';
import { CustomLabel } from '../../../components/CustomLabel/CustomLabel';
import { TitleText } from '../../../components/Text/TitleText';
import { CreateTeam, Team } from '../../../models/team';
import { useManageTeam } from '../../../modules/teams/useDeleteTeam';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface TeamFormProps {
  isCreate: boolean;
  team?: Team;
}

export const TeamForm: React.FC<TeamFormProps> = ({ isCreate, team }) => {
  const { onCreate, onUpdate, isLoading, error } = useManageTeam(team);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: !isCreate ? team : {} });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = (data: CreateTeam) => {
    if (isCreate) {
      onCreate(data);
    } else {
      onUpdate(data);
    }
  };

  const title = isCreate ? 'Create Team' : 'Update Team';
  const textButton = isCreate ? 'Create' : 'Update';
  return (
    <>
      <div className="custom-border border-b py-7.5">
        <div className="px-6">
          <TitleText>{title}</TitleText>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col space-y-6 px-6 py-7.5">
          <div>
            <CustomLabel>Name</CustomLabel>
            <CustomInput
              type="text"
              placeholder="Name"
              register={register('name', {
                required: 'Please complete this field to continue.',
              })}
              error={errors.name?.message.toString()}
            />
          </div>

          <div>
            <CustomLabel>Description</CustomLabel>
            <CustomTextarea
              rows={2}
              placeholder="Description"
              register={register('description', {
                required: 'Please complete this field to continue.',
              })}
              error={errors.description?.message.toString()}
            />
          </div>
        </div>
        <div className="custom-border flex border-t px-6 pt-6">
          <PrincipalButton type="submit" disabled={isLoading}>
            {!isLoading ? textButton : `${textButton}ing...`}
          </PrincipalButton>
        </div>
      </form>
    </>
  );
};
