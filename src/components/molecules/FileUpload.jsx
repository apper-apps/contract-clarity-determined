import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const FileUpload = ({ onFileSelect, disabled = false, accept = ".pdf,.docx" }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  
  const handleFileSelect = (file) => {
    if (!file) return
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a PDF or DOCX file')
      return
    }
    
    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB')
      return
    }
    
    setSelectedFile(file)
    onFileSelect(file)
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }
  
  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (disabled) return
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }
  
  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleRemoveFile = () => {
    setSelectedFile(null)
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />
      
      {selectedFile ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-2 border-dashed border-green-300 rounded-lg bg-green-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ApperIcon name="FileText" className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-green-800">{selectedFile.name}</p>
                <p className="text-sm text-green-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="small"
              onClick={handleRemoveFile}
              icon="X"
              className="text-green-600 hover:text-green-800"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative p-8 border-2 border-dashed rounded-lg text-center transition-all duration-200
            ${isDragging 
              ? 'border-primary bg-blue-50 scale-105' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={!disabled ? handleBrowseClick : undefined}
          whileHover={!disabled ? { scale: 1.02 } : {}}
        >
          <div className="flex flex-col items-center space-y-4">
            <ApperIcon 
              name="Upload" 
              className={`w-12 h-12 ${isDragging ? 'text-primary' : 'text-gray-400'}`} 
            />
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragging ? 'Drop your file here' : 'Choose a file or drag & drop'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                PDF or DOCX files only, up to 10MB
              </p>
            </div>
            <Button
              variant="outline"
              size="small"
              disabled={disabled}
              className="pointer-events-none"
            >
              Browse Files
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default FileUpload