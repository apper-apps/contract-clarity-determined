import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import UsageCounter from '@/components/molecules/UsageCounter'
import { useSession } from '@/hooks/useSession'

const Header = ({ onInfoClick }) => {
  const { summariesUsed, maxFreeSummaries } = useSession()
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileText" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ContractClarity</h1>
              <p className="text-xs text-gray-500">AI Legal Document Summarizer</p>
            </div>
          </motion.div>
        </div>
        
        <div className="flex items-center space-x-6">
          <UsageCounter 
            used={summariesUsed} 
            total={maxFreeSummaries}
          />
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onInfoClick}
            className="p-2 text-gray-500 hover:text-primary transition-colors duration-200 rounded-full hover:bg-blue-50"
          >
            <ApperIcon name="Info" className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header