import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { Patient } from '../types/patient'
interface PatientFormProps {
  onSubmit: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}
const PatientForm = ({ onSubmit, onCancel }: PatientFormProps) => {
  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active')
  const [errors, setErrors] = useState<{
    name?: string
    dateOfBirth?: string
  }>({})
  const validate = () => {
    const newErrors: {
      name?: string
      dateOfBirth?: string
    } = {}
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required'
    } else {
      const selectedDate = new Date(dateOfBirth)
      const today = new Date()
      if (selectedDate > today) {
        newErrors.dateOfBirth = 'Date of Birth cannot be in the future'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({
        name,
        dateOfBirth,
        status,
      })
    }
  }
  return (
      <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          className="bg-white rounded-lg p-6 shadow-md mb-6 border border-gray-200"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Patient</h2>
          <motion.button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
          >
            <XIcon className="h-5 w-5" />
          </motion.button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="name"
            >
              Full Name *
            </label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="dateOfBirth"
            >
              Date of Birth *
            </label>
            <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Status *
            </label>
            <div className="flex space-x-4">
              {['Active', 'Inactive'].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                        type="radio"
                        value={option}
                        checked={status === option}
                        onChange={() => setStatus(option as 'Active' | 'Inactive')}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-150"
            >
              Cancel
            </button>
            <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-150"
            >
              Add Patient
            </motion.button>
          </div>
        </form>
      </motion.div>
  )
}
export default PatientForm
