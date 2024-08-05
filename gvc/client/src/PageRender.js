import React from "react";
import { Routes, Route } from 'react-router-dom';

// 페이지와 컴포넌트 로드
import GlobalStyle from './pages/GlobalStyle'; 
import App from './App';//
//샘솔 추가

//
//
//
function PageRender() {
    return (
        <div className="PageRender">
      <GlobalStyle />
      <App />
        </div>
    );
}

export default PageRender;