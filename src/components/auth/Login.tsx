import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Logo } from '../ui/Logo'
import { ChefHat, Play, Star } from 'lucide-react'
import { PageTransition } from '../animations/PageTransition'
import { AnimatedButton } from '../animations/AnimatedButton'
import { scaleInVariants, slideUpVariants } from '../../lib/animations'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from?.pathname || '/dashboard'
  const isDemo = new URLSearchParams(location.search).get('demo') === 'true'

  const handleDemoLogin = () => {
    // Demo mode - bypass authentication
    setLoading(true)
    setTimeout(() => {
      // Create a demo user in localStorage
      localStorage.setItem('demo_mode', 'true')
      localStorage.setItem('demo_user', JSON.stringify({
        id: 'demo-user-123',
        email: 'demo@restaurant.com',
        restaurant: {
          name: 'Bella Vista Italian',
          city: 'Austin',
          state: 'TX',
          cuisine_type: 'Italian'
        }
      }))
      navigate('/dashboard', { replace: true })
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setError('')
      setLoading(true)
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message)
      } else {
        navigate(from, { replace: true })
      }
    } catch (error) {
      setError('Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8"
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
      >
        <motion.div 
          className="text-center"
          variants={scaleInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center mb-6">
            <Logo size="lg" showTagline={true} />
          </div>
          {isDemo ? (
            <>
              <h2 className="mt-6 text-3xl font-serif font-bold text-foreground">
                🎆 Experience the Demo
              </h2>
              <p className="mt-2 text-muted-foreground">
                See how Get More Diners helps restaurants fill their tables
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-6 text-3xl font-serif font-bold text-foreground">
                Welcome back! 🍴
              </h2>
              <p className="mt-2 text-muted-foreground">
                Sign in to your restaurant dashboard
              </p>
            </>
          )}
        </motion.div>
        
        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Card className={isDemo ? "bg-gradient-to-br from-primary/5 via-background to-sage/5 border-primary/10" : ""}>
            {isDemo ? (
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif">🎭 Demo Restaurant Dashboard</CardTitle>
                <CardDescription className="text-base">
                  Explore the full platform as "Bella Vista Italian" - a demo restaurant in Austin, TX
                </CardDescription>
              </CardHeader>
            ) : (
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
            )}
            <CardContent>
              {isDemo ? (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Star className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-900">What you'll see in the demo:</h4>
                        <ul className="text-sm text-amber-800 mt-2 space-y-1">
                          <li>• Pre-filled restaurant profile (Bella Vista Italian)</li>
                          <li>• Sample marketing campaigns and customer data</li>
                          <li>• Campaign analytics and performance metrics</li>
                          <li>• AI-powered offer templates and tools</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleDemoLogin}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-terracotta-500 hover:from-primary/90 hover:to-terracotta-500/90 text-white font-semibold py-4 text-lg shadow-warm"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Loading demo...
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        🚀 Launch Demo Experience
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    No signup required • Explore all features instantly
                  </p>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div 
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Your password"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <AnimatedButton 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </AnimatedButton>
                </motion.div>
                
                <motion.div 
                  className="text-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign up here
                  </Link>
                </motion.div>
                
                <motion.div 
                  className="text-center pt-4 border-t"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                >
                  <Link 
                    to="/login?demo=true" 
                    className="text-sm text-primary hover:underline font-medium flex items-center justify-center"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Try the demo instead
                  </Link>
                </motion.div>
              </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </PageTransition>
  )
}
