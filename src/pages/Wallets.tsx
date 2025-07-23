import { useState } from 'react'
import { 
  Wallet, 
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  Download,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  Banknote
} from 'lucide-react'

interface WalletBalance {
  id: string
  userId: string
  userType: 'agent' | 'vendor'
  name: string
  email: string
  currentBalance: number
  pendingBalance: number
  totalEarnings: number
  lastTransaction: string
  payoutMethod: 'mpesa' | 'bank' | 'cash'
  phoneNumber?: string
  bankAccount?: string
  status: 'active' | 'suspended' | 'frozen'
}

interface PayoutRequest {
  id: string
  userId: string
  userName: string
  userType: 'agent' | 'vendor'
  amount: number
  requestDate: string
  payoutMethod: 'mpesa' | 'bank'
  status: 'pending' | 'approved' | 'paid' | 'rejected'
  phoneNumber?: string
  bankDetails?: string
  reason?: string
}

interface Transaction {
  id: string
  userId: string
  userName: string
  type: 'earning' | 'payout' | 'refund' | 'fee' | 'bonus'
  amount: number
  description: string
  date: string
  status: 'completed' | 'pending' | 'failed'
  reference: string
}

const Wallets = () => {
  const [activeTab, setActiveTab] = useState<'balances' | 'payouts' | 'transactions'>('balances')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock data for wallet balances
  const walletBalances: WalletBalance[] = [
    {
      id: 'WB001',
      userId: 'AG001',
      userType: 'agent',
      name: 'Mike Muli',
      email: 'mike@escrowcourier.co.ke',
      currentBalance: 15750,
      pendingBalance: 4200,
      totalEarnings: 89500,
      lastTransaction: '2024-01-20',
      payoutMethod: 'mpesa',
      phoneNumber: '+254 720 123 456',
      status: 'active'
    },
    {
      id: 'WB002',
      userId: 'AG002',
      userType: 'agent',
      name: 'Sarah Wanjiku',
      email: 'sarah@escrowcourier.co.ke',
      currentBalance: 12300,
      pendingBalance: 3800,
      totalEarnings: 76200,
      lastTransaction: '2024-01-19',
      payoutMethod: 'bank',
      bankAccount: 'KCB - ****1234',
      status: 'active'
    },
    {
      id: 'WB003',
      userId: 'AG003',
      userType: 'agent',
      name: 'Tom Kipkorir',
      email: 'tom@escrowcourier.co.ke',
      currentBalance: 22100,
      pendingBalance: 5600,
      totalEarnings: 125800,
      lastTransaction: '2024-01-21',
      payoutMethod: 'mpesa',
      phoneNumber: '+254 721 456 789',
      status: 'active'
    },
    {
      id: 'WB004',
      userId: 'VD001',
      userType: 'vendor',
      name: 'Nairobi Electronics Hub',
      email: 'peter@nairobielectronics.co.ke',
      currentBalance: 45600,
      pendingBalance: 12000,
      totalEarnings: 0,
      lastTransaction: '2024-01-18',
      payoutMethod: 'mpesa',
      phoneNumber: '+254 720 123 456',
      status: 'active'
    },
    {
      id: 'WB005',
      userId: 'VD002',
      userType: 'vendor',
      name: 'Mombasa Fashion Store',
      email: 'amina@mombasafashion.co.ke',
      currentBalance: 28900,
      pendingBalance: 5500,
      totalEarnings: 0,
      lastTransaction: '2024-01-17',
      payoutMethod: 'bank',
      bankAccount: 'Equity - ****5678',
      status: 'active'
    },
    {
      id: 'WB006',
      userId: 'VD003',
      userType: 'vendor',
      name: 'Kisumu Bookstore',
      email: 'john@kisumubooks.co.ke',
      currentBalance: 67800,
      pendingBalance: 15200,
      totalEarnings: 0,
      lastTransaction: '2024-01-20',
      payoutMethod: 'bank',
      bankAccount: 'KCB - ****2345',
      status: 'active'
    }
  ]

  // Mock data for payout requests
  const payoutRequests: PayoutRequest[] = [
    {
      id: 'PO001',
      userId: 'AG001',
      userName: 'Mike Muli',
      userType: 'agent',
      amount: 15000,
      requestDate: '2024-01-20',
      payoutMethod: 'mpesa',
      status: 'pending',
      phoneNumber: '+254 720 123 456'
    },
    {
      id: 'PO002',
      userId: 'AG003',
      userName: 'Tom Kipkorir',
      userType: 'agent',
      amount: 8500,
      requestDate: '2024-01-19',
      payoutMethod: 'bank',
      status: 'approved',
      bankDetails: 'KCB Bank - Account: ****1234'
    },
    {
      id: 'PO003',
      userId: 'VD001',
      userName: 'Nairobi Electronics Hub',
      userType: 'vendor',
      amount: 25000,
      requestDate: '2024-01-18',
      payoutMethod: 'mpesa',
      status: 'paid',
      phoneNumber: '+254 720 123 456'
    },
    {
      id: 'PO004',
      userId: 'VD003',
      userName: 'Kisumu Bookstore',
      userType: 'vendor',
      amount: 45000,
      requestDate: '2024-01-20',
      payoutMethod: 'bank',
      status: 'approved',
      bankDetails: 'KCB Bank - Account: ****2345'
    },
    {
      id: 'PO005',
      userId: 'AG002',
      userName: 'Sarah Wanjiku',
      userType: 'agent',
      amount: 9800,
      requestDate: '2024-01-18',
      payoutMethod: 'bank',
      status: 'rejected',
      bankDetails: 'Equity Bank - Account: ****9876',
      reason: 'Insufficient balance verification'
    },
    {
      id: 'PO006',
      userId: 'VD002',
      userName: 'Mombasa Fashion Store',
      userType: 'vendor',
      amount: 18500,
      requestDate: '2024-01-20',
      payoutMethod: 'bank',
      status: 'paid',
      bankDetails: 'Equity Bank - Account: ****5678'
    }
  ]

  // Mock data for transactions
  const transactions: Transaction[] = [
    {
      id: 'TX001',
      userId: 'AG001',
      userName: 'Mike Muli',
      type: 'earning',
      amount: 450,
      description: 'Delivery commission - EC001',
      date: '2024-01-20',
      status: 'completed',
      reference: 'EC001-DEL'
    },
    {
      id: 'TX002',
      userId: 'AG002',
      userName: 'Sarah Wanjiku',
      type: 'payout',
      amount: -12000,
      description: 'M-Pesa payout',
      date: '2024-01-19',
      status: 'completed',
      reference: 'PO-2024-002'
    },
    {
      id: 'TX003',
      userId: 'VD001',
      userName: 'Nairobi Electronics Hub',
      type: 'fee',
      amount: -350,
      description: 'Platform fee - EC003',
      date: '2024-01-18',
      status: 'completed',
      reference: 'EC003-FEE'
    },
    {
      id: 'TX004',
      userId: 'AG003',
      userName: 'Tom Kipkorir',
      type: 'earning',
      amount: 625,
      description: 'Express delivery commission - EC004',
      date: '2024-01-21',
      status: 'completed',
      reference: 'EC004-DEL'
    },
    {
      id: 'TX005',
      userId: 'VD002',
      userName: 'Mombasa Fashion Store',
      type: 'payout',
      amount: -18500,
      description: 'Bank transfer payout',
      date: '2024-01-20',
      status: 'completed',
      reference: 'PO-2024-006'
    },
    {
      id: 'TX006',
      userId: 'VD003',
      userName: 'Kisumu Bookstore',
      type: 'refund',
      amount: 750,
      description: 'Cancelled order refund - EC006',
      date: '2024-01-20',
      status: 'completed',
      reference: 'EC006-REF'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full"
    switch (status) {
      case 'active': return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`
      case 'pending': return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`
      case 'approved': return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`
      case 'paid': return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`
      case 'rejected': return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`
      case 'suspended': return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`
      case 'frozen': return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`
      case 'completed': return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`
      case 'failed': return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`
      default: return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning':
      case 'bonus':
        return <ArrowUpRight className="w-4 h-4 text-green-500" />
      case 'payout':
      case 'fee':
        return <ArrowDownLeft className="w-4 h-4 text-red-500" />
      case 'refund':
        return <ArrowUpRight className="w-4 h-4 text-blue-500" />
      default:
        return <DollarSign className="w-4 h-4 text-gray-500" />
    }
  }

  const handleApprovePayout = (payoutId: string) => {
    console.log(`Approving payout: ${payoutId}`)
  }

  const handleRejectPayout = (payoutId: string) => {
    console.log(`Rejecting payout: ${payoutId}`)
  }

  const totalPlatformBalance = walletBalances.reduce((sum, wallet) => sum + wallet.currentBalance, 0)
  const totalPendingPayouts = payoutRequests
    .filter(req => req.status === 'pending')
    .reduce((sum, req) => sum + req.amount, 0)
  const totalPaidToday = transactions
    .filter(tx => tx.type === 'payout' && tx.status === 'completed' && tx.date === '2024-01-20')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Wallets & Payouts</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage financial balances and payment processing</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Wallet className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">{formatCurrency(totalPlatformBalance)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Total Platform Balance</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Clock className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300">{formatCurrency(totalPendingPayouts)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Pending Payouts</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <TrendingUp className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">{formatCurrency(totalPaidToday)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Paid Today</div>
        </div>
        <div className="card text-center group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex justify-center mb-2">
            <Users className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-2xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">{walletBalances.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Active Wallets</div>
        </div>
      </div>

      <div className="card">
        <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('balances')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'balances'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Wallet Balances
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'payouts'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Payout Requests
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'transactions'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Transaction History
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-field pl-10 pr-8"
            >
              <option value="all">All Types</option>
              <option value="agent">Agents</option>
              <option value="vendor">Vendors</option>
            </select>
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field pr-8"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {activeTab === 'balances' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pending</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Earnings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payout Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {walletBalances.map((wallet) => (
                  <tr key={wallet.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{wallet.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{wallet.email}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{wallet.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {wallet.userType === 'agent' ? (
                          <Users className="w-4 h-4 text-blue-500 mr-1" />
                        ) : (
                          <Building2 className="w-4 h-4 text-purple-500 mr-1" />
                        )}
                        <span className="text-sm text-gray-900 dark:text-gray-100 capitalize">{wallet.userType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(wallet.currentBalance)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(wallet.pendingBalance)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {wallet.userType === 'agent' ? formatCurrency(wallet.totalEarnings) : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                        {wallet.payoutMethod === 'mpesa' ? (
                          <>
                            <Smartphone className="w-4 h-4 text-green-500 mr-1" />
                            <span>M-Pesa</span>
                          </>
                        ) : (
                          <>
                            <Banknote className="w-4 h-4 text-blue-500 mr-1" />
                            <span>Bank</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(wallet.status)}>
                        {wallet.status.charAt(0).toUpperCase() + wallet.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payouts' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Request Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {payoutRequests.map((payout) => (
                  <tr key={payout.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{payout.userName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          {payout.userType === 'agent' ? (
                            <Users className="w-3 h-3 mr-1" />
                          ) : (
                            <Building2 className="w-3 h-3 mr-1" />
                          )}
                          {payout.userType}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{payout.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(payout.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                        {payout.payoutMethod === 'mpesa' ? (
                          <>
                            <Smartphone className="w-4 h-4 text-green-500 mr-1" />
                            <div>
                              <div>M-Pesa</div>
                              <div className="text-xs text-gray-500">{payout.phoneNumber}</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <Banknote className="w-4 h-4 text-blue-500 mr-1" />
                            <div>
                              <div>Bank Transfer</div>
                              <div className="text-xs text-gray-500">{payout.bankDetails}</div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {payout.requestDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(payout.status)}>
                        {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        {payout.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApprovePayout(payout.id)}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRejectPayout(payout.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
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
      )}

      {activeTab === 'transactions' && (
        <div className="card overflow-hidden">
          <div className="flex justify-between items-center mb-4 px-6 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Transactions</h3>
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reference</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{transaction.description}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{transaction.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{transaction.userName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTransactionIcon(transaction.type)}
                        <span className="ml-2 text-sm text-gray-900 dark:text-gray-100 capitalize">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        transaction.amount > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.reference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Wallets
