import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../../layout/DefaultLayout';
import { MembersBody } from './MembersBody';
import { MembersHeader } from './MembersHeader';
import { OrganizationMemberProvider } from '../../context/OrganizationMemberContext';

export const OrganizationMembers: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
        <OrganizationMemberProvider>
          <MembersHeader />
          <MembersBody />
        </OrganizationMemberProvider>
      </DefaultLayout>
    </>
  );
};
