import { VaultProvider } from '@extension/app/context/VaultContext';
import { TranslationsProvider } from '@extension/app/context/TranslationsProvider';
import { ErrorBoundary } from '@extension/app/components';
import { useAppThemeChangeListener } from '@extension/app/hooks/useAppThemeChangeListener';
import Success from '@extension/reportProblem/components/Success';

const App = () => {
  useAppThemeChangeListener();

  return (
    <ErrorBoundary>
      <TranslationsProvider>
        <VaultProvider>
          <Success />
        </VaultProvider>
      </TranslationsProvider>
    </ErrorBoundary>
  );
};

export default App;
