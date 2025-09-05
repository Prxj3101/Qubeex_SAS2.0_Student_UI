import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import BatchSubjects from './components/BatchSubjects';
import TestsExamination from './components/TestsExamination';
import AssignmentsSubmissions from './components/AssignmentsSubmissions';
import YourProfile from './components/YourProfile';

interface User {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  batch: string;
  division: string;
  age: number;
  photo: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <DashboardLayout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/batch-subjects" element={<BatchSubjects user={user} />} />
          <Route path="/tests-examination" element={<TestsExamination user={user} />} />
          <Route path="/assignments-submissions" element={<AssignmentsSubmissions user={user} />} />
          <Route path="/profile" element={<YourProfile user={user} />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;