import './App.css';
import React, { useState } from "react";
import Account from './component/Account';
import Login from './component/Login';
import Footer from './component/Footer';
import FComment from './component/Header';
import Home from './component/Home';
import SpaDetail from './component/SpaDetail';
import Schedule from './component/Schedule';
import UserCustomer from './component/UserCustomer';
import Doctor from './component/Doctor';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login setUsername={setUsername} />} />
      <Route path="/" element={<><FComment username={username} onLogout={() => setUsername('')} /><Home /><Footer /></>} />
        <Route path="/account" element={<Account />} /> 
        <Route path="/lich-spa" element={<SpaDetail />} /> 
        <Route path="/lich-kham" element={<Schedule />} /> 
        <Route path="/khach-hang" element={<UserCustomer />} /> 
        <Route path="/bac-si" element={<Doctor />} /> 
      </Routes>
  </Router>
  );
};

export default App;
