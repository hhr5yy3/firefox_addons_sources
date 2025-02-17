import { createContext, FC } from 'react';
import { IExtensionContextValue } from '@extension/app/context/ExtensionContext';

export const ExtensionContext = createContext<Partial<IExtensionContextValue> | null>(null);

const DEFAULT_MOCK_EXTENSION_CONTEXT: Partial<IExtensionContextValue> = {
  isPopup: false,
  domain: '',
  websiteUrl: '',
};

let mockExtensionContextValue: Partial<IExtensionContextValue> = DEFAULT_MOCK_EXTENSION_CONTEXT;

export const useExtensionContext = () => mockExtensionContextValue;

interface IMockExtensionProvider extends FC {
  __resetExtensionContextValue?: () => void;
  __mockExtensionContextValue?: (extensionContextValue: Partial<IExtensionContextValue>) => void;
}

const ExtensionProvider: IMockExtensionProvider = ({ children }) => (
  <ExtensionContext.Provider value={mockExtensionContextValue}>
    {children}
  </ExtensionContext.Provider>
);

// eslint-disable-next-line no-underscore-dangle
ExtensionProvider.__mockExtensionContextValue = ((extensionContextValue: Partial<IExtensionContextValue>) => {
  mockExtensionContextValue = extensionContextValue;
});

// eslint-disable-next-line no-underscore-dangle
ExtensionProvider.__resetExtensionContextValue = () => {
  mockExtensionContextValue = DEFAULT_MOCK_EXTENSION_CONTEXT;
};

export default ExtensionProvider;
