import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Lock,
  LayoutDashboard,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Alert, AlertDescription } from './ui/alert'
import { motion } from 'motion/react'
import { useAuth } from '../App'
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
  dismissToast
} from './ui/toast-helpers'

function LoginPage({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const { login } = useAuth()

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    setLoginError('')
    const loadingToastId = showLoadingToast(
      'Signing you in...',
      'Please wait while we verify your credentials'
    )

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.email === 'demo@assetflow.com' && data.password === 'password123') {
            resolve(data)
          } else if (data.email && data.password) {
            resolve(data)
          } else {
            reject(new Error('Invalid credentials'))
          }
        }, 2000)
      })

      dismissToast(loadingToastId)
      const userData = {
        id: '1',
        name:
          data.email
            .split('@')[0]
            .replace(/[^a-zA-Z]/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase()) || 'John Doe',
        email: data.email,
        role: 'Admin'
      }

      showSuccessToast('Welcome back!', `Successfully signed in as ${userData.name}`)
      login(userData)
    } catch (error) {
      dismissToast(loadingToastId)
      setLoginError('Invalid email or password. Please try again.')
      showErrorToast(
        'Sign In Failed',
        'Please check your credentials and try again. Use demo@assetflow.com / password123 for demo access.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-center">Sign In to AssetFlow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loginError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoading}
                      />
                    )}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </div>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginPage
