import ReactDOM from 'react-dom';
import App from './App';
import '@extension/common/style';
import './index.scss';
import { initPopup } from './utils/initPopup';

initPopup();

ReactDOM.render(<App />, document.getElementById('app'));
