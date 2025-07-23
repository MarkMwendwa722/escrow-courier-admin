import { useState } from 'react'
import { Package, Plus, Search, Filter, Eye, Edit, Trash2, MapPin, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'

const Parcels = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock data
  const parcels = [
    {
      id: 'EC001',
      sender: 'Mary Makuu',
      senderAddress: 'Kimathi Street, Nairobi CBD',
      recipient: 'Jason Muriithi',
      recipientAddress: 'Westlands Square, Nairobi',
      status: 'in-transit',
      agent: 'Mike Muli',
      weight: '2.5 kg',
      value: 'KSh 15,000',
      createdAt: '2024-01-15',
      estimatedDelivery: '2024-01-18',
      deliveredAt: null
    },
    {
      id: 'EC002',
      sender: 'Alice Mwenda',
      senderAddress: 'Moi Avenue, Mombasa',
      recipient: 'Bob Mwangi',
      recipientAddress: 'Nyali Bridge, Mombasa',
      status: 'delivered',
      agent: 'Sarah Wanjiku',
      weight: '1.2 kg',
      value: 'KSh 8,500',
      createdAt: '2024-01-14',
      estimatedDelivery: '2024-01-17',
      deliveredAt: '2024-01-17 14:30'
    },
    {
      id: 'EC003',
      sender: 'Carol Wainaina',
      senderAddress: 'Oginga Odinga Street, Kisumu',
      recipient: 'David Lengalei',
      recipientAddress: 'Lake View Estate, Nakuru',
      status: 'pending',
      agent: 'Tom Kipkorir',
      weight: '3.8 kg',
      value: 'KSh 22,000',
      createdAt: '2024-01-16',
      estimatedDelivery: '2024-01-20',
      deliveredAt: null
    },
    {
      id: 'EC004',
      sender: 'Eva Nyambura',
      senderAddress: 'Kenyatta Avenue, Eldoret',
      recipient: 'Frank Mwangangi',
      recipientAddress: 'Langas Estate, Eldoret',
      status: 'in-transit',
      agent: 'Grace Nyokabi',
      weight: '0.8 kg',
      value: 'KSh 4,500',
      createdAt: '2024-01-15',
      estimatedDelivery: '2024-01-19',
      deliveredAt: null
    },
    {
      id: 'EC005',
      sender: 'Grace Wanjiru',
      senderAddress: 'Uhuru Highway, Nairobi',
      recipient: 'Henry Wanyama',
      recipientAddress: 'Karen Shopping Centre, Nairobi',
      status: 'delivered',
      agent: 'James Ochieng',
      weight: '1.5 kg',
      value: 'KSh 9,500',
      createdAt: '2024-01-13',
      estimatedDelivery: '2024-01-16',
      deliveredAt: '2024-01-16 10:45'
    },
    {
      id: 'EC006',
      sender: 'Samuel Kiprotich',
      senderAddress: 'Moi Teaching Hospital, Eldoret',
      recipient: 'Ruth Kamau',
      recipientAddress: 'Section 58, Nakuru',
      status: 'cancelled',
      agent: 'David Kamau',
      weight: '4.2 kg',
      value: 'KSh 28,000',
      createdAt: '2024-01-12',
      estimatedDelivery: '2024-01-15',
      deliveredAt: null
    }
  ]

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'in-transit':
        return <Truck className="w-4 h-4 text-blue-500" />
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Package className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Parcels Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track all parcel deliveries</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add New Parcel
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by parcel ID, sender, or recipient..."
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
              <option value="pending">Pending</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Package className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">{parcels.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Total Parcels</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Clock className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300">
            {parcels.filter(p => p.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Pending</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Truck className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
            {parcels.filter(p => p.status === 'in-transit').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">In Transit</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <CheckCircle className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">
            {parcels.filter(p => p.status === 'delivered').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Delivered</div>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-0 text-sm font-medium text-gray-600 dark:text-gray-400">Parcel</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">From</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">To</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Agent</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Weight</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Value</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Delivery Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredParcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="py-4 px-0">
                    <div className="flex items-center">
                      <Package className="w-8 h-8 text-primary-500 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{parcel.id}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Created: {parcel.createdAt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{parcel.sender}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{parcel.senderAddress}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{parcel.recipient}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{parcel.recipientAddress}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`status-badge ${parcel.status} flex items-center`}>
                      <span className="mr-1">{getStatusIcon(parcel.status)}</span>
                      {parcel.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{parcel.agent}</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{parcel.weight}</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{parcel.value}</td>
                  <td className="py-4 px-4">
                    {parcel.deliveredAt ? (
                      <div>
                        <div className="text-sm font-medium text-green-700 dark:text-green-400">
                          {new Date(parcel.deliveredAt).toLocaleDateString('en-KE')}
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-500">
                          {new Date(parcel.deliveredAt).toLocaleTimeString('en-KE', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 dark:text-gray-500">
                        {parcel.status === 'delivered' ? 'Not recorded' : 'Pending'}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                        <MapPin className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {filteredParcels.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No parcels found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first parcel.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Parcels
