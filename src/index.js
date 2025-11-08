import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// 1. Importa los estilos base de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// --- THIS IS THE FIX ---
// Now that dependencies are correct, this import will work
// and will power all dropdowns, carousels, etc.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// --- END OF FIX ---


// 2. Importa TUS estilos personalizados
import './style.css'; 

import App from './App';
import reportWebVitals from './reportWebVitals';

// --- IMPORT ALL YOUR PROVIDERS ---
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { FavouritesProvider } from './context/FavouritesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* --- WRAP YOUR APP IN ALL PROVIDERS --- */}
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <FavouritesProvider>
              <App />
            </FavouritesProvider>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();