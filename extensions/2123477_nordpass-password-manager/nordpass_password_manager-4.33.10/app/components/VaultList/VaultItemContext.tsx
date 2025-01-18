import { FC, createContext, useState, useMemo } from 'react';
import { noOp } from '@common/constants/function';

type TVaultItemContext = {
  setIsContextOpen: (open: boolean) => void;
  isContextOpen: boolean;
}

export const VaultItemContext = createContext<TVaultItemContext>({
  isContextOpen: false,
  setIsContextOpen: noOp,
});

const VaultItemContextProvider: FC = ({ children }) => {
  const [isContextOpen, setIsContextOpen] = useState(false);

  const contextValue = useMemo(() => ({ setIsContextOpen, isContextOpen }), [isContextOpen, setIsContextOpen]);

  return (
    <VaultItemContext.Provider value={contextValue}>
      {children}
    </VaultItemContext.Provider>
  );
};

export default VaultItemContextProvider;
