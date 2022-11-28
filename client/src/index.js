import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <ToastContainer />
      <App />
    </Router>
);
