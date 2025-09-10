import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { 
  MessageSquare, 
  Wand2, 
  Mail, 
  Smartphone, 
  Save, 
  Send,
  Users,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react'
import OpenAI from 'openai'

interface Restaurant {
  id: string
  name: string
  cuisine_type: string
  city: string
  state: string
  description: string | null
}

interface CampaignData {
  name: string
  subject: string
  email_content: string
  sms_content: string
  target_count: number
}

const CAMPAIGN_TEMPLATES = [
  {
    name: 'Happy Hour Special',
    emoji: '🍸',
    description: 'Drive traffic during slower afternoon/evening hours',
    prompt: 'happy hour deals with discounted drinks and appetizers',
    category: 'promotion'
  },
  {
    name: 'Holiday Special',
    emoji: '🎉',
    description: 'Celebrate holidays with themed offers',
    prompt: 'holiday-themed menu specials and festive dining experience',
    category: 'seasonal'
  },
  {
    name: 'Loyalty Discount',
    emoji: '⭐',
    description: 'Reward your most loyal customers',
    prompt: 'exclusive loyalty program benefits and returning customer rewards',
    category: 'retention'
  },
  {
    name: 'Weekend Family Special',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Attract families for weekend dining',
    prompt: 'family-friendly weekend specials with kids menu discounts',
    category: 'family'
  },
  {
    name: 'Date Night Package',
    emoji: '❤️',
    description: 'Create romantic dining experiences for couples',
    prompt: 'romantic date night package with wine pairings and intimate setting',
    category: 'romance'
  },
  {
    name: 'Grand Opening',
    emoji: '🎆',
    description: 'Launch your restaurant with a bang',
    prompt: 'grand opening celebration with special introductory offers',
    category: 'launch'
  },
  {
    name: 'New Menu Launch',
    emoji: '🍽️',
    description: 'Showcase new seasonal dishes',
    prompt: 'exciting new menu items and chef-curated seasonal specials',
    category: 'menu'
  },
  {
    name: 'Business Lunch Deal',
    emoji: '💼',
    description: 'Target nearby office workers',
    prompt: 'quick and delicious business lunch options with express service',
    category: 'business'
  }
]

export const CreateCampaign: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [copied, setCopied] = useState<'email' | 'sms' | null>(null)
  
  const selectedDiners = location.state?.selectedDiners || []
  
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    subject: '',
    email_content: '',
    sms_content: '',
    target_count: selectedDiners.length
  })
  
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [customPrompt, setCustomPrompt] = useState('')

  useEffect(() => {
    fetchRestaurant()
  }, [user])

  const fetchRestaurant = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      setRestaurant(data)
    } catch (error) {
      console.error('Error fetching restaurant:', error)
      setError('Please set up your restaurant profile first.')
    } finally {
      setLoading(false)
    }
  }

  const generateContent = async () => {
    if (!restaurant) return

    setGenerating(true)
    setError('')

    try {
      // Check if OpenAI API key is available
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY
      
      if (!apiKey) {
        // Fallback to sample content if no API key
        generateSampleContent()
        return
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, this should be done server-side
      })

      const template = CAMPAIGN_TEMPLATES.find(t => t.name === selectedTemplate)
      const promptText = customPrompt || template?.prompt || 'special dining promotion'

      const systemPrompt = `You are a marketing expert for restaurants. Create compelling marketing content that drives customer action. 
      
      Restaurant Details:
      - Name: ${restaurant.name}
      - Cuisine: ${restaurant.cuisine_type}
      - Location: ${restaurant.city}, ${restaurant.state}
      - Description: ${restaurant.description || 'A great local restaurant'}
      
      Create content for: ${promptText}
      
      Make it engaging, specific to the restaurant, and include a clear call-to-action.`

      // Generate email content
      const emailResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Write a compelling email marketing message (200-300 words) with a catchy subject line. Format as JSON with 'subject' and 'content' fields.`
          }
        ],
        temperature: 0.8,
        max_tokens: 400
      })

      // Generate SMS content
      const smsResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Write a short SMS message (under 160 characters) that's punchy and drives immediate action.`
          }
        ],
        temperature: 0.8,
        max_tokens: 100
      })

      const emailContent = JSON.parse(emailResponse.choices[0].message.content || '{}')
      const smsContent = smsResponse.choices[0].message.content || ''

      setCampaignData(prev => ({
        ...prev,
        name: selectedTemplate || 'AI Generated Campaign',
        subject: emailContent.subject || 'Special Offer from ' + restaurant.name,
        email_content: emailContent.content || '',
        sms_content: smsContent
      }))

    } catch (error) {
      console.error('Error generating content:', error)
      // Fallback to sample content
      generateSampleContent()
    } finally {
      setGenerating(false)
    }
  }

  const generateSampleContent = () => {
    const template = CAMPAIGN_TEMPLATES.find(t => t.name === selectedTemplate)
    const campaignName = selectedTemplate || 'Special Promotion'
    
    setCampaignData(prev => ({
      ...prev,
      name: campaignName,
      subject: `🍽️ Exclusive ${campaignName} at ${restaurant?.name}!`,
      email_content: `Dear Food Lover,

We're excited to invite you to experience ${restaurant?.name}'s ${template?.prompt || 'special promotion'}!

Located in the heart of ${restaurant?.city}, our ${restaurant?.cuisine_type.toLowerCase()} restaurant is offering an exclusive deal just for our valued customers.

✨ What's included:
• Exceptional ${restaurant?.cuisine_type} cuisine
• Warm, welcoming atmosphere
• Special promotional pricing
• Memorable dining experience

This limited-time offer won't last long, so make your reservation today!

Call us or visit our restaurant in ${restaurant?.city}, ${restaurant?.state}.

We can't wait to serve you!

Best regards,
The ${restaurant?.name} Team

P.S. Don't forget to bring your friends and family!`,
      sms_content: `🍽️ ${restaurant?.name}: Special ${campaignName.toLowerCase()} now! Visit us in ${restaurant?.city} today. Limited time only! Reserve now!`
    }))
  }

  const saveCampaign = async () => {
    if (!restaurant || !campaignData.name || !campaignData.subject || !campaignData.email_content) {
      setError('Please fill in all required fields.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const { error } = await supabase
        .from('campaigns')
        .insert([{
          restaurant_id: restaurant.id,
          name: campaignData.name,
          subject: campaignData.subject,
          email_content: campaignData.email_content,
          sms_content: campaignData.sms_content || null,
          target_count: campaignData.target_count,
          status: 'draft'
        }])

      if (error) throw error
      
      // Navigate to confirmation page with campaign data
      navigate('/dashboard/campaigns/confirmation', {
        state: {
          name: campaignData.name,
          targetCount: campaignData.target_count,
          city: restaurant.city,
          state: restaurant.state,
          channels: ['email', 'sms']
        }
      })

    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const copyToClipboard = async (content: string, type: 'email' | 'sms') => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Restaurant Profile Required</h3>
          <p className="text-gray-600 mb-4">
            You need to set up your restaurant profile before creating campaigns.
          </p>
          <Button onClick={() => navigate('/dashboard/profile')}>
            Set Up Restaurant Profile
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">✨ Craft Irresistible Deals with AI</h1>
          <p className="text-muted-foreground mt-2">
            Create compelling offers that bring more customers to {restaurant.name}
          </p>
          <p className="text-sm text-sage-600 mt-1">
            💡 Don't worry - you can always edit and preview before sending!
          </p>
        </div>
        {selectedDiners.length > 0 && (
          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">
              {selectedDiners.length} diners selected
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {success}
        </div>
      )}

      {/* Campaign Templates */}
        <Card className="bg-gradient-to-br from-primary/5 via-background to-amber/5 border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-serif">
            <Wand2 className="h-6 w-6 mr-3 text-primary" />
            🤖 AI-Powered Offer Templates
          </CardTitle>
          <CardDescription className="text-base">
            Pick a proven template to instantly generate compelling offers that drive reservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Templates */}
            <div>
              <label className="block text-base font-semibold text-foreground mb-4">
                🎯 Choose Your Campaign Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CAMPAIGN_TEMPLATES.map(template => (
                  <motion.button
                    key={template.name}
                    onClick={() => setSelectedTemplate(template.name)}
                    className={`p-4 text-left border-2 rounded-2xl transition-all duration-200 ${
                      selectedTemplate === template.name
                        ? 'border-primary bg-primary/10 shadow-warm transform scale-105'
                        : 'border-cream-300 hover:border-primary/50 hover:bg-primary/5 hover:transform hover:scale-102'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-2">{template.emoji}</div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{template.name}</h3>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Prompt */}
            <div>
              <label className="block text-base font-semibold text-foreground mb-2">
                📝 Or Describe Your Own Campaign
              </label>
              <Input
                placeholder="e.g., Valentine's Day special with 20% off couples dinner and complimentary dessert..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="focus:border-primary focus:ring-primary text-base p-4"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Be specific about your offer, target audience, and what makes it special
              </p>
            </div>

            <Button
              onClick={generateContent}
              disabled={generating || (!selectedTemplate && !customPrompt)}
              className="w-full bg-gradient-to-r from-primary to-terracotta-500 hover:from-primary/90 hover:to-terracotta-500/90 text-white font-semibold py-4 text-lg shadow-warm"
              size="lg"
            >
              {generating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  🤖 AI is crafting your perfect offer...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-2" />
                  ✨ Generate My Irresistible Offer
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Campaign */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email Campaign
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name *
              </label>
              <Input
                value={campaignData.name}
                onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter campaign name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Subject *
              </label>
              <div className="flex gap-2">
                <Input
                  value={campaignData.subject}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(campaignData.subject, 'email')}
                >
                  {copied === 'email' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Content *
              </label>
              <textarea
                value={campaignData.email_content}
                onChange={(e) => setCampaignData(prev => ({ ...prev, email_content: e.target.value }))}
                rows={12}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Email content will be generated here..."
              />
            </div>
          </CardContent>
        </Card>

        {/* SMS Campaign */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              SMS Campaign
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Count
              </label>
              <Input
                type="number"
                value={campaignData.target_count}
                onChange={(e) => setCampaignData(prev => ({ ...prev, target_count: parseInt(e.target.value) || 0 }))}
                placeholder="Number of recipients"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMS Content (Optional)
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <textarea
                    value={campaignData.sms_content}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, sms_content: e.target.value }))}
                    rows={4}
                    maxLength={160}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="SMS content will be generated here..."
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(campaignData.sms_content, 'sms')}
                  >
                    {copied === 'sms' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  {campaignData.sms_content.length}/160 characters
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Preview</h4>
              <div className="bg-white p-3 rounded border text-sm">
                {campaignData.sms_content || 'SMS content will appear here...'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
        <Button 
          onClick={saveCampaign} 
          disabled={saving || !campaignData.name || !campaignData.subject || !campaignData.email_content}
          className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-warm"
          size="lg"
        >
          <Send className="h-5 w-5 mr-2" />
          {saving ? '🚀 Sending your irresistible offer...' : '🚀 Send Campaign Now'}
        </Button>
      </div>
    </div>
  )
}
