import { proxyStore } from '@extension/browser/standalone/proxyStore';
import { listenForUserActivity } from '@common/services/listenForUserActivity/listenForUserActivity';
import ReactDOM from 'react-dom';
import App from './App';
import '@extension/common/style';
import './index.scss';
import { initPopup } from './utils/initPopup';

proxyStore.ready().then(() => {
  initPopup();
  listenForUserActivity();

  ReactDOM.render(<App />, document.getElementById('app'));
});
