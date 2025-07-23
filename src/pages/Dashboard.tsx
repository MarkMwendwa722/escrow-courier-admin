import { Package, Users, TrendingUp, Clock, MapPin, Star } from 'lucide-react'

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Parcels',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Agents',
      value: '47',
      change: '+3%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-primary-500'
    },
    {
      title: 'Revenue',
      value: 'KSh 1,284,700',
      change: '+8%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Deliveries',
      value: '156',
      change: '-5%',
      changeType: 'negative' as const,
      icon: Clock,
      color: 'bg-yellow-500'
    }
  ]

  const recentParcels = [
    { id: 'EC001', sender: 'Mary Makuu', recipient: 'Jason Muriithi', status: 'in-transit', agent: 'Mike Muli' },
    { id: 'EC002', sender: 'Alice Mwenda', recipient: 'Bob Mwangi', status: 'delivered', agent: 'Sarah Davis' },
    { id: 'EC003', sender: 'Carol Wainaina', recipient: 'David Lengalei', status: 'pending', agent: 'Tom Kipkorir' },
    { id: 'EC004', sender: 'Eva Nyambura', recipient: 'Frank Mwangangi', status: 'in-transit', agent: 'Lisa Soita' },
    { id: 'EC005', sender: 'Grace Wanjiru', recipient: 'Henry Wanyama', status: 'delivered', agent: 'Mark Mwendwa' },
  ]

  const topAgents = [
    { name: 'Mike Muli', parcels: 45, rating: 4.9 },
    { name: 'Sarah Davis', parcels: 42, rating: 4.8 },
    { name: 'Tom Kipkorir', parcels: 38, rating: 4.7 },
    { name: 'Lisa Soita', parcels: 35, rating: 4.6 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your deliveries today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="card group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 mt-1 transition-colors duration-300">{stat.value}</p>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600 group-hover:text-green-700' 
                      : 'text-red-600 group-hover:text-red-700'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Parcels</h2>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
              View all
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-600 dark:text-gray-400">Parcel ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">From</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">To</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentParcels.map((parcel) => (
                  <tr key={parcel.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-0">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{parcel.id}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{parcel.sender}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{parcel.recipient}</td>
                    <td className="py-3 px-4">
                      <span className={`status-badge ${parcel.status}`}>
                        {parcel.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{parcel.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Agents</h2>
          
          <div className="space-y-4">
            {topAgents.map((agent, index) => (
              <div key={agent.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-700 dark:text-primary-300 text-sm font-medium">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{agent.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{agent.parcels} parcels</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 mr-1">{agent.rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">#{index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
            <Package className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">Add New Parcel</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new delivery order</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
            <Users className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">Add Agent</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Register a new delivery agent</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
            <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">Track Parcel</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monitor delivery progress</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
