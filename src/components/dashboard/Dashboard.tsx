import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Store,
  Plus,
  BarChart3
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { PageTransition } from '../animations/PageTransition'
import { AnimatedCard } from '../animations/AnimatedCard'
import { AnimatedButton } from '../animations/AnimatedButton'
import { AnimatedSection } from '../animations/AnimatedSection'
import { staggerContainerVariants, slideUpVariants, fadeInVariants } from '../../lib/animations'
import { isDemoMode, getDemoRestaurant, getDemoStats } from '../../lib/demoData'

export const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [restaurant, setRestaurant] = useState<any>(null)
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalContacts: 0,
    campaignsThisMonth: 0,
    successRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return

      try {
        if (isDemoMode()) {
          // Use demo data
          setRestaurant(getDemoRestaurant())
          const demoStats = getDemoStats();
          setStats({
            totalCampaigns: demoStats.totalCampaigns,
            totalContacts: 1250, // Using sample data as in non-demo mode
            campaignsThisMonth: demoStats.campaignsThisMonth,
            successRate: demoStats.successRate,
          })
        } else {
          // Fetch restaurant profile
          const { data: restaurantData } = await supabase
            .from('restaurants')
            .select('*')
            .eq('user_id', user.id)
            .single()

          setRestaurant(restaurantData)

          // Fetch campaign stats
          if (restaurantData) {
            const { data: campaigns } = await supabase
              .from('campaigns')
              .select('*')
              .eq('restaurant_id', restaurantData.id)

            const thisMonth = new Date()
            thisMonth.setDate(1) // First day of current month

            const campaignsThisMonth = campaigns?.filter(
              campaign => new Date(campaign.created_at) >= thisMonth
            ).length || 0

            setStats({
              totalCampaigns: campaigns?.length || 0,
              totalContacts: 1250, // Sample data - would be calculated from actual diner selections
              campaignsThisMonth,
              successRate: 85 // Sample success rate
            })
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Show onboarding if no restaurant profile exists
  if (!restaurant) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-dashed border-gray-300">
          <CardHeader className="text-center">
            <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <CardTitle className="text-2xl">Welcome to Get More Diners!</CardTitle>
            <CardDescription>
              Let's start by setting up your restaurant profile to begin attracting more customers.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/dashboard/profile">
              <Button size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Set Up Restaurant Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <PageTransition className="space-y-8">
      {/* Welcome Section */}
      <AnimatedSection animation="slideUp" className="bg-gradient-to-br from-white via-cream-50 to-amber-50/30 rounded-2xl p-8 shadow-card border border-cream-200">
        <motion.h2 
          className="text-4xl font-serif font-bold text-foreground mb-3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome back, {restaurant.name}! 🍴
        </motion.h2>
        <motion.p 
          className="text-xl text-muted-foreground leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Your marketing dashboard shows how you're growing your customer base and filling more tables.
        </motion.p>
      </AnimatedSection>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div variants={slideUpVariants}>
          <AnimatedCard className="bg-white rounded-2xl shadow-card border border-cream-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6">
              <CardTitle className="text-base font-semibold text-muted-foreground">📢 Marketing Campaigns</CardTitle>
              <motion.div 
                className="p-3 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="h-6 w-6 text-primary" />
              </motion.div>
            </CardHeader>
            <CardContent className="pb-6">
              <motion.div 
                className="text-3xl font-serif font-bold text-foreground mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              >
                {stats.totalCampaigns}
              </motion.div>
              <p className="text-sm text-muted-foreground">
                {stats.campaignsThisMonth} sent this month
              </p>
            </CardContent>
          </AnimatedCard>
        </motion.div>

        <Card className="bg-white rounded-2xl shadow-card border border-cream-200 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6">
            <CardTitle className="text-base font-semibold text-muted-foreground">🍽️ Hungry Locals</CardTitle>
            <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-500/20 rounded-xl">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="text-3xl font-serif font-bold text-foreground mb-1">{stats.totalContacts.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">
              potential diners in your area
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow-card border border-cream-200 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6">
            <CardTitle className="text-base font-semibold text-muted-foreground">📈 Success Rate</CardTitle>
            <div className="p-3 bg-gradient-to-br from-sage-500/10 to-sage-500/20 rounded-xl">
              <TrendingUp className="h-6 w-6 text-sage-600" />
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="text-3xl font-serif font-bold text-foreground mb-1">{stats.successRate}%</div>
            <p className="text-sm text-muted-foreground">
              customers engaged with offers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow-card border border-cream-200 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6">
            <CardTitle className="text-base font-semibold text-muted-foreground">📅 This Month</CardTitle>
            <div className="p-3 bg-gradient-to-br from-terracotta-500/10 to-terracotta-500/20 rounded-xl">
              <BarChart3 className="h-6 w-6 text-terracotta-600" />
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="text-3xl font-serif font-bold text-foreground mb-1">{stats.campaignsThisMonth}</div>
            <p className="text-sm text-muted-foreground">
              offers sent to diners
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 via-background to-amber/5 border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-serif">🚀 Ready to Fill More Tables?</CardTitle>
            <CardDescription>
              Take action to bring more hungry customers to your restaurant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/dashboard/diners">
              <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-white shadow-warm">
                <Users className="h-4 w-4 mr-2" />
                🔍 Find hungry locals near you
              </Button>
            </Link>
            <Link to="/dashboard/campaigns/new">
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                ✨ Craft irresistible deals with AI
              </Button>
            </Link>
            <Link to="/dashboard/campaigns">
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                📈 Track your campaign success
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
          <CardTitle className="text-xl font-serif">🏪 Your Restaurant</CardTitle>
            <CardDescription>
              Make sure your profile attracts the right diners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-foreground">🍴 Name:</span> <span className="text-muted-foreground">{restaurant.name}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">📍 Location:</span> <span className="text-muted-foreground">{restaurant.city}, {restaurant.state}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">🍲 Cuisine:</span> <span className="text-muted-foreground">{restaurant.cuisine_type}</span>
              </div>
              <div className="pt-4">
                <Link to="/dashboard/profile">
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest campaigns and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.totalCampaigns === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-500 mb-4">
                Create your first campaign to start attracting more diners.
              </p>
              <Link to="/dashboard/campaigns/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Campaign
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Campaign history will appear here once you've sent some campaigns.
            </div>
          )}
        </CardContent>
      </Card>
    </PageTransition>
  )
}
