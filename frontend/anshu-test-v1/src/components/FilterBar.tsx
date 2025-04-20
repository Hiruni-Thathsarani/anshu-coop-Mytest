import React from 'react'
import { motion } from 'framer-motion'
import { SearchIcon } from 'lucide-react'
interface FilterBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
}
const FilterBar = ({
                     searchTerm,
                     setSearchTerm,
                     statusFilter,
                     setStatusFilter,
                   }: FilterBarProps) => {
  return (
      <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="bg-white rounded-lg p-4 shadow-sm mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search patients by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Filter
            </label>
            <div className="flex rounded-md shadow-sm">
              {['All', 'Active', 'Inactive'].map((status) => (
                  <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 text-sm font-medium ${statusFilter === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} ${status === 'All' ? 'rounded-l-md' : ''} ${status === 'Inactive' ? 'rounded-r-md' : ''} border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  >
                    {status}
                  </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
  )
}
export default FilterBar
