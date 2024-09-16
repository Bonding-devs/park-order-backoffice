import { ToastContainer } from "react-toastify";
import DefaultLayout from "../../layout/DefaultLayout";
import { MembersBody } from "./MembersBody";
import { MembersHeader } from "./MembersHeader";

export const OrganizationMembers: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
        <MembersHeader />
        <MembersBody />
      </DefaultLayout>
    </>
  );
};
