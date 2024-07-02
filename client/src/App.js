// App.js

import React from 'react';
// Importing Router, Route, and Routes from react-router-dom for routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home'; 
import Patients from './components/Patients'; 
import Appointments from './components/Appointments'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup'; 
import PrivateRoute from './components/PrivateRoute'; 
import { AuthContextProvider } from './context/AuthContext'; 

function App() {
  return (
    <AuthContextProvider> 
      <Router> 
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/patients" element={<Patients />} />
          <Route 
            path="/appointments" 
            element={
              <PrivateRoute> {/* Protecting the Appointments component with PrivateRoute */}
                <Appointments />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App; 
