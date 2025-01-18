import { FC, useState, useMemo } from 'react';
import { VaultItemModalsContext } from './VaultItemModalsContext';
import { IVaultItemModalContext, IVaultItemModal } from './VaultItemModalsContextContracts';

export const VaultItemModalsProvider: FC = ({ children }) => {
  const [vaultItemModalData, setVaultItemModalData] = useState<IVaultItemModal>();

  const value = useMemo<IVaultItemModalContext>(() => ({
    vaultItemModalData,
    setVaultItemModalData,
  }), [
    vaultItemModalData,
    setVaultItemModalData,
  ]);

  return (
    <VaultItemModalsContext.Provider value={value}>
      {children}
    </VaultItemModalsContext.Provider>
  );
};
