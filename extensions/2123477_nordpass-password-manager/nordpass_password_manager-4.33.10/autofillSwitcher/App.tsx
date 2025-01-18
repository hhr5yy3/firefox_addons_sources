import { TranslationsProvider } from '@extension/app/context/TranslationsProvider';
import { ErrorBoundary } from '@extension/app/components';
import { useAppThemeChangeListener } from '@extension/app/hooks/useAppThemeChangeListener';
import DialogBody from './components/DialogBody';

const App = () => {
  useAppThemeChangeListener();

  return (
    <ErrorBoundary>
      <TranslationsProvider>
        <DialogBody />
      </TranslationsProvider>
    </ErrorBoundary>
  );
};

export default App;
