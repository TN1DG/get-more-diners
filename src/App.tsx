import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LandingPage } from './components/LandingPage'
import { Login } from './components/auth/Login'
import { SignUp } from './components/auth/SignUp'
import { DashboardLayout } from './components/dashboard/DashboardLayout'
import { Dashboard } from './components/dashboard/Dashboard'
import { RestaurantProfile } from './components/dashboard/RestaurantProfile'
import { FindDiners } from './components/dashboard/FindDiners'
import { CreateCampaign } from './components/dashboard/CreateCampaign'
import { PastCampaigns } from './components/dashboard/PastCampaigns'

// Placeholder components for remaining dashboard routes
const Settings = () => <div className="p-6"><h2 className="text-2xl font-bold">Settings</h2><p>Settings coming soon...</p></div>

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignUp />} />
      
      {/* Protected dashboard routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<RestaurantProfile />} />
        <Route path="diners" element={<FindDiners />} />
        <Route path="campaigns/new" element={<CreateCampaign />} />
        <Route path="campaigns" element={<PastCampaigns />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
