import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { isDemoMode, getDemoCampaigns, getDemoStats } from '../../lib/demoData'
import { 
  BarChart3, 
  MessageSquare, 
  Send, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Mail,
  Smartphone,
  Calendar,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react'
import { format } from 'date-fns'

interface Campaign {
  id: string
  created_at: string
  name: string
  subject: string
  email_content: string
  sms_content: string | null
  target_count: number
  status: string
  sent_at: string | null
}

interface CampaignStats {
  totalCampaigns: number
  draftCampaigns: number
  sentCampaigns: number
  totalReach: number
}

export const PastCampaigns: React.FC = () => {
  const { user } = useAuth()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [stats, setStats] = useState<CampaignStats>({
    totalCampaigns: 0,
    draftCampaigns: 0,
    sentCampaigns: 0,
    totalReach: 0
  })
  const [loading, setLoading] = useState(true)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [sendingCampaign, setSendingCampaign] = useState<string | null>(null)

  useEffect(() => {
    fetchCampaigns()
  }, [user])

  const fetchCampaigns = async () => {
    if (!user) return

    try {
      if (isDemoMode()) {
        // Use demo data
        const demoData = getDemoCampaigns()
        setCampaigns(demoData)
        setStats(getDemoStats())
      } else {
        // First, get the restaurant
        const { data: restaurant, error: restaurantError } = await supabase
          .from('restaurants')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (restaurantError) {
          console.error('No restaurant found:', restaurantError)
          setLoading(false)
          return
        }

        // Then fetch campaigns
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .eq('restaurant_id', restaurant.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        setCampaigns(data || [])

        // Calculate stats
        const totalCampaigns = data?.length || 0
        const draftCampaigns = data?.filter(c => c.status === 'draft').length || 0
        const sentCampaigns = data?.filter(c => c.status === 'sent').length || 0
        const totalReach = data?.reduce((sum, c) => sum + (c.status === 'sent' ? c.target_count : 0), 0) || 0

        setStats({
          totalCampaigns,
          draftCampaigns,
          sentCampaigns,
          totalReach
        })
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendCampaign = async (campaign: Campaign) => {
    setSendingCampaign(campaign.id)

    try {
      // Simulate sending delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Update campaign status
      const { error } = await supabase
        .from('campaigns')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', campaign.id)

      if (error) throw error

      // Refresh campaigns
      fetchCampaigns()

    } catch (error) {
      console.error('Error sending campaign:', error)
    } finally {
      setSendingCampaign(null)
    }
  }

  const deleteCampaign = async (campaignId: string) => {
    if (!window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', campaignId)

      if (error) throw error

      // Refresh campaigns
      fetchCampaigns()

    } catch (error) {
      console.error('Error deleting campaign:', error)
    }
  }

  const previewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setShowPreview(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">📈 Track Your Campaign Success</h1>
          <p className="text-muted-foreground mt-2">
            See how your marketing efforts are bringing more customers to your tables
          </p>
        </div>
        <Link to="/dashboard/campaigns/new">
          <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-warm" size="lg">
            <Plus className="h-5 w-5 mr-2" />
            ✨ Create New Campaign
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-warm transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">📊 Total Campaigns</p>
                <p className="text-3xl font-serif font-bold text-foreground">{stats.totalCampaigns}</p>
              </div>
              <BarChart3 className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 hover:shadow-warm transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">📋 Ready to Send</p>
                <p className="text-3xl font-serif font-bold text-foreground">{stats.draftCampaigns}</p>
              </div>
              <Edit className="h-10 w-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-sage-500/10 to-sage-500/5 border-sage-500/20 hover:shadow-warm transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">🚀 Offers Sent</p>
                <p className="text-3xl font-serif font-bold text-foreground">{stats.sentCampaigns}</p>
              </div>
              <Send className="h-10 w-10 text-sage-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-terracotta-500/10 to-terracotta-500/5 border-terracotta-500/20 hover:shadow-warm transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">🍽️ Diners Reached</p>
                <p className="text-3xl font-serif font-bold text-foreground">{stats.totalReach.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-terracotta-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-serif">🏆 Your Marketing Campaigns</CardTitle>
          <CardDescription className="text-base">
            Manage your offers and see how they're bringing more customers to your restaurant
          </CardDescription>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-primary/40 mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-bold text-foreground mb-3">You haven't sent any offers yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try creating your first irresistible deal to bring more hungry customers to your restaurant!
              </p>
              <Link to="/dashboard/campaigns/new">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-warm" size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  ✨ Create My First Campaign
                </Button>
              </Link>
              <p className="text-sm text-sage-600 mt-4">
                💡 Most restaurants see results within 24-48 hours!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map(campaign => (
                <div
                  key={campaign.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'sent'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {campaign.status === 'sent' ? 'Sent' : 'Draft'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Created {format(new Date(campaign.created_at), 'MMM d, yyyy')}
                        </div>
                        
                        {campaign.sent_at && (
                          <div className="flex items-center">
                            <Send className="h-4 w-4 mr-1" />
                            Sent {format(new Date(campaign.sent_at), 'MMM d, yyyy')}
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {campaign.target_count} recipients
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          {campaign.sms_content && <Smartphone className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => previewCampaign(campaign)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>

                      {campaign.status === 'draft' && (
                        <Button
                          size="sm"
                          onClick={() => sendCampaign(campaign)}
                          disabled={sendingCampaign === campaign.id}
                        >
                          {sendingCampaign === campaign.id ? (
                            <>
                              <Clock className="h-4 w-4 mr-1 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-1" />
                              Send Now
                            </>
                          )}
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCampaign(campaign.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Campaign Preview Modal */}
      {showPreview && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Campaign Preview</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                >
                  Close
                </Button>
              </div>

              <div className="space-y-6">
                {/* Campaign Info */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">{selectedCampaign.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedCampaign.status === 'sent'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {selectedCampaign.status === 'sent' ? 'Sent' : 'Draft'}
                    </span>
                    <span>{selectedCampaign.target_count} recipients</span>
                  </div>
                </div>

                {/* Email Preview */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Campaign
                  </h4>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="mb-3">
                      <strong>Subject:</strong> {selectedCampaign.subject}
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <pre className="whitespace-pre-wrap font-sans text-sm">
                        {selectedCampaign.email_content}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* SMS Preview */}
                {selectedCampaign.sms_content && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      SMS Campaign
                    </h4>
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="bg-white p-3 rounded border text-sm max-w-xs">
                        {selectedCampaign.sms_content}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {selectedCampaign.sms_content.length}/160 characters
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  {selectedCampaign.status === 'draft' && (
                    <Button
                      onClick={() => {
                        sendCampaign(selectedCampaign)
                        setShowPreview(false)
                      }}
                      disabled={sendingCampaign === selectedCampaign.id}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Campaign
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
