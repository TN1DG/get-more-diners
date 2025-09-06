import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/button'
import { 
  ChefHat, 
  Home, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Store
} from 'lucide-react'

export const DashboardLayout: React.FC = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Restaurant Profile', href: '/dashboard/profile', icon: Store },
    { name: 'Find Diners', href: '/dashboard/diners', icon: Users },
    { name: 'Create Campaign', href: '/dashboard/campaigns/new', icon: MessageSquare },
    { name: 'Past Campaigns', href: '/dashboard/campaigns', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-elegant border-r border-cream-300">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-8 py-6 border-b border-cream-200">
            <Link to="/" className="flex items-center hover:opacity-80 transition-all duration-300">
              <ChefHat className="h-9 w-9 text-primary" />
              <span className="ml-3 text-2xl font-serif font-semibold text-foreground">Get More Diners</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 space-y-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-6 py-4 text-base font-medium rounded-2xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-white shadow-button'
                      : 'text-muted-foreground hover:bg-cream-100 hover:text-foreground'
                  }`}
                >
                  <item.icon className={`h-5 w-5 mr-4 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-primary'
                  }`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          
          {/* User section */}
          <div className="border-t border-cream-200 p-6">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-card">
                  <span className="text-white text-lg font-semibold">
                    {user?.user_metadata?.first_name?.charAt(0) || user?.email?.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-base font-semibold text-foreground">
                  {user?.user_metadata?.first_name && user?.user_metadata?.last_name
                    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                    : user?.email}
                </p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link to="/dashboard/settings">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-cream-100 rounded-xl py-3 transition-all duration-200" size="sm">
                  <Settings className="h-5 w-5 mr-3 text-sage-500" />
                  Settings
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50 rounded-xl py-3 transition-all duration-200" 
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-72">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-card border-b border-cream-200">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-serif font-bold text-foreground">
              {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
