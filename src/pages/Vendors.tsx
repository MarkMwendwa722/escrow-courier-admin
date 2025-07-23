import { useState } from 'react'
import { 
  Building2, 
  Phone, 
  Mail, 
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  UserCheck,
  UserX,
  Star,
  Package
} from 'lucide-react'

interface Vendor {
  id: string
  businessName: string
  ownerName: string
  email: string
  phone: string
  location: string
  businessType: string
  registrationDate: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  documentsSubmitted: boolean
  kycVerified: boolean
  totalParcels: number
  monthlyVolume: number
  rating: number
  licenseNumber: string
  address: string
}

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const vendors: Vendor[] = [
    {
      id: 'VD001',
      businessName: 'Nairobi Electronics Hub',
      ownerName: 'Peter Mwangi',
      email: 'peter@nairobielectronics.co.ke',
      phone: '+254 720 123 456',
      location: 'Nairobi, CBD',
      businessType: 'Electronics',
      registrationDate: '2024-01-15',
      status: 'pending',
      documentsSubmitted: true,
      kycVerified: false,
      totalParcels: 0,
      monthlyVolume: 0,
      rating: 0,
      licenseNumber: 'BL-001234',
      address: 'Tom Mboya Street, Nairobi'
    },
    {
      id: 'VD002', 
      businessName: 'Mombasa Fashion Store',
      ownerName: 'Amina Hassan',
      email: 'amina@mombasafashion.co.ke',
      phone: '+254 734 567 890',
      location: 'Mombasa, Nyali',
      businessType: 'Fashion & Clothing',
      registrationDate: '2023-11-20',
      status: 'approved',
      documentsSubmitted: true,
      kycVerified: true,
      totalParcels: 156,
      monthlyVolume: 32,
      rating: 4.7,
      licenseNumber: 'BL-005678',
      address: 'Nyali Centre, Mombasa'
    },
    {
      id: 'VD003',
      businessName: 'Kisumu Bookstore',
      ownerName: 'John Otieno',
      email: 'john@kisumubooks.co.ke', 
      phone: '+254 745 678 901',
      location: 'Kisumu, Milimani',
      businessType: 'Books & Stationery',
      registrationDate: '2023-12-10',
      status: 'rejected',
      documentsSubmitted: true,
      kycVerified: true,
      totalParcels: 89,
      monthlyVolume: 18,
      rating: 4.4,
      licenseNumber: 'BL-009876',
      address: 'Oginga Odinga Street, Kisumu'
    },
    {
      id: 'VD004',
      businessName: 'Eldoret Sports Center',
      ownerName: 'Samuel Kiprotich',
      email: 'samuel@eldoretsports.co.ke',
      phone: '+254 756 789 012',
      location: 'Eldoret, Uganda Road',
      businessType: 'Sports & Fitness',
      registrationDate: '2024-01-08',
      status: 'approved',
      documentsSubmitted: true,
      kycVerified: true,
      totalParcels: 67,
      monthlyVolume: 14,
      rating: 4.2,
      licenseNumber: 'BL-004321',
      address: 'Uganda Road, Eldoret'
    },
    {
      id: 'VD005',
      businessName: 'Nakuru Auto Parts',
      ownerName: 'Ruth Kamau',
      email: 'ruth@nakuruauto.co.ke',
      phone: '+254 723 456 789',
      location: 'Nakuru, Section 58',
      businessType: 'Automotive',
      registrationDate: '2023-10-15',
      status: 'approved',
      documentsSubmitted: true,
      kycVerified: true,
      totalParcels: 234,
      monthlyVolume: 45,
      rating: 4.8,
      licenseNumber: 'BL-007890',
      address: 'Section 58, Nakuru'
    },
    {
      id: 'VD006',
      businessName: 'Thika Hardware Store',
      ownerName: 'Joseph Mbugua',
      email: 'joseph@thikahardware.co.ke',
      phone: '+254 734 567 890',
      location: 'Thika, Kenyatta Highway',
      businessType: 'Hardware & Tools',
      registrationDate: '2024-01-12',
      status: 'suspended',
      documentsSubmitted: true,
      kycVerified: false,
      totalParcels: 23,
      monthlyVolume: 8,
      rating: 3.8,
      licenseNumber: 'BL-012345',
      address: 'Kenyatta Highway, Thika'
    }
  ]

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />
      case 'suspended': return <XCircle className="w-4 h-4 text-orange-500" />
      default: return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full"
    switch (status) {
      case 'approved': return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`
      case 'rejected': return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`
      case 'suspended': return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`
      default: return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`
    }
  }

  const handleApprove = (vendorId: string) => {
    console.log(`Approving vendor: ${vendorId}`)
  }

  const handleReject = (vendorId: string) => {
    console.log(`Rejecting vendor: ${vendorId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Vendor Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Review and manage vendor registrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Clock className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300">
            {vendors.filter(v => v.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Pending Review</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <CheckCircle className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">
            {vendors.filter(v => v.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Approved</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <XCircle className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-red-600 group-hover:text-red-700 transition-colors duration-300">
            {vendors.filter(v => v.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Rejected</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Building2 className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
            {vendors.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Total Vendors</div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search vendors by name, business, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field pl-10 pr-8"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Business Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Verification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{vendor.businessName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{vendor.businessType}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{vendor.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{vendor.ownerName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{vendor.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-gray-100 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {vendor.email}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <Phone className="w-3 h-3 mr-1" />
                        {vendor.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(vendor.status)}
                      <span className={getStatusBadge(vendor.status)}>
                        {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-xs">
                        {vendor.documentsSubmitted ? (
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-500 mr-1" />
                        )}
                        <span className="text-gray-600 dark:text-gray-400">Documents</span>
                      </div>
                      <div className="flex items-center text-xs">
                        {vendor.kycVerified ? (
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-500 mr-1" />
                        )}
                        <span className="text-gray-600 dark:text-gray-400">KYC</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vendor.status === 'approved' ? (
                      <div>
                        <div className="text-sm text-gray-900 dark:text-gray-100 flex items-center">
                          <Package className="w-3 h-3 mr-1" />
                          {vendor.totalParcels} parcels
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <Star className="w-3 h-3 mr-1 text-yellow-400" />
                          {vendor.rating}/5.0
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      {vendor.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(vendor.id)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleReject(vendor.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Vendors