import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Tag,
  UserCheck,
  X
} from 'lucide-react'

interface Diner {
  id: string
  name: string
  email: string
  phone: string | null
  city: string
  state: string
  interests: string[]
}

interface Filters {
  name: string
  email: string
  phone: string
  city: string
  state: string
  interests: string[]
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const COMMON_INTERESTS = [
  'Italian', 'Chinese', 'Mexican', 'Japanese', 'Thai', 'Indian', 'American',
  'Fine Dining', 'Casual', 'Fast Food', 'Vegetarian', 'Healthy',
  'Date Night', 'Family Friendly', 'Business Dining', 'Takeout',
  'Pizza', 'BBQ', 'Seafood', 'Steakhouse', 'Brunch', 'Coffee'
]

export const FindDiners: React.FC = () => {
  const navigate = useNavigate()
  const [diners, setDiners] = useState<Diner[]>([])
  const [filteredDiners, setFilteredDiners] = useState<Diner[]>([])
  const [selectedDiners, setSelectedDiners] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  
  const [filters, setFilters] = useState<Filters>({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    interests: []
  })

  useEffect(() => {
    fetchDiners()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [diners, filters])

  const fetchDiners = async () => {
    try {
      const { data, error } = await supabase
        .from('diners')
        .select('*')
        .order('name')

      if (error) throw error
      setDiners(data || [])
    } catch (error) {
      console.error('Error fetching diners:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = diners

    if (filters.name) {
      filtered = filtered.filter(diner => 
        diner.name.toLowerCase().includes(filters.name.toLowerCase())
      )
    }

    if (filters.email) {
      filtered = filtered.filter(diner => 
        diner.email.toLowerCase().includes(filters.email.toLowerCase())
      )
    }

    if (filters.phone) {
      filtered = filtered.filter(diner => 
        diner.phone?.includes(filters.phone)
      )
    }

    if (filters.city) {
      filtered = filtered.filter(diner => 
        diner.city.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.state) {
      filtered = filtered.filter(diner => 
        diner.state === filters.state
      )
    }

    if (filters.interests.length > 0) {
      filtered = filtered.filter(diner => 
        filters.interests.some(interest => diner.interests.includes(interest))
      )
    }

    setFilteredDiners(filtered)
  }

  const handleFilterChange = (key: keyof Filters, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleInterestFilter = (interest: string) => {
    const currentInterests = filters.interests
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]
    
    handleFilterChange('interests', newInterests)
  }

  const clearFilters = () => {
    setFilters({
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      interests: []
    })
  }

  const toggleDinerSelection = (dinerId: string) => {
    setSelectedDiners(prev => 
      prev.includes(dinerId) 
        ? prev.filter(id => id !== dinerId)
        : [...prev, dinerId]
    )
  }

  const selectAllFiltered = () => {
    const filteredIds = filteredDiners.map(diner => diner.id)
    setSelectedDiners(filteredIds)
  }

  const clearSelection = () => {
    setSelectedDiners([])
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
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Diners</p>
                <p className="text-2xl font-bold">{diners.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Filtered Results</p>
                <p className="text-2xl font-bold">{filteredDiners.length}</p>
              </div>
              <Search className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Selected</p>
                <p className="text-2xl font-bold">{selectedDiners.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-center">
            <Button 
              onClick={() => navigate('/dashboard/campaigns/new', { 
                state: { selectedDiners } 
              })}
              disabled={selectedDiners.length === 0}
              className="w-full"
            >
              Create Campaign ({selectedDiners.length})
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Find Diners
              </CardTitle>
              <CardDescription>
                Search and filter diners to create targeted marketing campaigns
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Basic Search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input
                  placeholder="Search by name..."
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  placeholder="Search by email..."
                  value={filters.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
                />
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <Input
                      placeholder="Search by phone..."
                      value={filters.phone}
                      onChange={(e) => handleFilterChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <Input
                      placeholder="Search by city..."
                      value={filters.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      value={filters.state}
                      onChange={(e) => handleFilterChange('state', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">All States</option>
                      {US_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Interests Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_INTERESTS.map(interest => (
                      <button
                        key={interest}
                        onClick={() => toggleInterestFilter(interest)}
                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                          filters.interests.includes(interest)
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  {filters.interests.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-600">Selected interests:</span>
                      {filters.interests.map(interest => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-primary text-white rounded text-sm flex items-center gap-1"
                        >
                          {interest}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => toggleInterestFilter(interest)}
                          />
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selection Actions */}
      {filteredDiners.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={selectAllFiltered}
              disabled={filteredDiners.length === selectedDiners.length}
            >
              Select All ({filteredDiners.length})
            </Button>
            {selectedDiners.length > 0 && (
              <Button variant="outline" onClick={clearSelection}>
                Clear Selection
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {selectedDiners.length} of {filteredDiners.length} diners selected
          </p>
        </div>
      )}

      {/* Diners List */}
      <div className="grid gap-4">
        {filteredDiners.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No diners found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria to find more diners.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredDiners.map(diner => (
            <Card
              key={diner.id}
              className={`cursor-pointer transition-colors ${
                selectedDiners.includes(diner.id) 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => toggleDinerSelection(diner.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedDiners.includes(diner.id)
                        ? 'bg-primary border-primary'
                        : 'border-gray-300'
                    }`}>
                      {selectedDiners.includes(diner.id) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{diner.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {diner.email}
                        </div>
                        {diner.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {diner.phone}
                          </div>
                        )}
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {diner.city}, {diner.state}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex flex-wrap gap-1 justify-end">
                      {diner.interests.slice(0, 3).map(interest => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {interest}
                        </span>
                      ))}
                      {diner.interests.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{diner.interests.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
