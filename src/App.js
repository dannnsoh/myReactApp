import logo from './logo.svg';
import './App.css';

import { ShowPage } from './Pages/show';
import { ShowPageOM } from './Pages/showOM';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ShowPage />} />
          <Route path="/OM" element={<ShowPageOM />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
