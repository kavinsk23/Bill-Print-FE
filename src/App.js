import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";
import VehicleTypePage from "./pages/VehicleTypePage";
import QRScannerPage from "./pages/QRScannerPage";
import AuthGuard from "./AuthGuard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/vehicle-type" 
          element={
            <AuthGuard>
              <VehicleTypePage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <AuthGuard>
              <ReportsPage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/scan-qr" 
          element={
            <AuthGuard>
              <QRScannerPage />
            </AuthGuard>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
