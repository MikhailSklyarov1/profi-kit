import ReactDOM from 'react-dom/client';
import './index.css';
import RootComponent from './RootComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RootComponent></RootComponent>
);
