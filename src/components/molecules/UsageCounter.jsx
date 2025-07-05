import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const UsageCounter = ({ used, total, onPurchase }) => {
  const navigate = useNavigate()
  
  const isAtLimit = used >= total
  const progress = (used / total) * 100
  
  const handlePurchaseClick = () => {
    navigate('/payment')
  }
  
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <ApperIcon name="FileText" className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          Summaries used: {used}/{total}
        </span>
      </div>
      
      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            isAtLimit ? 'bg-error' : progress > 66 ? 'bg-warning' : 'bg-success'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {isAtLimit && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="accent"
            size="small"
            onClick={handlePurchaseClick}
            icon="Zap"
            className="text-xs"
          >
            Buy 1 Summary
          </Button>
        </motion.div>
      )}
    </div>
  )
}

export default UsageCounter