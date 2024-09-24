import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../../layout/DefaultLayout';
import React from 'react';
import { ShadowContainer } from '../../components/Common/ShadowContainer';
import { TeamsList } from './TeamsList';
import { TeamsProvider } from '../../context/TeamsContext';
import { RightSideTeam } from './RightSideTeam';
import { MembersProvider } from '../../context/MembersContext';

export const TeamsAndUsers: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
        <MembersProvider>
          <TeamsProvider>
            <ShadowContainer>
              <div className="w-1/3 overflow-y-auto">
                <TeamsList />
              </div>
              <div className="custom-border border-l" />
              <div className="w-2/3 overflow-y-auto">
                <RightSideTeam />
              </div>
            </ShadowContainer>
          </TeamsProvider>
        </MembersProvider>
      </DefaultLayout>
    </>
  );
};
