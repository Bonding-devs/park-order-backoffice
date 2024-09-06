import { createContext, useContext, useState } from 'react';

export enum RightSideOptions {
  VIEW,
  UPDATE,
  CREATE,
}
interface LocationContextType {
  load: boolean;
  setLoad: (option: boolean) => void;
  mode: RightSideOptions;
  setMode: (value: RightSideOptions) => void;
  selectedItem: string;
  setSelectedItem: (value: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const useLocations = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocations must be used within an LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [load, setLoad] = useState<boolean>(false);
  const [mode, setMode] = useState<RightSideOptions>(RightSideOptions.VIEW);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <LocationContext.Provider
      value={{
        load,
        setLoad,
        mode,
        setMode,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
