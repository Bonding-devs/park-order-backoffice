import { useCreateOrganizationMember } from '../../modules/OrganizationMembers/useCreateOrganizationMember';
import { TitleText } from '../../components/Text/TitleText';
import { CustomLabel } from '../../components/CustomLabel/CustomLabel';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { PrincipalButton } from '../../components/CustomButtons/PrincipalButton';
import { useEffect } from 'react';
import { emailPattern } from '../../utils/paterns';
import { toast } from 'react-toastify';

export const InviteMemberForm: React.FC = () => {
  const {
    error,
    loading,
    registerMember,
    setError,
    register,
    errors,
    handleSubmit,
  } = useCreateOrganizationMember();

  const onSubmit = (data) => {
    registerMember(data);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.toString());
      setError(null);
    }
  }, [error]);

  const textButton = 'Create';

  return (
    <>
      <div className="custom-border border-b py-7.5">
        <div className="px-6">
          <TitleText>Invite new member</TitleText>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col space-y-6 px-6 py-7.5">
          <div>
            <CustomLabel>Email</CustomLabel>
            <CustomInput
              type="text"
              placeholder="Email"
              register={register('email', {
                required: 'Please complete this field to continue.',
                pattern: {
                  value: emailPattern,
                  message: 'Please enter a valid email address.',
                },
              })}
              error={errors.email?.message.toString()}
            />
          </div>

          <div>
            <CustomLabel>First Name</CustomLabel>
            <CustomInput
              type="text"
              placeholder="First Name"
              register={register('firstName', {
                required: 'Please complete this field to continue.',
              })}
              error={errors.firstName?.message.toString()}
            />
          </div>

          <div>
            <CustomLabel>Last Name</CustomLabel>
            <CustomInput
              type="text"
              placeholder="Last Name"
              register={register('lastName', {
                required: 'Please complete this field to continue.',
              })}
              error={errors.lastName?.message.toString()}
            />
          </div>
        </div>
        <div className="custom-border flex border-t px-6 pt-6">
          <PrincipalButton type="submit" disabled={loading}>
            {!loading ? textButton : `${textButton}...`}
          </PrincipalButton>
        </div>
      </form>
    </>
  );
};
