import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { APP_ID } from '@common/constants';
import App from './App';
import '@extension/common/style';
import './autofillSwitcher.scss';

ReactDOM.render(<StrictMode><App /></StrictMode>, document.getElementById(APP_ID));
