import { createContext, ReactNode, useContext, useState } from 'react';
import { Team } from '../models/team';
import { useGetTeams } from '../modules/teams/useGetTeams';
import { DataFetchResult } from '../models/data-fetch-result';

export enum RightSideTeamsOptions {
  VIEW,
  EDIT,
  CREATE,
  ADD_USER,
}

interface TeamsContextProps extends DataFetchResult<Team> {
  mode: RightSideTeamsOptions;
  setMode: (value: RightSideTeamsOptions) => void;
}

export const useTeams = (): TeamsContextProps => {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error('useTeams must be used within a TeamsProvider');
  }
  return context;
};

const TeamsContext = createContext<TeamsContextProps | undefined>(undefined);

export const TeamsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<RightSideTeamsOptions>(
    RightSideTeamsOptions.VIEW
  );
  const methods = useGetTeams();

  return (
    <TeamsContext.Provider value={{ ...methods, mode, setMode }}>
      {children}
    </TeamsContext.Provider>
  );
};
