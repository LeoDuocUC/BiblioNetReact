import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Importa los estilos base de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Importa TUS estilos personalizados (aquí estaba el error)
import './style.css'; 

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();