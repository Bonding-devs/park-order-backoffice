import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";



export const MembersHeader: React.FC = () => {

    return (<Breadcrumb
        pageName="Members"
        reDirectionUrl="/organization-members"
        render={() => (
          <>
          </>
        )}
      />);
}