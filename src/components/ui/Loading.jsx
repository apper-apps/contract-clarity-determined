import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Loading = ({ message = "Processing your document..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {message}
        </h3>
        <p className="text-gray-600">
          This may take a few moments...
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex items-center space-x-2 text-sm text-gray-500"
      >
        <ApperIcon name="Zap" className="w-4 h-4" />
        <span>Powered by AI</span>
      </motion.div>
    </motion.div>
  )
}

export default Loading