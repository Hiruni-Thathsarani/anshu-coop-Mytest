import React, { Fragment } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
const Pagination = ({
                      currentPage,
                      totalPages,
                      onPageChange,
                    }: PaginationProps) => {
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }
  // Limit visible page numbers
  let visiblePageNumbers = pageNumbers
  if (totalPages > 5) {
    if (currentPage <= 3) {
      visiblePageNumbers = [...pageNumbers.slice(0, 5), '...', totalPages]
    } else if (currentPage >= totalPages - 2) {
      visiblePageNumbers = [1, '...', ...pageNumbers.slice(totalPages - 5)]
    } else {
      visiblePageNumbers = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      ]
    }
  }
  return (
      <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex justify-center mt-8"
      >
        <nav className="flex items-center">
          <button
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex mx-2">
            {visiblePageNumbers.map((page, index) => (
                <Fragment key={index}>
                  {page === '...' ? (
                      <span className="px-3 py-1 text-gray-500">...</span>
                  ) : (
                      <motion.button
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() => typeof page === 'number' && onPageChange(page)}
                          className={`mx-1 px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {page}
                      </motion.button>
                  )}
                </Fragment>
            ))}
          </div>
          <button
              onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </nav>
      </motion.div>
  )
}
export default Pagination
