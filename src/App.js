import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import AddressBook from './components/AddressBook';
import Onboarding from './components/Onboarding';
import TopBar from './components/TopBar';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TopBar />
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/address-book" element={<AddressBook />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
