import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrashIcon, EditIcon, XIcon } from 'lucide-react'
import { Patient } from '../types/patient'
interface PatientCardProps {
    patient: Patient
    onDelete: (id: string) => void
    onStatusUpdate: (id: string, status: 'Active' | 'Inactive') => void
}
const PatientCard = ({
                         patient,
                         onDelete,
                         onStatusUpdate,
                     }: PatientCardProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const toggleStatus = () => {
        const newStatus = patient.status === 'Active' ? 'Inactive' : 'Active'
        onStatusUpdate(patient.id, newStatus)
        setIsEditing(false)
    }
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }
    const calculateAge = (dateOfBirth: string) => {
        const birthDate = new Date(dateOfBirth)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--
        }
        return age
    }
    return (
        <motion.div
            whileHover={{
                y: -2,
            }}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="mb-2 sm:mb-0">
                    <h3 className="text-lg font-medium text-gray-800">{patient.name}</h3>
                    <p className="text-gray-600">
                        Date of Birth: {formatDate(patient.dateOfBirth)}
                    </p>
                    <p className="text-gray-600">
                        Age: {calculateAge(patient.dateOfBirth)} years
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {isEditing ? (
                        <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                Change status to:
              </span>
                            <button
                                onClick={toggleStatus}
                                className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-100"
                            >
                                {patient.status === 'Active' ? 'Inactive' : 'Active'}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                                <XIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <>
              <span
                  className={`px-2 py-1 text-xs rounded-full ${patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {patient.status}
              </span>
                            <motion.button
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() => setIsEditing(true)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <EditIcon className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() => onDelete(patient.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </motion.button>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
export default PatientCard
