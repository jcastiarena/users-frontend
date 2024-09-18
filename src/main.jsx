import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This is where App.jsx is imported
import './styles/globals.scss'; // Global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* Renders the App component */}
  </React.StrictMode>
);
