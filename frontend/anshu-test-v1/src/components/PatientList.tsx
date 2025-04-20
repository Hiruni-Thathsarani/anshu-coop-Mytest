import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PatientCard from './PatientCard'
import { Patient } from '../types/patient'
import { Loader2Icon } from 'lucide-react'
interface PatientListProps {
    patients: Patient[]
    onDelete: (id: string) => void
    onStatusUpdate: (id: string, status: 'Active' | 'Inactive') => void
    isLoading?: boolean
}
const PatientList = ({
                         patients,
                         onDelete,
                         onStatusUpdate,
                         isLoading = false,
                     }: PatientListProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2Icon className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        )
    }
    return (
        <div className="space-y-4">
            <AnimatePresence>
                {patients.map((patient, index) => (
                    <motion.div
                        key={patient.id}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -100,
                        }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.05,
                        }}
                    >
                        <PatientCard
                            patient={patient}
                            onDelete={onDelete}
                            onStatusUpdate={onStatusUpdate}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
export default PatientList
