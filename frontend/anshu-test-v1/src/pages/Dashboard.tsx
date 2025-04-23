import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PatientList from '../components/PatientList'
import FilterBar from '../components/FilterBar'
import PatientForm from '../components/PatientForm'
import Pagination from '../components/Pagination'
import { PlusIcon } from 'lucide-react'
import { Patient } from '../types/patient'
import {patientService} from "../service/api.ts";


const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const patientsPerPage = 5

  useEffect(() => {
    fetchPatients()
  }, [])
  const fetchPatients = async () => {
    try {
      {isLoading && (
          <div className="text-center text-gray-500 my-4">Loading...</div>
      )}
      setIsLoading(true)
      const data = await patientService.getAllPatients()
      setPatients(data)
      setFilteredPatients(data)
    } catch (error) {
    
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    let result = patients
    if (searchTerm) {
      result = result.filter((patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (statusFilter !== 'All') {
      result = result.filter((patient) => patient.status === statusFilter)
    }
    setFilteredPatients(result)
    setCurrentPage(1)
  }, [searchTerm, statusFilter, patients])
  const indexOfLastPatient = currentPage * patientsPerPage
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
  const currentPatients = filteredPatients.slice(
      indexOfFirstPatient,
      indexOfLastPatient,
  )
  const addPatient = async (
      patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> => {
    try {
      const newPatient = await patientService.createPatient(patientData)
      setPatients([...patients, newPatient])
      setShowForm(false)
    } catch (error) {
      console.error(error)
    }
  }

  const deletePatient = async (id: string) => {
    try {
      await patientService.deletePatient(id)
      setPatients(patients.filter((patient) => patient.id !== id))

    } catch (error) {

      console.error(error)
    }
  }
  const updatePatientStatus = async (
      id: string,
      newStatus: 'Active' | 'Inactive',
  ) => {
    try {
      await patientService.updatePatient(id, {
        status: newStatus,
      })
      setPatients(
          patients.map((patient) =>
              patient.id === id
                  ? {
                    ...patient,
                    status: newStatus,
                  }
                  : patient,
          ),
      )

    } catch (error) {

      console.error(error)
    }
  }
  return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="max-w-5xl mx-auto"
        >
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Patient Management System
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your patients efficiently
              </p>
            </div>
            <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setShowForm(true)}
                className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition duration-200"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Patient
            </motion.button>
          </header>
          <FilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
          />
          {showForm && (
              <PatientForm
                  onSubmit={addPatient}
                  onCancel={() => setShowForm(false)}
              />
          )}
          <PatientList
              patients={currentPatients}
              onDelete={deletePatient}
              onStatusUpdate={updatePatientStatus}
          />
          {filteredPatients.length > patientsPerPage && (
              <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredPatients.length / patientsPerPage)}
                  onPageChange={setCurrentPage}
              />
          )}
          {filteredPatients.length === 0 && (
              <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="bg-white rounded-lg p-8 text-center shadow-sm mt-4"
              >
                <p className="text-gray-500 text-lg">
                  No patients found matching your filters
                </p>
              </motion.div>
          )}
        </motion.div>
      </div>
  )
}
export default Dashboard
