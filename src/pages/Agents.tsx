import { useState } from 'react'
import { Users, Plus, Search, Filter, Phone, Mail, MapPin, Star, Package, TrendingUp, CheckCircle } from 'lucide-react'

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock data
  const agents = [
    {
      id: 'AG001',
      name: 'Mike Muli',
      email: 'mike.muli@escrowcourier.com',
      phone: '+254 712 345 678',
      status: 'active',
      location: 'Nairobi, Kenya',
      rating: 4.9,
      totalDeliveries: 245,
      monthlyDeliveries: 45,
      revenue: 'KSh 122,500',
      joinDate: '2023-06-15',
      avatar: 'MM',
      zones: ['CBD', 'Westlands']
    },
    {
      id: 'AG002',
      name: 'Sarah Wanjiku',
      email: 'sarah.wanjiku@escrowcourier.com',
      phone: '+254 723 456 789',
      status: 'active',
      location: 'Mombasa, Kenya',
      rating: 4.8,
      totalDeliveries: 198,
      monthlyDeliveries: 42,
      revenue: 'KSh 108,900',
      joinDate: '2023-08-20',
      avatar: 'SW',
      zones: ['Nyali', 'Mombasa Island']
    },
    {
      id: 'AG003',
      name: 'Tom Kipkorir',
      email: 'tom.kipkorir@escrowcourier.com',
      phone: '+254 734 567 890',
      status: 'active',
      location: 'Kisumu, Kenya',
      rating: 4.7,
      totalDeliveries: 156,
      monthlyDeliveries: 38,
      revenue: 'KSh 95,400',
      joinDate: '2023-09-10',
      avatar: 'TK',
      zones: ['Milimani', 'Kondele']
    },
    {
      id: 'AG004',
      name: 'Grace Nyokabi',
      email: 'grace.nyokabi@escrowcourier.com',
      phone: '+254 745 678 901',
      status: 'active',
      location: 'Nakuru, Kenya',
      rating: 4.6,
      totalDeliveries: 134,
      monthlyDeliveries: 35,
      revenue: 'KSh 87,500',
      joinDate: '2023-10-05',
      avatar: 'GN',
      zones: ['Section 58', 'Milimani']
    },
    {
      id: 'AG005',
      name: 'James Ochieng',
      email: 'james.ochieng@escrowcourier.com',
      phone: '+254 756 789 012',
      status: 'active',
      location: 'Eldoret, Kenya',
      rating: 4.5,
      totalDeliveries: 112,
      monthlyDeliveries: 28,
      revenue: 'KSh 72,800',
      joinDate: '2023-11-12',
      avatar: 'JO',
      zones: ['Pioneer', 'West Indies']
    },
    {
      id: 'AG006',
      name: 'Mary Wambui',
      email: 'mary.wambui@escrowcourier.com',
      phone: '+254 767 890 123',
      status: 'suspended',
      location: 'Thika, Kenya',
      rating: 4.2,
      totalDeliveries: 89,
      monthlyDeliveries: 15,
      revenue: 'KSh 45,200',
      joinDate: '2023-12-08',
      avatar: 'MW',
      zones: ['Thika Town', 'Makongeni']
    },
    {
      id: 'AG007',
      name: 'David Kamau',
      email: 'david.kamau@escrowcourier.com',
      phone: '+254 778 901 234',
      status: 'active',
      location: 'Machakos, Kenya',
      rating: 4.8,
      totalDeliveries: 203,
      monthlyDeliveries: 48,
      revenue: 'KSh 118,600',
      joinDate: '2023-07-22',
      avatar: 'DK',
      zones: ['Machakos Town', 'Syokimau']
    },
    {
      id: 'AG008',
      name: 'Caroline Chebet',
      email: 'caroline.chebet@escrowcourier.com',
      phone: '+254 701 234 567',
      status: 'active',
      location: 'Nyeri, Kenya',
      rating: 4.9,
      totalDeliveries: 289,
      monthlyDeliveries: 52,
      revenue: 'KSh 145,600',
      joinDate: '2023-05-18',
      avatar: 'CC',
      zones: ['Nyeri Town', 'Kimathi Way']
    },
    {
      id: 'AG009',
      name: 'Samuel Kiprotich',
      email: 'samuel.kiprotich@escrowcourier.com',
      phone: '+254 712 345 890',
      status: 'inactive',
      location: 'Kericho, Kenya',
      rating: 4.3,
      totalDeliveries: 93,
      monthlyDeliveries: 12,
      revenue: 'KSh 38,700',
      joinDate: '2023-11-25',
      avatar: 'SK',
      zones: ['Kericho Town', 'Kipchoge']
    }
  ]

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Agent Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage delivery agents and track their performance</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add New Agent
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Users className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">{agents.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Total Agents</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <CheckCircle className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">
            {agents.filter(a => a.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Active</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Package className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
            {agents.reduce((sum, agent) => sum + agent.monthlyDeliveries, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Monthly Deliveries</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">⭐</div>
          <div className="text-2xl font-bold text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300">
            {(agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Avg. Rating</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="card group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-medium">{agent.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{agent.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{agent.id}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                {agent.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="truncate">{agent.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{agent.location}</span>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(agent.rating)}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{agent.rating}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({agent.totalDeliveries} reviews)</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Package className="w-4 h-4 text-primary-500 mr-1" />
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{agent.monthlyDeliveries}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">This Month</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{agent.revenue}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Revenue</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Zones:</div>
              <div className="flex flex-wrap gap-1">
                {agent.zones.map((zone) => (
                  <span key={zone} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                    {zone}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 btn-secondary text-xs py-2">
                View Details
              </button>
              <button className="flex-1 btn-primary text-xs py-2">
                Assign Parcel
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="card text-center py-12">
          <Users className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No agents found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first delivery agent.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default Agents
