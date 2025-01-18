import { TranslationsProvider } from '@extension/app/context/TranslationsProvider';
import { ErrorBoundary } from '@extension/app/components';
import { Popup } from './Popup';

const App = () => (
  <ErrorBoundary>
    <TranslationsProvider>
      <Popup />
    </TranslationsProvider>
  </ErrorBoundary>
);

export default App;
