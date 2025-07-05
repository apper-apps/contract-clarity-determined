import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const PricingCard = ({ 
  name, 
  price, 
  features, 
  isActive, 
  isPopular = false,
  onSelect,
  disabled = false 
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={`
        relative p-6 rounded-xl border-2 transition-all duration-200
        ${isPopular 
          ? 'border-primary bg-gradient-to-br from-blue-50 to-primary/5' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
        ${disabled ? 'opacity-50' : ''}
      `}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="primary" size="small">
            Most Popular
          </Badge>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">${price}</span>
          {name === 'Pro Plan' && (
            <span className="text-gray-500 ml-1">/month</span>
          )}
          {name === 'Pay-Per-Summary' && (
            <span className="text-gray-500 ml-1">/summary</span>
          )}
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <ApperIcon 
              name={feature.included ? "Check" : "X"} 
              className={`w-4 h-4 ${
                feature.included ? 'text-success' : 'text-gray-400'
              }`} 
            />
            <span className={`text-sm ${
              feature.included ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {feature.name}
            </span>
          </div>
        ))}
      </div>
      
      <Button
        variant={isPopular ? 'primary' : 'outline'}
        className="w-full"
        disabled={disabled}
        onClick={onSelect}
      >
        {disabled ? 'Coming Soon' : isActive ? 'Current Plan' : 'Choose Plan'}
      </Button>
    </motion.div>
  )
}

export default PricingCard