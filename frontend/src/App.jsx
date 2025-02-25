import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        <Route element={<ProtectedRoute/>}>
          <Route path="/Home" element={<Home />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
