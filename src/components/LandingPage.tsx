import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ChefHat, Users, MessageCircle, Mail, Smartphone, Target, BarChart3 } from 'lucide-react'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-cream-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center hover:opacity-80 transition-all duration-300">
              <ChefHat className="h-9 w-9 text-primary" />
              <span className="ml-3 text-2xl font-serif font-semibold text-foreground">Get More Diners</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
                Sign In
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-medium shadow-button transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-background to-cream-100 opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(220,104,68,0.1),transparent_50%)] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif font-bold text-hero md:text-7xl lg:text-8xl text-foreground mb-8 leading-tight">
              Fill Every Table,{' '}
              <span className="text-primary relative">
                Every Night
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                  <path d="M3 9C118 1 180 1 297 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-amber-400 opacity-60" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Connect with hungry diners in your area using AI-powered marketing campaigns. 
              Send personalized offers via email and SMS to bring customers back to your restaurant.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-button transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  Start Free Trial
                  <ChefHat className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300">
                Watch Demo
                <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-sage-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-sage-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                14-day free trial
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600"></div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-terracotta-400 to-terracotta-600"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif font-bold text-display text-foreground mb-6">
              Everything you need to grow your restaurant
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From finding the right customers to crafting compelling offers, 
              we've got all the tools you need in one elegant platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-white border-cream-300 rounded-2xl overflow-hidden">
              <CardHeader className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-serif font-semibold text-foreground mb-4">Smart Diner Search</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Find diners in your area by location, interests, and dining preferences. 
                  Target the customers most likely to visit your restaurant.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-white border-cream-300 rounded-2xl overflow-hidden">
              <CardHeader className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-serif font-semibold text-foreground mb-4">AI-Powered Copy</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Generate compelling marketing messages with AI. Create personalized 
                  offers that resonate with your target audience.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-white border-cream-300 rounded-2xl overflow-hidden">
              <CardHeader className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-terracotta-500 to-terracotta-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="flex space-x-1">
                    <Mail className="h-4 w-4 text-white" />
                    <Smartphone className="h-4 w-4 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl font-serif font-semibold text-foreground mb-4">Multi-Channel Outreach</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Send campaigns via email and SMS to maximize reach. 
                  Connect with diners on their preferred communication channels.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-white border-cream-300 rounded-2xl overflow-hidden">
              <CardHeader className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-serif font-semibold text-foreground mb-4">Campaign Analytics</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Track the performance of your campaigns and see which offers 
                  drive the most bookings and revenue.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
          <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-amber-500 rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-terracotta-500 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-5 h-5 bg-sage-500 rounded-full"></div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Get up and running in minutes with our simple 3-step process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Up Your Restaurant</h3>
              <p className="text-gray-600">
                Create your restaurant profile with location, cuisine type, and basic information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Your Audience</h3>
              <p className="text-gray-600">
                Search our database of diners to find customers in your area who love your type of cuisine.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Send Compelling Offers</h3>
              <p className="text-gray-600">
                Use AI to create irresistible offers and send them via email and SMS to fill your tables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600">
              Start free, upgrade when you need more
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-3xl font-bold">Free</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Up to 100 contacts</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> 5 campaigns per month</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Basic analytics</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Email support</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary border-2 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-3xl font-bold">$49<span className="text-sm font-normal">/month</span></div>
                <CardDescription>For growing restaurants</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Up to 1,000 contacts</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Unlimited campaigns</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Advanced analytics</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> SMS campaigns</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Priority support</li>
                </ul>
                <Button className="w-full mt-6">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold">Custom</div>
                <CardDescription>For restaurant groups</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Unlimited contacts</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Multiple locations</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Custom integrations</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> Dedicated support</li>
                  <li className="flex items-center"><Target className="h-4 w-4 text-green-500 mr-2" /> White-label option</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to fill more tables?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of restaurants already growing with Get More Diners
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Start Your Free Trial Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center mb-4 hover:opacity-80 transition-opacity">
                <ChefHat className="h-6 w-6 text-primary" />
                <span className="ml-2 text-lg font-bold">Get More Diners</span>
              </Link>
              <p className="text-gray-400">
                The easiest way for restaurants to connect with hungry customers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Get More Diners. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
