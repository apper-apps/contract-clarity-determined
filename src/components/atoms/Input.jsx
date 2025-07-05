import { forwardRef } from 'react'

const Input = forwardRef(({ 
  type = 'text', 
  placeholder = '', 
  className = '',
  error = false,
  ...props 
}, ref) => {
  const baseClasses = 'input-field'
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : ''
  
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input