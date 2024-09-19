import { ToastContainer } from 'react-toastify';
import DefaultLayout from '../../layout/DefaultLayout';
import React from 'react';
import { ShadowContainer } from '../../components/Common/ShadowContainer';
import { TeamsList } from './TeamsList';
import { TeamsProvider } from '../../context/TeamsContext';
import { RightSideTeam } from './RightSideTeam';

export const TeamsAndUsers: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
        <TeamsProvider>
          <ShadowContainer>
            <div className="w-1/3">
              <TeamsList />
            </div>
            <div className="custom-border border-r" />
            <div className="w-2/3">
              <RightSideTeam />
            </div>
          </ShadowContainer>
        </TeamsProvider>
      </DefaultLayout>
    </>
  );
};
