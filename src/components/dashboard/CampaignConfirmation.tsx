import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { 
  CheckCircle, 
  Users, 
  Mail, 
  Smartphone, 
  MapPin, 
  Calendar,
  TrendingUp,
  ArrowRight
} from 'lucide-react'

interface CampaignConfirmationProps {
  campaignData?: {
    name: string
    targetCount: number
    city?: string
    state?: string
    channels: string[]
  }
}

export const CampaignConfirmation: React.FC<CampaignConfirmationProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get data from navigation state or use defaults for demo
  const campaignData = location.state || {
    name: 'Happy Hour Special',
    targetCount: 153,
    city: 'Austin',
    state: 'TX',
    channels: ['email', 'sms']
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3, ease: "backOut" }}
          className="mx-auto w-24 h-24 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center mb-6 shadow-elegant"
        >
          <CheckCircle className="h-12 w-12 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-serif font-bold text-foreground mb-4"
        >
          🎉 Your offer is on its way!
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Your "{campaignData.name}" campaign has been successfully sent to hungry diners in your area.
        </motion.p>
      </motion.div>

      {/* Campaign Summary */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-primary/5 via-background to-sage/5 border-primary/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">📊 Campaign Summary</CardTitle>
            <CardDescription>
              Here's what just happened with your marketing campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Target Audience */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-serif font-bold text-foreground mb-1">
                  {campaignData.targetCount.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">hungry diners reached</p>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-terracotta-500/10 to-terracotta-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-terracotta-600" />
                </div>
                <div className="text-lg font-serif font-bold text-foreground mb-1">
                  {campaignData.city}, {campaignData.state}
                </div>
                <p className="text-sm text-muted-foreground">target location</p>
              </motion.div>

              {/* Channels */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500/10 to-amber-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <div className="flex space-x-1">
                    <Mail className="h-4 w-4 text-amber-600" />
                    <Smartphone className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
                <div className="text-lg font-serif font-bold text-foreground mb-1">
                  Email + SMS
                </div>
                <p className="text-sm text-muted-foreground">multi-channel reach</p>
              </motion.div>

              {/* Timing */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-sage-500/10 to-sage-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-sage-600" />
                </div>
                <div className="text-lg font-serif font-bold text-foreground mb-1">
                  Just now
                </div>
                <p className="text-sm text-muted-foreground">campaign sent</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* What's Next */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-serif">
              <TrendingUp className="h-6 w-6 mr-3 text-primary" />
              📈 What happens next?
            </CardTitle>
            <CardDescription>
              Track your campaign's success and prepare for more customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-cream-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Your offers are being delivered</h4>
                  <p className="text-sm text-muted-foreground">
                    Diners in {campaignData.city} are receiving your irresistible offer via email and SMS.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Expect responses within 24-48 hours</h4>
                  <p className="text-sm text-muted-foreground">
                    Most responses happen quickly - prepare your team for increased reservations!
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-sage-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-sage-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Track your results</h4>
                  <p className="text-sm text-muted-foreground">
                    Check your campaign analytics to see engagement rates and plan your next offer.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          onClick={() => navigate('/dashboard/campaigns')}
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 shadow-warm"
          size="lg"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          View Campaign Analytics
        </Button>
        
        <Button
          onClick={() => navigate('/dashboard/campaigns/new')}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
          size="lg"
        >
          Create Another Campaign
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </motion.div>

      {/* Success Tip */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-center bg-gradient-to-r from-primary/5 to-sage/5 p-6 rounded-2xl"
      >
        <h3 className="font-serif font-bold text-lg text-foreground mb-2">
          🎯 Pro Tip for Restaurant Success
        </h3>
        <p className="text-muted-foreground">
          Most successful restaurants send 2-3 targeted campaigns per month. 
          Keep your customers engaged with fresh offers and seasonal specials!
        </p>
      </motion.div>
    </div>
  )
}
