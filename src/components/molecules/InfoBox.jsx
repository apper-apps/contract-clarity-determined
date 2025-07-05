import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const InfoBox = ({ 
  type = 'info', 
  title, 
  content, 
  icon,
  className = '' 
}) => {
  const variants = {
    info: 'info-box-blue',
    warning: 'info-box-yellow',
    error: 'info-box-red',
    success: 'info-box-green',
    gray: 'info-box-gray'
  }
  
  const icons = {
    info: 'Info',
    warning: 'AlertTriangle',
    error: 'AlertCircle',
    success: 'CheckCircle',
    gray: 'FileText'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`info-box ${variants[type]} ${className}`}
    >
      <div className="flex items-start space-x-3">
        {icon && (
          <ApperIcon 
            name={icon || icons[type]} 
            className="w-5 h-5 flex-shrink-0 mt-0.5" 
          />
        )}
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-2">{title}</h4>
          )}
          <div className="text-sm">
            {Array.isArray(content) ? (
              <ul className="space-y-1">
                {content.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-current mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default InfoBox