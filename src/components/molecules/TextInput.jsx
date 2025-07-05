import { useState } from 'react'
import { motion } from 'framer-motion'
import Label from '@/components/atoms/Label'

const TextInput = ({ 
  value, 
  onChange, 
  disabled = false, 
  maxLength = 10000,
  placeholder = "Paste your contract text here..." 
}) => {
  const [isFocused, setIsFocused] = useState(false)
  
  const handleChange = (e) => {
    const newValue = e.target.value
    if (newValue.length <= maxLength) {
      onChange(newValue)
    }
  }
  
  const characterCount = value.length
  const isNearLimit = characterCount > maxLength * 0.9
  
  return (
    <div className="w-full">
      <Label htmlFor="contract-text">Contract Text</Label>
      <div className="relative">
        <motion.textarea
          id="contract-text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full h-64 px-4 py-3 border rounded-lg resize-none transition-all duration-200
            ${isFocused 
              ? 'border-primary ring-2 ring-primary ring-opacity-20' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            focus:outline-none
          `}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <span className={`text-xs ${isNearLimit ? 'text-warning' : 'text-gray-500'}`}>
            {characterCount.toLocaleString()} / {maxLength.toLocaleString()}
          </span>
        </div>
      </div>
      
      {isNearLimit && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-warning mt-1"
        >
          Approaching character limit
        </motion.p>
      )}
    </div>
  )
}

export default TextInput