import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  Menu, 
  X, 
  LogOut,
  Truck,
  Bell,
  Search,
  Building2,
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'
import ThemeToggle from '../common/ThemeToggle'
import { useTheme } from '../../contexts/ThemeContext'

interface LayoutProps {
  children: React.ReactNode
  onLogout: () => void
}

const Layout = ({ children, onLogout }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()
  const notificationRef = useRef<HTMLDivElement>(null)

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Delivery Completed',
      message: 'Package #PKG-001-2024 has been successfully delivered to Mombasa',
      time: '2 minutes ago',
      read: false,
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'warning',
      title: 'Delivery Delayed',
      message: 'Package #PKG-002-2024 delivery to Kisumu is delayed due to weather conditions',
      time: '15 minutes ago',
      read: false,
      icon: AlertCircle
    },
    {
      id: 3,
      type: 'info',
      title: 'New Agent Assigned',
      message: 'Mike Muli has been assigned to Route Nairobi → Nakuru',
      time: '1 hour ago',
      read: true,
      icon: Info
    },
    {
      id: 4,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of KSh 15,000 received for multiple deliveries',
      time: '2 hours ago',
      read: true,
      icon: CheckCircle
    },
    {
      id: 5,
      type: 'info',
      title: 'Route Optimization',
      message: 'New optimized route available for Nairobi → Mombasa corridor',
      time: '3 hours ago',
      read: true,
      icon: Info
    }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getNotificationColors = (type: string, read: boolean) => {
    const baseOpacity = read ? 'opacity-60' : ''
    switch (type) {
      case 'success':
        return `bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 ${baseOpacity}`
      case 'warning':
        return `bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 ${baseOpacity}`
      case 'info':
        return `bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 ${baseOpacity}`
      default:
        return `bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700 ${baseOpacity}`
    }
  }

  const getIconColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 dark:text-green-400'
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'info':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Parcels', href: '/parcels', icon: Package },
    { name: 'Agents', href: '/agents', icon: Users },
    { name: 'Vendors', href: '/vendors', icon: Building2 },
    { name: 'Wallets', href: '/wallets', icon: Wallet },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
  ]

  const isActivePage = (href: string) => location.pathname === href

  return (
    <div className="flex h-screen" style={{
      backgroundColor: theme === 'dark' ? '#121212' : '#F5F5F5'
    }}>
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        style={{
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'
        }}
      >
        
        
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-lg">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Escrow Courier</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-link ${isActivePage(item.href) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <header className="shadow-sm border-b border-gray-200"
          style={{
            backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
            borderColor: theme === 'dark' ? '#2a2a2a' : undefined
          }}
        >
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden md:block ml-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search parcels, agents..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 bg-white text-gray-900"
                    style={{
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : undefined,
                      borderColor: theme === 'dark' ? '#3a3a3a' : undefined,
                      color: theme === 'dark' ? '#f3f4f6' : undefined
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />

              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{unreadCount} unread</span>
                      </div>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="py-2">
                          {notifications.map((notification) => {
                            const Icon = notification.icon
                            return (
                              <div
                                key={notification.id}
                                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 transition-colors duration-200 ${getNotificationColors(notification.type, notification.read)}`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`flex-shrink-0 ${getIconColors(notification.type)}`}>
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className={`text-sm font-medium ${notification.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                                        {notification.title}
                                      </p>
                                      {!notification.read && (
                                        <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                                      )}
                                    </div>
                                    <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                                      {notification.message}
                                    </p>
                                    <div className="flex items-center mt-2">
                                      <Clock className="w-3 h-3 text-gray-400 mr-1" />
                                      <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No notifications</p>
                        </div>
                      )}
                    </div>
                    
                    {notifications.length > 0 && (
                      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <button className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200">
                          View all notifications
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@escrowcourier.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto"
          style={{
            backgroundColor: theme === 'dark' ? '#121212' : '#F5F5F5'
          }}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
