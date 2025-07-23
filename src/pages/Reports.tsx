import { useState } from 'react'
import { 
  TrendingUp, 
  Package, 
  Users, 
  Calendar, 
  Download, 
  Filter, 
  Clock,
  BarChart3,
  Activity
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
)

const Reports = () => {
  const [dateRange, setDateRange] = useState('30')
  const [reportType, setReportType] = useState('overview')
  const [revenueFilter, setRevenueFilter] = useState('monthly')
  const [routeFilter, setRouteFilter] = useState('performance')
  const [agentFilter, setAgentFilter] = useState('top-performers')

  // Mock data for charts and reports
  const overviewStats = {
    totalRevenue: 12584000, // KSh 12.58 million
    totalParcels: 2847,
    totalAgents: 47,
    avgDeliveryTime: 2.3,
    revenueGrowth: 12.5,
    parcelGrowth: 8.3,
    agentGrowth: 15.2,
    deliveryTimeChange: -5.8
  }

  // Revenue Analysis Mock Data
  const revenueAnalysis = {
    thisMonth: {
      total: 1284700,
      growth: 12.5,
      breakdown: [
        { category: 'Standard Delivery', amount: 580200, percentage: 45.2 },
        { category: 'Express Delivery', amount: 385410, percentage: 30.0 },
        { category: 'Same Day Delivery', amount: 192705, percentage: 15.0 },
        { category: 'Bulk Orders', amount: 126375, percentage: 9.8 }
      ]
    },
    dailyRevenue: [
      { date: '2024-01-15', amount: 52000 },
      { date: '2024-01-16', amount: 48500 },
      { date: '2024-01-17', amount: 61200 },
      { date: '2024-01-18', amount: 55800 },
      { date: '2024-01-19', amount: 59400 },
      { date: '2024-01-20', amount: 67300 },
      { date: '2024-01-21', amount: 44600 }
    ],
    quarterlyTrend: [
      { quarter: 'Q1 2024', revenue: 3250000, growth: 8.5 },
      { quarter: 'Q2 2024', revenue: 3680000, growth: 13.2 },
      { quarter: 'Q3 2024', revenue: 3920000, growth: 6.5 },
      { quarter: 'Q4 2024', revenue: 4140000, growth: 5.6 }
    ],
    yearlyComparison: [
      { year: 2022, revenue: 11200000 },
      { year: 2023, revenue: 13800000 },
      { year: 2024, revenue: 15990000 }
    ]
  }

  // Route Analysis Mock Data
  const routeAnalysis = {
    topRoutes: [
      { 
        route: 'Nairobi → Mombasa', 
        parcels: 142, 
        avgTime: '8.2 hours', 
        revenue: 284000,
        efficiency: 92.5,
        distance: '485 km',
        fuelCost: 24500,
        profitMargin: 34.2
      },
      { 
        route: 'Nairobi → Kisumu', 
        parcels: 98, 
        avgTime: '6.5 hours', 
        revenue: 196000,
        efficiency: 88.7,
        distance: '342 km',
        fuelCost: 18200,
        profitMargin: 31.8
      },
      { 
        route: 'Nairobi → Nakuru', 
        parcels: 156, 
        avgTime: '2.8 hours', 
        revenue: 234000,
        efficiency: 95.2,
        distance: '164 km',
        fuelCost: 12800,
        profitMargin: 42.1
      },
      { 
        route: 'Mombasa → Malindi', 
        parcels: 73, 
        avgTime: '2.1 hours', 
        revenue: 109500,
        efficiency: 91.3,
        distance: '118 km',
        fuelCost: 8900,
        profitMargin: 38.7
      },
      { 
        route: 'Nairobi → Eldoret', 
        parcels: 85, 
        avgTime: '4.2 hours', 
        revenue: 170000,
        efficiency: 89.8,
        distance: '312 km',
        fuelCost: 19200,
        profitMargin: 28.9
      }
    ],
    routeMetrics: {
      totalActiveRoutes: 47,
      avgDeliveryTime: '4.8 hours',
      onTimeDeliveryRate: 91.2,
      fuelEfficiency: '12.5 km/l',
      totalDistance: '24,580 km',
      avgProfitMargin: 35.1
    },
    routeEfficiencyTrend: [
      { month: 'Jan', efficiency: 88.2 },
      { month: 'Feb', efficiency: 89.5 },
      { month: 'Mar', efficiency: 90.1 },
      { month: 'Apr', efficiency: 91.3 },
      { month: 'May', efficiency: 91.2 },
      { month: 'Jun', efficiency: 92.1 }
    ]
  }

  // Agent Performance Mock Data
  const agentPerformance = {
    topPerformers: [
      {
        id: 'AG001',
        name: 'Mike Muli',
        avatar: 'MM',
        monthlyStats: {
          parcelsDelivered: 142,
          revenue: 284000,
          avgRating: 4.9,
          onTimeRate: 96.5,
          completionRate: 98.2,
          customerSatisfaction: 97.8,
          efficiency: 94.2
        },
        weeklyTrend: [28, 32, 35, 29, 18],
        specialization: 'Express Delivery',
        joinDate: '2022-03-15',
        totalDeliveries: 1580,
        bestRoute: 'Nairobi → Mombasa'
      },
      {
        id: 'AG002',
        name: 'Sarah Davis',
        avatar: 'SD',
        monthlyStats: {
          parcelsDelivered: 128,
          revenue: 256000,
          avgRating: 4.8,
          onTimeRate: 94.2,
          completionRate: 97.8,
          customerSatisfaction: 96.5,
          efficiency: 92.1
        },
        weeklyTrend: [25, 28, 31, 26, 18],
        specialization: 'Bulk Orders',
        joinDate: '2021-08-22',
        totalDeliveries: 1820,
        bestRoute: 'Nairobi → Nakuru'
      },
      {
        id: 'AG003',
        name: 'Tom Kipkorir',
        avatar: 'TK',
        monthlyStats: {
          parcelsDelivered: 115,
          revenue: 230000,
          avgRating: 4.7,
          onTimeRate: 92.8,
          completionRate: 96.5,
          customerSatisfaction: 95.2,
          efficiency: 89.8
        },
        weeklyTrend: [22, 26, 28, 23, 16],
        specialization: 'Same Day',
        joinDate: '2023-01-10',
        totalDeliveries: 980,
        bestRoute: 'Nairobi → Kisumu'
      },
      {
        id: 'AG004',
        name: 'Lisa Soita',
        avatar: 'LS',
        monthlyStats: {
          parcelsDelivered: 108,
          revenue: 216000,
          avgRating: 4.6,
          onTimeRate: 90.5,
          completionRate: 95.8,
          customerSatisfaction: 94.1,
          efficiency: 87.3
        },
        weeklyTrend: [20, 24, 26, 22, 16],
        specialization: 'Standard Delivery',
        joinDate: '2022-11-05',
        totalDeliveries: 1240,
        bestRoute: 'Mombasa → Malindi'
      }
    ],
    teamMetrics: {
      totalActiveAgents: 47,
      avgProductivity: 89.3,
      topPerformerBonus: 15000,
      trainingHours: 24,
      avgExperience: '2.4 years',
      retentionRate: 92.5,
      avgSalary: 58000
    },
    performanceTrends: {
      monthly: [
        { month: 'Jan', avgRating: 4.5, onTimeRate: 88.2, completionRate: 94.1 },
        { month: 'Feb', avgRating: 4.6, onTimeRate: 89.5, completionRate: 95.2 },
        { month: 'Mar', avgRating: 4.7, onTimeRate: 91.2, completionRate: 96.1 },
        { month: 'Apr', avgRating: 4.8, onTimeRate: 92.8, completionRate: 97.2 },
        { month: 'May', avgRating: 4.7, onTimeRate: 93.1, completionRate: 96.8 },
        { month: 'Jun', avgRating: 4.8, onTimeRate: 94.2, completionRate: 97.5 }
      ]
    }
  }

  const monthlyData = [
    { month: 'Jan', revenue: 8500000, parcels: 1200, deliveries: 1180 }, // KSh 8.5M
    { month: 'Feb', revenue: 9200000, parcels: 1350, deliveries: 1320 }, // KSh 9.2M
    { month: 'Mar', revenue: 9800000, parcels: 1420, deliveries: 1400 }, // KSh 9.8M
    { month: 'Apr', revenue: 10500000, parcels: 1580, deliveries: 1550 }, // KSh 10.5M
    { month: 'May', revenue: 11200000, parcels: 1720, deliveries: 1680 }, // KSh 11.2M
    { month: 'Jun', revenue: 12584000, parcels: 1847, deliveries: 1820 }  // KSh 12.58M
  ]

  const topRoutes = [
    { from: 'Nairobi', to: 'Mombasa', parcels: 245, revenue: 'KSh 1,225,000' },
    { from: 'Nairobi', to: 'Kisumu', parcels: 198, revenue: 'KSh 990,000' },
    { from: 'Mombasa', to: 'Nakuru', parcels: 167, revenue: 'KSh 835,000' },
    { from: 'Nairobi', to: 'Eldoret', parcels: 134, revenue: 'KSh 670,000' },
    { from: 'Kisumu', to: 'Nakuru', parcels: 112, revenue: 'KSh 560,000' }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const revenueChartData = {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Revenue',
        data: monthlyData.map(d => d.revenue),
        backgroundColor: 'rgba(132, 204, 22, 0.8)',
        borderColor: 'rgba(132, 204, 22, 1)',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  const deliveryTrendData = {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Total Parcels',
        data: monthlyData.map(d => d.parcels),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Delivered',
        data: monthlyData.map(d => d.deliveries),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const statusDistributionData = {
    labels: ['Delivered', 'In Transit', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [1847, 156, 89, 45],
        backgroundColor: [
          '#22c55e',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
        ],
        borderColor: [
          '#16a34a',
          '#2563eb',
          '#d97706',
          '#dc2626',
        ],
        borderWidth: 3,
        hoverBackgroundColor: [
          '#16a34a',
          '#2563eb',
          '#d97706',
          '#dc2626',
        ],
        hoverBorderColor: '#ffffff',
        hoverBorderWidth: 4,
        cutout: '65%', 
        radius: '90%',
      },
    ],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: false,
      }
    },
    interaction: {
      intersect: false,
      mode: 'nearest' as const,
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
    elements: {
      arc: {
        borderWidth: 2,
        hoverBorderWidth: 3,
        borderColor: '#ffffff',
      }
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">{formatCurrency(overviewStats.totalRevenue)}</p>
              <p className="text-sm text-green-600 group-hover:text-green-700 mt-1 transition-colors duration-300">+{overviewStats.revenueGrowth}% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            </div>
          </div>
        </div>

        <div className="card group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Total Parcels</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">{formatNumber(overviewStats.totalParcels)}</p>
              <p className="text-sm text-green-600 group-hover:text-green-700 mt-1 transition-colors duration-300">+{overviewStats.parcelGrowth}% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Active Agents</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">{overviewStats.totalAgents}</p>
              <p className="text-sm text-green-600 group-hover:text-green-700 mt-1 transition-colors duration-300">+{overviewStats.agentGrowth}% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card group hover:border-primary-500 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Avg. Delivery Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">{overviewStats.avgDeliveryTime} days</p>
              <p className="text-sm text-green-600 group-hover:text-green-700 mt-1 transition-colors duration-300">{overviewStats.deliveryTimeChange}% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Monthly Revenue</h2>
            </div>
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
          <div className="h-64">
            <Bar data={revenueChartData} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Delivery Trends</h2>
            </div>
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
          <div className="h-64">
            <Line data={deliveryTrendData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Parcel Status</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="h-48 relative mb-6">
            <Doughnut data={statusDistributionData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">2,137</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total Parcels</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-center mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">Delivered</div>
              </div>
              <div className="text-sm font-bold text-green-700 dark:text-green-300">1,847</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">86.4%</div>
            </div>
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-center mb-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">In Transit</div>
              </div>
              <div className="text-sm font-bold text-blue-700 dark:text-blue-300">156</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">7.3%</div>
            </div>
            <div className="text-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
              <div className="flex items-center justify-center mb-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">Pending</div>
              </div>
              <div className="text-sm font-bold text-amber-700 dark:text-amber-300">89</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">4.2%</div>
            </div>
            <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
              <div className="flex items-center justify-center mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <div className="text-xs text-red-600 dark:text-red-400 font-medium">Cancelled</div>
              </div>
              <div className="text-sm font-bold text-red-700 dark:text-red-300">45</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">2.1%</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Routes & Agent Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Top Routes</h3>
              <div className="space-y-3">
                {topRoutes.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{route.from} → {route.to}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{route.parcels} parcels</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{route.revenue}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">#{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Top Agents</h3>
              <div className="space-y-3">
                {agentPerformance.topPerformers.slice(0, 5).map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-700 dark:text-primary-300 text-sm font-medium">
                          {agent.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{agent.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{agent.monthlyStats.parcelsDelivered} deliveries • ⭐ {agent.monthlyStats.avgRating}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-gray-100">KSh {(agent.monthlyStats.revenue / 1000).toFixed(0)}k</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">#{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRevenueAnalysis = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Revenue Analysis</h3>
          <select
            value={revenueFilter}
            onChange={(e) => setRevenueFilter(e.target.value)}
            className="input-field"
          >
            <option value="monthly">Monthly Breakdown</option>
            <option value="quarterly">Quarterly Trend</option>
            <option value="yearly">Yearly Comparison</option>
            <option value="service-type">By Service Type</option>
          </select>
        </div>

        {revenueFilter === 'monthly' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Revenue by Service Type</h4>
              <div className="space-y-3">
                {revenueAnalysis.thisMonth.breakdown.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        KSh {item.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">7-Day Revenue Trend</h4>
              <div className="space-y-2">
                {revenueAnalysis.dailyRevenue.map((day, index) => (
                  <div key={day.date} className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Day {index + 1}</span>
                    <div className="flex items-center">
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-3">
                        <div 
                          className="h-2 bg-primary-500 rounded-full" 
                          style={{ width: `${(day.amount / 70000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-16">
                        {(day.amount / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {revenueFilter === 'quarterly' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-600 dark:text-gray-400">Quarter</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {revenueAnalysis.quarterlyTrend.map((quarter) => (
                  <tr key={quarter.quarter} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-0 font-medium text-gray-900 dark:text-gray-100">{quarter.quarter}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">KSh {quarter.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-green-600">+{quarter.growth}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {revenueFilter === 'yearly' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {revenueAnalysis.yearlyComparison.map((year) => (
              <div key={year.year} className="card text-center border border-gray-200 dark:border-gray-700">
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{year.year}</div>
                <div className="text-2xl font-bold text-primary-600 mt-2">
                  KSh {(year.revenue / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Annual Revenue</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderRouteAnalysis = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Route Analysis</h3>
          <select
            value={routeFilter}
            onChange={(e) => setRouteFilter(e.target.value)}
            className="input-field"
          >
            <option value="performance">Route Performance</option>
            <option value="efficiency">Efficiency Trends</option>
            <option value="profitability">Profitability Analysis</option>
          </select>
        </div>

        {routeFilter === 'performance' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-600 dark:text-gray-400">Route</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Parcels</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Avg Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Efficiency</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Profit Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {routeAnalysis.topRoutes.map((route, index) => (
                  <tr key={route.route} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-0">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{route.route}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{route.parcels}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{route.avgTime}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">KSh {route.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${
                        route.efficiency >= 90 ? 'text-green-600' : 
                        route.efficiency >= 85 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {route.efficiency}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-green-600">{route.profitMargin}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {routeFilter === 'efficiency' && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">6-Month Efficiency Trend</h4>
            <div className="space-y-3">
              {routeAnalysis.routeEfficiencyTrend.map((month) => (
                <div key={month.month} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{month.month}</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-3">
                      <div 
                        className="h-2 bg-primary-500 rounded-full" 
                        style={{ width: `${month.efficiency}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-12">
                      {month.efficiency}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderAgentPerformance = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Agent Performance</h3>
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="input-field"
          >
            <option value="top-performers">Top Performers</option>
            <option value="detailed-stats">Detailed Statistics</option>
            <option value="performance-trends">Performance Trends</option>
          </select>
        </div>

        {agentFilter === 'top-performers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {agentPerformance.topPerformers.slice(0, 3).map((agent) => (
              <div key={agent.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-medium">{agent.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{agent.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{agent.specialization}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{agent.monthlyStats.avgRating}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Parcels Delivered</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {agent.monthlyStats.parcelsDelivered}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Revenue Generated</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      KSh {(agent.monthlyStats.revenue / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Rate</span>
                    <span className="text-sm font-medium text-green-600">
                      {agent.monthlyStats.onTimeRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
                    <span className="text-sm font-medium text-blue-600">
                      {agent.monthlyStats.efficiency}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {agentFilter === 'detailed-stats' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-0 text-sm font-medium text-gray-600 dark:text-gray-400">Agent</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Deliveries</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Rating</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">On-Time %</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Specialization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {agentPerformance.topPerformers.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-medium">{agent.avatar}</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{agent.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{agent.monthlyStats.parcelsDelivered}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      KSh {(agent.monthlyStats.revenue / 1000).toFixed(0)}k
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-yellow-600">⭐ {agent.monthlyStats.avgRating}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-green-600">{agent.monthlyStats.onTimeRate}%</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{agent.specialization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {agentFilter === 'performance-trends' && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">6-Month Performance Trends</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Average Rating</h5>
                <div className="space-y-2">
                  {agentPerformance.performanceTrends.monthly.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{month.month}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{month.avgRating}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">On-Time Rate</h5>
                <div className="space-y-2">
                  {agentPerformance.performanceTrends.monthly.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{month.month}</span>
                      <span className="text-sm font-medium text-green-600">{month.onTimeRate}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Completion Rate</h5>
                <div className="space-y-2">
                  {agentPerformance.performanceTrends.monthly.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{month.month}</span>
                      <span className="text-sm font-medium text-blue-600">{month.completionRate}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track business performance and generate insights</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          <Download className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input-field"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="input-field"
            >
              <option value="overview">Overview</option>
              <option value="revenue">Revenue Analysis</option>
              <option value="performance">Agent Performance</option>
              <option value="routes">Route Analysis</option>
            </select>
          </div>
        </div>
      </div>

      {reportType === 'overview' && renderOverview()}
      {reportType === 'revenue' && renderRevenueAnalysis()}
      {reportType === 'routes' && renderRouteAnalysis()}
      {reportType === 'performance' && renderAgentPerformance()}

     
    </div>
  )
}

export default Reports
