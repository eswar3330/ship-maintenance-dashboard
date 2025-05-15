import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import ShipForm from './components/Ships/ShipForm';
import ShipsPage from './pages/ShipsPage';
import ComponentList from './components/Components/ComponentList';
import ComponentForm from './components/Components/ComponentForm';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';
import CreateJobPage from './pages/CreateJobPage';
import CalendarPage from './pages/CalendarPage';

import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';

import { NotificationsProvider } from './contexts/NotificationsContext';   // <-- added babe
import NotificationCenter from './components/NotificationCenter';  // <-- added babe

function App() {
  return (
    <Router>
      <ShipsProvider>
        <ComponentsProvider>
          <JobsProvider>
            <NotificationsProvider>   {/* wrap inside jobs, components, ships */}
              <NotificationCenter />  {/* this renders notifications UI */}
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/ships/:shipId/components" element={<ComponentList />} />
                <Route path="/ships/:shipId/components/new" element={<ComponentForm />} />
                <Route path="/ships/:shipId/components/:componentId/edit" element={<ComponentForm />} />
                <Route path="/ships" element={<ShipsPage />} />
                <Route path="/ships/new" element={<ShipForm />} />
                <Route path="/ships/:shipId/edit" element={<ShipForm />} /> 
                <Route path="/ships/:shipId" element={<ShipDetailPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/create" element={<CreateJobPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </NotificationsProvider>
          </JobsProvider>
        </ComponentsProvider>
      </ShipsProvider>
    </Router>
  );
}

export default App;
