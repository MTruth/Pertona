import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import AddressBook from './components/AddressBook';
import Onboarding from './components/Onboarding';
import Tones from './components/Tones';
import CreateMessage from './components/CreateMessage';
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
          <Route path="/tones" element={<Tones />} />
          <Route path="/create-message" element={<CreateMessage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
