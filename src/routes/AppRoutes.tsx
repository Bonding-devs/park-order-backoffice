import { Navigate, Route, Routes } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import ComingSoon from '../pages/Authentication/ComingSoon';
import ResetPassword from '../pages/Authentication/ResetPassword';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import TwoStepVerification from '../pages/Authentication/TwoStepVerification';
import UnderMaintenance from '../pages/Authentication/UnderMaintenance';
import Calendar from '../pages/Calendar';
import AdvancedChart from '../pages/Chart/AdvancedChart';
import BasicChart from '../pages/Chart/BasicChart';
import Analytics from '../pages/Dashboard/Analytics';
import CRM from '../pages/Dashboard/CRM';
import Marketing from '../pages/Dashboard/Marketing';
import Stocks from '../pages/Dashboard/Stocks';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';
import ProFormElements from '../pages/Form/ProFormElements';
import ProFormLayout from '../pages/Form/ProFormLayout';
import Inbox from '../pages/Inbox';
import Invoice from '../pages/Invoice';

import Messages from '../pages/Messages';
import DataTables from '../pages/Pages/DataTables';
import {
  default as AccessDenied,
  default as ErrorPage,
} from '../pages/Pages/ErrorPage';
import Faq from '../pages/Pages/Faq';
import FileManager from '../pages/Pages/FileManager';
import MailSuccess from '../pages/Pages/MailSuccess';
import PricingTables from '../pages/Pages/PricingTables';
import Settings from '../pages/Pages/Settings';
import Teams from '../pages/Pages/Teams';
import TermsConditionsPage from '../pages/Pages/TermsConditions';
import Profile from '../pages/Profile';
import ProTables from '../pages/Tables/ProTables';
import Tables from '../pages/Tables/Tables';
import TaskKanban from '../pages/Task/TaskKanban';
import TaskList from '../pages/Task/TaskList';
import Accordion from '../pages/UiElements/Accordion';
import Alerts from '../pages/UiElements/Alerts';
import Avatars from '../pages/UiElements/Avatars';
import Badge from '../pages/UiElements/Badge';
import Breadcrumbs from '../pages/UiElements/Breadcrumbs';
import Buttons from '../pages/UiElements/Buttons';
import ButtonsGroup from '../pages/UiElements/ButtonsGroup';
import Cards from '../pages/UiElements/Cards';
import Carousel from '../pages/UiElements/Carousel';

import Dropdowns from '../pages/UiElements/Dropdowns';
import Images from '../pages/UiElements/Images';
import List from '../pages/UiElements/List';
import Modals from '../pages/UiElements/Modals';
import Notifications from '../pages/UiElements/Notifications';
import Pagination from '../pages/UiElements/Pagination';

import Popovers from '../pages/UiElements/Popovers';
import Progress from '../pages/UiElements/Progress';
import Spinners from '../pages/UiElements/Spinners';
import Tabs from '../pages/UiElements/Tabs';

import Tooltips from '../pages/UiElements/Tooltips';
import Videos from '../pages/UiElements/Videos';

import WorkOrderPage from '../pages/Order/WorkOrder';

import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
import { Locations } from '../pages/Locations/Locations';
import DetailsNavigatorPage from '../pages/Locations/View/DetailsNavigatorPage';
import { OrganizationMembers } from '../pages/OrganizationMembers/OrganizationMembers';

const AppRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="/auth/signin" replace />} />
    <Route
      path="/auth/signin"
      element={
        <>
          <PageTitle title="Signin" />
          <SignIn />
        </>
      }
    />
    <Route
      path="/auth/signup"
      element={
        <>
          <PageTitle title="Signup" />
          <SignUp />
        </>
      }
    />
    <Route
      path="/auth/reset-password"
      element={
        <>
          <PageTitle title="Reset Password" />
          <ResetPassword />
        </>
      }
    />
    <Route
      path="/auth/coming-soon"
      element={
        <>
          <PageTitle title="Coming Soon" />
          <ComingSoon />
        </>
      }
    />
    <Route
      path="/auth/two-step-verification"
      element={
        <>
          <PageTitle title="2 Step Verification" />
          <TwoStepVerification />
        </>
      }
    />

    <Route element={<ProtectedRoute />}>
      <Route path="/work-orders" element={<WorkOrderPage />} />
      <Route
        path="/dashboard"
        element={<Navigate to="/dashboard/analytics" replace />}
      />
      <Route
        path="/dashboard/analytics"
        element={
          <>
            <PageTitle title="Analytics Dashboard" />
            <Analytics />
          </>
        }
      />
      <Route
        element={<RoleProtectedRoute allowedRoles={['organization_admin']} />}
      >
        <Route path="/locations" element={<Locations />} />
        <Route
          path="/locations/details/:id"
          element={
            <>
              <PageTitle title="Locations" />
              <DetailsNavigatorPage />
            </>
          }
        />
        <Route
          path="/organization-members"
          element={
            <>
              <PageTitle title="Members" />
              <OrganizationMembers />
            </>
          }
        />
      </Route>
      <Route element={<RoleProtectedRoute allowedRoles={['admin', 'owner']} />}>
        <Route
          path="/dashboard/marketing"
          element={
            <>
              <PageTitle title="Marketing Dashboard" />
              <Marketing />
            </>
          }
        />
        <Route
          path="/dashboard/crm"
          element={
            <>
              <PageTitle title="CRM Dashboard" />
              <CRM />
            </>
          }
        />
      </Route>
      <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
        <Route
          path="/dashboard/stocks"
          element={
            <>
              <PageTitle title="Stocks Dashboard" />
              <Stocks />
            </>
          }
        />
      </Route>

      <Route element={<RoleProtectedRoute allowedRoles={['owner']} />}>
        <Route path="/calendar" element={<Calendar />} />
      </Route>

      <Route
        path="/profile"
        element={
          <>
            <PageTitle title="Profile" />
            <Profile />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <PageTitle title="Profile" />
            <Profile />
          </>
        }
      />
      <Route
        path="/tasks/task-list"
        element={
          <>
            <PageTitle title="Task List" />
            <TaskList />
          </>
        }
      />
      <Route
        path="/tasks/task-kanban"
        element={
          <>
            <PageTitle title="Task Kanban" />
            <TaskKanban />
          </>
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <>
            <PageTitle title="Form Elements" />
            <FormElements />
          </>
        }
      />
      <Route
        path="/forms/pro-form-elements"
        element={
          <>
            <PageTitle title="Pro Form Elements" />
            <ProFormElements />
          </>
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <>
            <PageTitle title="Form Layout" />
            <FormLayout />
          </>
        }
      />
      <Route
        path="/forms/pro-form-layout"
        element={
          <>
            <PageTitle title="Pro Form Layout" />
            <ProFormLayout />
          </>
        }
      />
      <Route
        path="/tables/tables"
        element={
          <>
            <PageTitle title="Tables" />
            <Tables />
          </>
        }
      />
      <Route
        path="/tables/pro-tables"
        element={
          <>
            <PageTitle title="Pro Tables" />
            <ProTables />
          </>
        }
      />
      <Route
        path="/pages/settings"
        element={
          <>
            <PageTitle title="Settings" />
            <Settings />
          </>
        }
      />
      <Route
        path="/pages/file-manager"
        element={
          <>
            <PageTitle title="File Manager" />
            <FileManager />
          </>
        }
      />
      <Route
        path="/pages/data-tables"
        element={
          <>
            <PageTitle title="Data Tables" />
            <DataTables />
          </>
        }
      />
      <Route
        path="/pages/pricing-tables"
        element={
          <>
            <PageTitle title="Pricing Tables" />
            <PricingTables />
          </>
        }
      />
      <Route
        path="/pages/error-page"
        element={
          <>
            <PageTitle title="Error Page" />
            <ErrorPage />
          </>
        }
      />
      <Route
        path="/pages/faq"
        element={
          <>
            <PageTitle title="Faq's" />
            <Faq />
          </>
        }
      />
      <Route
        path="/pages/team"
        element={
          <>
            <PageTitle title="Terms & Conditions" />
            <Teams />
          </>
        }
      />
      <Route
        path="/pages/terms-conditions"
        element={
          <>
            <PageTitle title="Terms & Conditions" />
            <TermsConditionsPage />
          </>
        }
      />
      <Route
        path="/pages/mail-success"
        element={
          <>
            <PageTitle title="Mail Success" />
            <MailSuccess />
          </>
        }
      />
      <Route
        path="/messages"
        element={
          <>
            <PageTitle title="Messages" />
            <Messages />
          </>
        }
      />
      <Route
        path="/inbox"
        element={
          <>
            <PageTitle title="Inbox" />
            <Inbox />
          </>
        }
      />
      <Route
        path="/invoice"
        element={
          <>
            <PageTitle title="Invoice" />
            <Invoice />
          </>
        }
      />
      <Route
        path="/chart/basic-chart"
        element={
          <>
            <PageTitle title="Basic Chart" />
            <BasicChart />
          </>
        }
      />
      <Route
        path="/chart/advanced-chart"
        element={
          <>
            <PageTitle title="Advanced Chart" />
            <AdvancedChart />
          </>
        }
      />
      <Route
        path="/ui/accordion"
        element={
          <>
            <PageTitle title="Accordion" />
            <Accordion />
          </>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <>
            <PageTitle title="Alerts" />
            <Alerts />
          </>
        }
      />
      <Route
        path="/ui/avatars"
        element={
          <>
            <PageTitle title="Avatars" />
            <Avatars />
          </>
        }
      />
      <Route
        path="/ui/badge"
        element={
          <>
            <PageTitle title="Badge" />
            <Badge />
          </>
        }
      />
      <Route
        path="/ui/breadcrumbs"
        element={
          <>
            <PageTitle title="Breadcrumbs" />
            <Breadcrumbs />
          </>
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <>
            <PageTitle title="Buttons" />
            <Buttons />
          </>
        }
      />
      <Route
        path="/ui/buttons-group"
        element={
          <>
            <PageTitle title="Buttons Groupo" />
            <ButtonsGroup />
          </>
        }
      />
      <Route
        path="/ui/cards"
        element={
          <>
            <PageTitle title="Cards" />
            <Cards />
          </>
        }
      />
      <Route
        path="/ui/carousel"
        element={
          <>
            <PageTitle title="Carousel" />
            <Carousel />
          </>
        }
      />
      <Route
        path="/ui/dropdowns"
        element={
          <>
            <PageTitle title="Dropdowns" />
            <Dropdowns />
          </>
        }
      />
      <Route
        path="/ui/images"
        element={
          <>
            <PageTitle title="Images" />
            <Images />
          </>
        }
      />
      <Route
        path="/ui/list"
        element={
          <>
            <PageTitle title="List" />
            <List />
          </>
        }
      />
      <Route
        path="/ui/modals"
        element={
          <>
            <PageTitle title="Modals" />
            <Modals />
          </>
        }
      />
      <Route
        path="/ui/notifications"
        element={
          <>
            <PageTitle title="Notifications" />
            <Notifications />
          </>
        }
      />
      <Route
        path="/ui/pagination"
        element={
          <>
            <PageTitle title="Pagination" />
            <Pagination />
          </>
        }
      />
      <Route
        path="/ui/popovers"
        element={
          <>
            <PageTitle title="Popovers" />
            <Popovers />
          </>
        }
      />
      <Route
        path="/ui/progress"
        element={
          <>
            <PageTitle title="Progress" />
            <Progress />
          </>
        }
      />
      <Route
        path="/ui/spinners"
        element={
          <>
            <PageTitle title="Spinners" />
            <Spinners />
          </>
        }
      />
      <Route
        path="/ui/tabs"
        element={
          <>
            <PageTitle title="Tabs" />
            <Tabs />
          </>
        }
      />
      <Route
        path="/ui/tooltips"
        element={
          <>
            <PageTitle title="Tooltips" />
            <Tooltips />
          </>
        }
      />
      <Route
        path="/ui/videos"
        element={
          <>
            <PageTitle title="Videos" />
            <Videos />
          </>
        }
      />

      <Route
        path="/auth/under-maintenance"
        element={
          <>
            <PageTitle title="Under Maintenance" />
            <UnderMaintenance />
          </>
        }
      />
      <Route
        path="/access-denied"
        element={
          <>
            <PageTitle title="Access Denied" />
            <AccessDenied />
          </>
        }
      />
    </Route>
  </Routes>
);

export default AppRoutes;
