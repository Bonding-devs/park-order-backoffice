import 'dropzone/dist/dropzone.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'nouislider/dist/nouislider.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import './css/satoshi.css';
import './css/simple-datatables.css';
import './css/style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
