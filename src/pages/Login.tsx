import { useState } from 'react'
import { Mail, Lock, Truck, Eye, EyeOff } from 'lucide-react'
import ThemeToggle from '../components/common/ThemeToggle'
import { useTheme } from '../contexts/ThemeContext'

interface LoginProps {
  onLogin: () => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { theme } = useTheme()

  const validatePassword = (pwd: string) => {
    if (pwd.length <= 6) {
      setPasswordError('Password must be longer than 6 characters')
      return false
    }
    setPasswordError('')
    return true
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    if (newPassword.length > 0) {
      validatePassword(newPassword)
    } else {
      setPasswordError('')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate password before proceeding
    if (!validatePassword(password)) {
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(to bottom right, #121212, #1e1e1e)' 
          : 'linear-gradient(to bottom right, #F5F5F5, #e5e5e5)'
      }}
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md w-full rounded-xl shadow-lg p-8"
        style={{
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'
        }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-xl mb-4">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Escrow Courier</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Admin Portal Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="admin@escrowcourier.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className={`input-field pl-10 pr-12 ${passwordError ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="••••••••"
                required
                minLength={7}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {passwordError}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700" />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading || !!passwordError || password.length <= 6}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 p-4 rounded-lg"
          style={{
            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F5F5F5'
          }}
        >
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Demo: Use any email and a password longer than 6 characters to login
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Escrow Courier. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
