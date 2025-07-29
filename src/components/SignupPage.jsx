import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Eye, EyeOff, LayoutDashboard
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { motion } from 'framer-motion'
import { useAuth } from '../App'
import { showSuccessToast, showErrorToast, showLoadingToast, dismissToast } from './ui/toast-helpers'

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(2),
  lastName: yup.string().required('Last name is required').min(2),
  email: yup.string().email().required(),
  company: yup.string().required(),
  role: yup.string().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
  terms: yup.boolean().oneOf([true], 'You must accept the terms'),
})

function SignupPage({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      role: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const password = watch('password')

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' }

    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    const levels = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Very Weak', color: 'bg-red-500' },
      { score: 2, label: 'Weak', color: 'bg-orange-500' },
      { score: 3, label: 'Fair', color: 'bg-yellow-500' },
      { score: 4, label: 'Good', color: 'bg-blue-500' },
      { score: 5, label: 'Strong', color: 'bg-green-500' },
    ]

    return levels[score] || levels[0]
  }

  const passwordStrength = getPasswordStrength(password)

  const onSubmit = async (data) => {
    setIsLoading(true)
    const loadingToastId = showLoadingToast(
      'Creating your account...',
      'Please wait while we set up your AssetFlow account'
    )

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.05) {
            reject(new Error('Email already exists'))
          } else {
            resolve(data)
          }
        }, 2500)
      })

      dismissToast(loadingToastId)

      const userData = {
        id: '1',
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        role: data.role,
      }

      showSuccessToast(
        'Account Created Successfully!',
        `Welcome to AssetFlow, ${userData.name}!`
      )
      login(userData)
    } catch (error) {
      dismissToast(loadingToastId)
      showErrorToast(
        'Account Creation Failed',
        'Please try again or contact support if the issue persists.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 md:p-10 bg-white">
            <CardHeader className="mb-4">
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <p className="text-sm text-muted-foreground">Start your journey with AssetFlow</p>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>First Name</Label>
                      <Input placeholder="John" {...field} />
                      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" {...field} />
                      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>
                  )}
                />
              </div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="john@example.com" {...field} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                )}
              />
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label>Company</Label>
                    <Input placeholder="Company Name" {...field} />
                    {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                  </div>
                )}
              />
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label>Role</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                  </div>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Password</Label>
                      <div className="relative">
                        <Input type={showPassword ? 'text' : 'password'} {...field} />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <div className="h-2 mt-1 rounded bg-gray-200 overflow-hidden">
                        <motion.div
                          className={`h-2 transition-all ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></motion.div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Password Strength: {passwordStrength.label}
                      </p>
                      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Confirm Password</Label>
                      <div className="relative">
                        <Input type={showConfirmPassword ? 'text' : 'password'} {...field} />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-500"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                  )}
                />
              </div>
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <Label>I agree to the terms and conditions</Label>
                  </div>
                )}
              />
              {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
            <div className="mt-4 text-sm text-center">
              Already have an account?{' '}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => onNavigate('login')}
              >
                Log in
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10 flex flex-col items-center justify-center">
            <LayoutDashboard size={40} className="mb-4" />
            <h2 className="text-xl font-bold mb-2">Welcome to AssetFlow</h2>
            <p className="text-sm text-center">
              Manage your assets efficiently and effectively with our powerful platform.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SignupPage
