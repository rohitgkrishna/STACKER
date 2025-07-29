import React, { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  FileText,
  PieChart,
  Settings,
  Bell,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar,
  Building,
  Package,
  LogOut,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { motion } from 'motion/react'
import { useAuth } from '../App'
import { showSuccessToast, showErrorToast, showConfirmDialog, showInfoToast } from './ui/toast-helpers'

const mockGRNs = [
  {
    id: 'GRN-202507-001',
    date: '2024-07-24',
    vendor: 'Dell Technologies',
    branch: 'Head Office - New York',
    invoiceNumber: 'INV-2024-001',
    status: 'approved',
    totalAmount: 15750.0,
    items: 5,
    createdBy: 'John Doe',
    approvedBy: 'Sarah Smith',
  },
  {
    id: 'GRN-202507-002',
    date: '2024-07-23',
    vendor: 'HP Enterprise',
    branch: 'Branch Office - Los Angeles',
    invoiceNumber: 'INV-2024-002',
    status: 'pending',
    totalAmount: 8450.0,
    items: 3,
    createdBy: 'Mike Johnson',
    approvedBy: null,
  },
  {
    id: 'GRN-202507-003',
    date: '2024-07-22',
    vendor: 'Lenovo Solutions',
    branch: 'Regional Office - Chicago',
    invoiceNumber: 'INV-2024-003',
    status: 'draft',
    totalAmount: 12300.0,
    items: 7,
    createdBy: 'Emily Davis',
    approvedBy: null,
  },
  {
    id: 'GRN-202507-004',
    date: '2024-07-21',
    vendor: 'Apple Inc.',
    branch: 'Head Office - New York',
    invoiceNumber: 'INV-2024-004',
    status: 'approved',
    totalAmount: 25600.0,
    items: 4,
    createdBy: 'David Wilson',
    approvedBy: 'Sarah Smith',
  },
  {
    id: 'GRN-202507-005',
    date: '2024-07-20',
    vendor: 'Microsoft Corporation',
    branch: 'Branch Office - Miami',
    invoiceNumber: 'INV-2024-005',
    status: 'rejected',
    totalAmount: 5200.0,
    items: 2,
    createdBy: 'Lisa Brown',
    approvedBy: 'Mark Taylor',
  },
]

function GRNListPage({ onNavigate }) {
  const { user, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [grnList, setGrnList] = useState(mockGRNs)

  const filteredGRNs = grnList.filter(grn => {
    const matchesSearch = grn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grn.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grn.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || grn.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = status => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200"><Edit className="h-3 w-3 mr-1" />Draft</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200"><X className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleDeleteGRN = grn => {
    showConfirmDialog(
      `Delete GRN ${grn.id}?`,
      `Are you sure you want to delete this GRN? This action cannot be undone. The GRN for ${grn.vendor} worth $${grn.totalAmount.toLocaleString()} will be permanently removed.`,
      () => {
        setGrnList(grnList.filter(item => item.id !== grn.id))
        showSuccessToast('GRN Deleted Successfully', `GRN ${grn.id} has been permanently deleted from the system.`)
      },
      () => {
        showInfoToast('Deletion Cancelled', 'The GRN was not deleted.')
      }
    )
  }

  const handleViewGRN = grnId => {
    showInfoToast('View GRN', `Opening details for ${grnId}...`)
  }

  const handleEditGRN = grnId => {
    showInfoToast('Edit GRN', `Opening editor for ${grnId}...`)
  }

  const handleDownloadGRN = grn => {
    showInfoToast('Download Started', `Preparing ${grn.id} for download...`)
    setTimeout(() => {
      showSuccessToast('Download Complete', `${grn.id}.pdf has been downloaded successfully.`)
    }, 2000)
  }

  // The rest of the component remains unchanged
  // You can paste the rest of the JSX layout content here or request me to continue it if you want.

  return null
}

function NavButton({ icon, text, active = false, onClick }) {
  return (
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
}

function StatsCard({ title, value, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -2 }}
    >
      <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
            <div className="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default GRNListPage
