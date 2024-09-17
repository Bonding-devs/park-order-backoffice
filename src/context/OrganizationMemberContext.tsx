import { createContext, useContext, useState } from 'react';

interface OrganizationMemberContextType {
  invite: boolean;
  setInvite: (value: boolean) => void;
  load: boolean;
  setLoad: (value: boolean) => void;
}

const OrganizationMemberContext = createContext<
  OrganizationMemberContextType | undefined
>(undefined);

export const useOrganizationMember = () => {
  const context = useContext(OrganizationMemberContext);
  if (!context) {
    throw new Error(
      'useOrganizationMember must be used within an OrganizationMemberProvider'
    );
  }
  return context;
};

export const OrganizationMemberProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [invite, setInvite] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  return (
    <OrganizationMemberContext.Provider
      value={{
        invite,
        setInvite,
        load,
        setLoad
      }}
    >
      {children}
    </OrganizationMemberContext.Provider>
  );
};
