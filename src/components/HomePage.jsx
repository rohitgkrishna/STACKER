import React, { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  FileText,
  PieChart,
  Settings,
  ChevronDown,
  BarChart3,
  Users2,
  ClipboardList,
  FileSpreadsheet,
  Bell,
  Search,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Menu,
  X,
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/Card'
import { Badge } from './ui/badge'
import { motion } from 'motion/react'

export const HomePage = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  AssetFlow
                </span>
              </motion.div>
              
              <nav className="hidden md:ml-8 md:flex space-x-1">
                <NavLink icon={<LayoutDashboard size={18} />} text="Dashboard" />
                <NavLink icon={<FileSpreadsheet size={18} />} text="Assets" />
                <NavLink icon={<Users size={18} />} text="Vendors" />
                <NavLink icon={<FileText size={18} />} text="GRNs" />
                <NavLink icon={<PieChart size={18} />} text="Reports" />
                <NavLink icon={<Settings size={18} />} text="Settings" />
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate('login')}
                  className="hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => onNavigate('signup')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Button>
              </div>
              
              <button 
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-t border-slate-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-4 space-y-4">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start">Dashboard</Button>
                <Button variant="ghost" className="justify-start">Assets</Button>
                <Button variant="ghost" className="justify-start">Vendors</Button>
                <Button variant="ghost" className="justify-start">GRNs</Button>
                <Button variant="ghost" className="justify-start">Reports</Button>
              </div>
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200">
                <Button variant="outline" onClick={() => onNavigate('login')}>
                  Sign In
                </Button>
                <Button onClick={() => onNavigate('signup')}>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-slate-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-25"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 transition-colors">
                ✨ New: Advanced Analytics Dashboard
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                Track and Manage All Your
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent block mt-2">
                  Assets Efficiently
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Streamline your organization's asset management with our comprehensive solution. 
                Track hardware, software, and inventory all in one place with powerful analytics and automation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('signup')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg border-2 hover:bg-slate-50 transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Powerful Features for Complete Asset Management
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Everything you need to manage your assets efficiently, from procurement to retirement
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<BarChart3 size={28} className="text-blue-600" />}
                title="Asset Lifecycle Management"
                description="Track assets from procurement to retirement with detailed history and automated status updates."
                delay={0.1}
              />
              <FeatureCard
                icon={<Users2 size={28} className="text-blue-600" />}
                title="Vendor Integration"
                description="Manage vendor relationships, contracts, and communications with integrated workflows."
                delay={0.2}
              />
              <FeatureCard
                icon={<ClipboardList size={28} className="text-blue-600" />}
                title="Smart GRN Tracking"
                description="Generate and track Goods Received Notes with automated workflows and notifications."
                delay={0.3}
              />
              <FeatureCard
                icon={<FileSpreadsheet size={28} className="text-blue-600" />}
                title="Advanced Reporting"
                description="Export comprehensive reports and analytics in multiple formats with custom dashboards."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Stats Dashboard */}
        <section className="py-24 bg-gradient-to-r from-slate-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Trusted by Organizations Worldwide
              </h2>
              <p className="text-xl text-slate-600">
                See how AssetFlow is making a difference
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard number="2,547" label="Total Assets Managed" trend="+12%" delay={0.1} />
              <StatCard number="168" label="Active Organizations" trend="+24%" delay={0.2} />
              <StatCard number="427" label="GRNs This Month" trend="+18%" delay={0.3} />
              <StatCard number="99.9%" label="Uptime Guarantee" trend="stable" delay={0.4} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Your Asset Management?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join thousands of organizations already using AssetFlow to streamline their operations
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('signup')}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg transition-all duration-300"
                >
                  Schedule Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg">Product</h3>
              <ul className="space-y-4">
                <FooterLink text="Features" />
                <FooterLink text="Pricing" />
                <FooterLink text="API" />
                <FooterLink text="Documentation" />
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg">Company</h3>
              <ul className="space-y-4">
                <FooterLink text="About" />
                <FooterLink text="Blog" />
                <FooterLink text="Careers" />
                <FooterLink text="Press" />
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg">Support</h3>
              <ul className="space-y-4">
                <FooterLink text="Help Center" />
                <FooterLink text="Contact Us" />
                <FooterLink text="Status" />
                <FooterLink text="Community" />
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg">Legal</h3>
              <ul className="space-y-4">
                <FooterLink text="Privacy Policy" />
                <FooterLink text="Terms of Service" />
                <FooterLink text="Security" />
                <FooterLink text="GDPR" />
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AssetFlow</span>
            </div>
            <p className="text-slate-400">
              © 2024 AssetFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const NavLink = ({ icon, text }) => (
  <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
    {icon}
    <span className="font-medium">{text}</span>
  </button>
)

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="group"
  >
    <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="h-16 w-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
)

const StatCard = ({ number, label, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
  >
    <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-md">
      <CardContent className="p-0">
        <p className="text-4xl font-bold text-slate-900 mb-2">{number}</p>
        <p className="text-slate-600 mb-3">{label}</p>
        <div className={`inline-flex items-center space-x-1 text-sm font-medium ${
          trend.startsWith('+') ? 'text-green-600' : trend === 'stable' ? 'text-blue-600' : 'text-red-600'
        }`}>
          <TrendingUp className="h-4 w-4" />
          <span>{trend}</span>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const FooterLink = ({ text }) => (
  <li>
    <button className="hover:text-white transition-colors duration-200 text-left">
      {text}
    </button>
  </li>
)
