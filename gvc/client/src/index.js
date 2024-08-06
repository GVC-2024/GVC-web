/*import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import GlobalStyle from './pages/GlobalStyle'; 
import { createRoot } from 'react-dom/client';
import HomeMeetingPage from "./pages/meeting/HomeMeetingPage";
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/HomeMeetingPage" element={<HomeMeetingPage/>}/>
      </Routes>
      <GlobalStyle />
      <App />
    </Router>
  </React.StrictMode>
);
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import PageRender from './PageRender';
import './index.css';
import HomeMeetingPage from "./pages/meeting/HomeMeetingPage";

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/HomeMeetingPage" element={<HomeMeetingPage/>}/>
        <Route path="/*" element={<PageRender/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);