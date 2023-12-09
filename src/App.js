import logo from './logo.svg';
import './App.css';

import { ShowPage } from './Pages/show';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
