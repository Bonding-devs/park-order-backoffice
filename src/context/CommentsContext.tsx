import { createContext, useContext, useState } from 'react';

interface CommentsContextType {
  newComment: boolean;
  loadNewComment: (option: boolean) => void;
}

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useLocations must be used within an CommentsProvider');
  }
  return context;
};

export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [newComment, setNewComment] = useState<boolean>(false);

  return (
    <CommentsContext.Provider
      value={{
        newComment,
        loadNewComment: setNewComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
