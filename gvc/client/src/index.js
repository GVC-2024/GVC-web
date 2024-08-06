import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18의 createRoot 사용
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import GlobalStyle from './pages/GlobalStyle'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </React.StrictMode>
);
