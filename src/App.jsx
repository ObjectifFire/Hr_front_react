import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Companies from './pages/Companies';
import Employees from './pages/Employees';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Entreprises</Link> | <Link to="/employees">Employés</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Companies />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default App;
