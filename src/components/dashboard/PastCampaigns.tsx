import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
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
  status: 'draft' | 'sent'
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
          <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-600">
            View and manage your marketing campaigns
          </p>
        </div>
        <Link to="/dashboard/campaigns/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold">{stats.totalCampaigns}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft Campaigns</p>
                <p className="text-2xl font-bold">{stats.draftCampaigns}</p>
              </div>
              <Edit className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sent Campaigns</p>
                <p className="text-2xl font-bold">{stats.sentCampaigns}</p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold">{stats.totalReach}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Campaigns</CardTitle>
          <CardDescription>
            Manage your marketing campaigns and track their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first marketing campaign to start attracting more diners.
              </p>
              <Link to="/dashboard/campaigns/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Campaign
                </Button>
              </Link>
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
