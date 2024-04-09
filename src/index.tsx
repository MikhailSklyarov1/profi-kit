import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/PageApp/PageApp';
import RootComponent from './RootComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RootComponent></RootComponent>
);
