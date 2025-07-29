import React, { useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Plus, Trash2, Receipt, ArrowLeft, Package, Save, RotateCcw, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { motion } from 'motion/react'
import { useAuth } from '../App'
import { showSuccessToast, showErrorToast, showLoadingToast, dismissToast, showInfoToast } from './ui/toast-helpers'

const GRNForm = ({ onNavigate }) => {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const schema = yup.object().shape({
    grnDate: yup.date().required('GRN Date is required'),
    invoiceNumber: yup.string().required('Invoice number is required').max(30),
    vendor: yup.string().required('Vendor is required'),
    branch: yup.string().required('Branch is required'),
    items: yup.array().of(
      yup.object().shape({
        subCategory: yup.string().required('Required'),
        itemDescription: yup.string().required().max(100),
        quantity: yup.number().positive().integer().required(),
        unitPrice: yup.number().min(0).required(),
        taxPercent: yup.number().min(0).max(100).required(),
      })
    ),
  })

  const { control, handleSubmit, watch, reset, formState: { errors, isDirty } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      grnDate: new Date().toISOString().split('T')[0],
      invoiceNumber: '',
      vendor: '',
      branch: '',
      items: [{ subCategory: '', itemDescription: '', quantity: 1, unitPrice: 0, taxPercent: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const items = watch('items')

  const calculateTotals = () => {
    let subtotal = 0, totalTax = 0
    items.forEach(item => {
      const qty = item.quantity || 0
      const price = item.unitPrice || 0
      const tax = item.taxPercent || 0
      const value = qty * price
      subtotal += value
      totalTax += (value * tax) / 100
    })
    return { subtotal, totalTax, grandTotal: subtotal + totalTax }
  }

  const totals = calculateTotals()

  const onSubmit = async data => {
    setIsSaving(true)
    const loadingToastId = showLoadingToast('Creating GRN...', 'Please wait while we process your request')

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => (Math.random() < 0.1 ? reject(new Error('Network error')) : resolve(data)), 2000)
      })

      dismissToast(loadingToastId)
      setShowSuccessMessage(true)
      showSuccessToast('GRN Created Successfully!', `GRN #GRN-202507-001 has been created.`)
      console.log('Submitted Data:', data)

      setTimeout(() => {
        reset()
        setShowSuccessMessage(false)
        onNavigate('grn-list')
      }, 3000)
    } catch (error) {
      dismissToast(loadingToastId)
      showErrorToast('Failed to Create GRN', 'There was an error creating your GRN. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    reset()
    showInfoToast('Form Reset', 'All fields reset to default values.')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onNavigate('grn-list')}><ArrowLeft className="h-4 w-4" /><span>Back to GRN List</span></Button>
              <div className="h-6 w-px bg-slate-300"></div>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Receipt className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">Create GRN</h1>
                  <p className="text-sm text-slate-600">Goods Receipt Note</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Welcome, {user?.name}</span>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user?.name?.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSuccessMessage && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription><strong>Success!</strong> Redirecting...</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span>GRN Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>GRN Date</Label>
                <Controller name="grnDate" control={control} render={({ field }) => (
                  <Input type="date" {...field} />
                )} />
                {errors.grnDate && <p className="text-red-500 text-sm">{errors.grnDate.message}</p>}
              </div>
              <div>
                <Label>Invoice Number</Label>
                <Controller name="invoiceNumber" control={control} render={({ field }) => (
                  <Input {...field} />
                )} />
                {errors.invoiceNumber && <p className="text-red-500 text-sm">{errors.invoiceNumber.message}</p>}
              </div>
              <div>
                <Label>Vendor</Label>
                <Controller name="vendor" control={control} render={({ field }) => (
                  <Input {...field} />
                )} />
                {errors.vendor && <p className="text-red-500 text-sm">{errors.vendor.message}</p>}
              </div>
              <div>
                <Label>Branch</Label>
                <Controller name="branch" control={control} render={({ field }) => (
                  <Input {...field} />
                )} />
                {errors.branch && <p className="text-red-500 text-sm">{errors.branch.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Line Items
                <Button type="button" onClick={() => append({ subCategory: '', itemDescription: '', quantity: 1, unitPrice: 0, taxPercent: 0 })}><Plus className="h-4 w-4" /> Add Item</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                  <div className="col-span-1">
                    <Label>Sub Category</Label>
                    <Controller name={`items.${index}.subCategory`} control={control} render={({ field }) => (
                      <Input {...field} />
                    )} />
                    {errors.items?.[index]?.subCategory && <p className="text-red-500 text-sm">{errors.items[index].subCategory.message}</p>}
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Controller name={`items.${index}.itemDescription`} control={control} render={({ field }) => (
                      <Input {...field} />
                    )} />
                    {errors.items?.[index]?.itemDescription && <p className="text-red-500 text-sm">{errors.items[index].itemDescription.message}</p>}
                  </div>
                  <div>
                    <Label>Qty</Label>
                    <Controller name={`items.${index}.quantity`} control={control} render={({ field }) => (
                      <Input type="number" {...field} />
                    )} />
                  </div>
                  <div>
                    <Label>Unit Price</Label>
                    <Controller name={`items.${index}.unitPrice`} control={control} render={({ field }) => (
                      <Input type="number" {...field} />
                    )} />
                  </div>
                  <div>
                    <Label>Tax (%)</Label>
                    <Controller name={`items.${index}.taxPercent`} control={control} render={({ field }) => (
                      <Input type="number" {...field} />
                    )} />
                  </div>
                  <div>
                    <Button type="button" variant="destructive" onClick={() => remove(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-slate-50">
            <CardHeader>
              <CardTitle className="text-blue-900">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <div>Subtotal: ₹{totals.subtotal.toFixed(2)}</div>
              <div>Tax: ₹{totals.totalTax.toFixed(2)}</div>
              <div className="font-semibold">Grand Total: ₹{totals.grandTotal.toFixed(2)}</div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleReset} disabled={isSaving}><RotateCcw className="h-4 w-4 mr-1" />Reset</Button>
            <Button type="submit" disabled={isSaving || !isDirty}><Save className="h-4 w-4 mr-1" />Submit GRN</Button>
          </div>
        </motion.form>
      </main>
    </div>
  )
}

export default GRNForm
