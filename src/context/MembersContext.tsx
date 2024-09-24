import { OrganizationMember } from '../models/organization-member';
import { createContext, useContext } from 'react';
import { useGetLazyMembers } from '../modules/OrganizationMembers/useGetLazyMembers';

interface MembersContextType {
  members: OrganizationMember[];
  isLoading: boolean;
  error: string | null;
  loadData: (force?: boolean) => void;
}

export const useMembers = () => {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error('useMembers must be used within a MembersProvider');
  }
  return context;
};

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export const MembersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const methods = useGetLazyMembers();

  return (
    <MembersContext.Provider value={{ ...methods }}>
      {children}
    </MembersContext.Provider>
  );
};
