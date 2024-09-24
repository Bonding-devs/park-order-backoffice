import React, { useContext, useState } from 'react';
import { Team } from '../../../models/team';

const TeamContext = React.createContext<TeamContextProps | null>(null);

export enum MembersControl {
  VIEW,
  ADD,
  EDIT,
}
interface TeamContextProps {
  team: Team;
  mode: MembersControl;
  setMode: (mode: MembersControl) => void;
}

export const useTeam = (): TeamContextProps => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeams must be used within a TeamProvider');
  }
  return context;
};

export const TeamProvider: React.FC<{
  team: Team;
  children: React.ReactNode;
}> = ({ team, children }) => {
  const [mode, setMode] = useState<MembersControl>(MembersControl.VIEW);
  
  return (
    <TeamContext.Provider value={{ team, mode, setMode }}>{children}</TeamContext.Provider>
  );
};
