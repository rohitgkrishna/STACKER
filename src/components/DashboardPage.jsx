import React from 'react'
import {
  LayoutDashboard,
  Users,
  FileText,
  PieChart,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreVertical,
  LogOut,
  User,
} from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Badge } from './ui/Badge'
import { useAuth } from '../App'

export const DashboardPage = ({ onNavigate }) => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3 mr-8">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  AssetFlow
                </span>
              </div>
              
              <nav className="hidden md:flex space-x-1">
                <NavButton icon={<LayoutDashboard size={18} />} text="Dashboard" active />
                <NavButton icon={<Package size={18} />} text="Assets" />
                <NavButton icon={<Users size={18} />} text="Vendors" />
                <NavButton icon={<FileText size={18} />} text="GRNs" onClick={() => onNavigate('grn-list')} />
                <NavButton icon={<PieChart size={18} />} text="Reports" />
                <NavButton icon={<Settings size={18} />} text="Settings" />
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search assets..."
                  className="pl-10 w-64 bg-slate-100 border-slate-200 focus:bg-white"
                />
              </div>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">3</span>
                </span>
              </Button>
              
              <div className="relative group">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-600">{user?.role}</p>
                  </div>
                </Button>
                
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-2 border-slate-200" />
                  <button 
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-600">
            Here's what's happening with your assets today
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => onNavigate('grn')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create GRN
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-slate-50"
              onClick={() => onNavigate('grn-list')}
            >
              <FileText className="h-4 w-4 mr-2" />
              View All GRNs
            </Button>
            <Button variant="outline" className="hover:bg-slate-50">
              <Package className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
            <Button variant="outline" className="hover:bg-slate-50">
              <Users className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Assets"
            value="2,547"
            change="+12%"
            changeType="positive"
            icon={<Package className="h-6 w-6 text-blue-600" />}
          />
          <StatsCard
            title="Active Vendors"
            value="168"
            change="+3%"
            changeType="positive"
            icon={<Users className="h-6 w-6 text-green-600" />}
          />
          <StatsCard
            title="Pending GRNs"
            value="24"
            change="-5%"
            changeType="negative"
            icon={<FileText className="h-6 w-6 text-orange-600" />}
          />
          <StatsCard
            title="This Month"
            value="427"
            change="+22%"
            changeType="positive"
            icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Recent Activity</span>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ActivityItem
                icon={<CheckCircle className="h-5 w-5 text-green-600" />}
                title="GRN #2347 Approved"
                description="Office supplies received and verified"
                time="2 hours ago"
              />
              <ActivityItem
                icon={<Package className="h-5 w-5 text-blue-600" />}
                title="New Asset Added"
                description="MacBook Pro 14' added to IT Department"
                time="4 hours ago"
              />
              <ActivityItem
                icon={<AlertCircle className="h-5 w-5 text-orange-600" />}
                title="Vendor Contract Expiring"
                description="Dell Enterprise Solutions - expires in 30 days"
                time="1 day ago"
              />
              <ActivityItem
                icon={<Users className="h-5 w-5 text-purple-600" />}
                title="New Vendor Added"
                description="TechCorp Solutions added to vendor list"
                time="2 days ago"
              />
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Pending Tasks</span>
                <Badge variant="secondary">4 items</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TaskItem
                title="Review GRN #2348"
                description="Hardware procurement needs approval"
                priority="high"
                dueDate="Today"
              />
              <TaskItem
                title="Update Asset Status"
                description="Mark 3 laptops as deployed"
                priority="medium"
                dueDate="Tomorrow"
              />
              <TaskItem
                title="Vendor Meeting"
                description="Quarterly review with HP Enterprise"
                priority="low"
                dueDate="Next week"
              />
              <TaskItem
                title="Generate Report"
                description="Monthly asset utilization report"
                priority="medium"
                dueDate="End of week"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const NavButton = ({ icon, text, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
      active 
        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
)

const StatsCard = ({ title, value, change, changeType, icon }) => (
  <Card className="shadow-lg border-slate-200 hover:shadow-xl transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          <p className={`text-sm font-medium mt-2 ${
            changeType === 'positive' 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {change} from last month
          </p>
        </div>
        <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
)

const ActivityItem = ({ icon, title, description, time }) => (
  <div className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
    <div className="flex-shrink-0 mt-0.5">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-slate-900">{title}</p>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
    <div className="flex-shrink-0">
      <p className="text-xs text-slate-500">{time}</p>
    </div>
  </div>
)

const TaskItem = ({ title, description, priority, dueDate }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  }

  return (
    <div className="flex items-start justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <Badge className={`text-xs ${priorityColors[priority]}`}>
            {priority}
          </Badge>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
        <div className="flex items-center space-x-1 mt-2">
          <Clock className="h-3 w-3 text-slate-500" />
          <p className="text-xs text-slate-500">{dueDate}</p>
        </div>
      </div>
    </div>
  )
}