import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No content available",
  message = "Get started by adding some content.",
  actionLabel = "Get Started",
  onAction,
  icon = "FileText"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-blue-100 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <ApperIcon name={icon} className="w-8 h-8 text-primary" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          
          {onAction && (
            <Button
              variant="primary"
              onClick={onAction}
              icon="Plus"
            >
              {actionLabel}
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Empty