import React from 'react';
import './App.css';

import { ShowPage } from './Pages/show';
import { ShowPageOM } from './Pages/showOM';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
        <div className="d-flex justify-content-center mt-5 transparent-border">
            <Link to="/STX" className="btn btn-primary me-2"><i className="bi bi-graph-up"></i> STX</Link>
            <Link to="/OM" className="btn btn-secondary"><i className="bi bi-toggles2"></i> OM</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/STX" element={<ShowPage />} />
          <Route path="/OM" element={<ShowPageOM />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
