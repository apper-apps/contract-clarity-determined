import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import FileUpload from '@/components/molecules/FileUpload'
import TextInput from '@/components/molecules/TextInput'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const DocumentInput = ({ onSummarize, disabled = false }) => {
  const [inputType, setInputType] = useState('file') // 'file' or 'text'
  const [selectedFile, setSelectedFile] = useState(null)
  const [textContent, setTextContent] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const handleInputTypeChange = (type) => {
    setInputType(type)
    setSelectedFile(null)
    setTextContent('')
  }
  
  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }
  
  const handleTextChange = (text) => {
    setTextContent(text)
  }
  
  const handleSummarize = async () => {
    if (inputType === 'file' && !selectedFile) {
      toast.error('Please select a file to summarize')
      return
    }
    
    if (inputType === 'text' && !textContent.trim()) {
      toast.error('Please enter text to summarize')
      return
    }
    
    setIsProcessing(true)
    
    try {
      let content = ''
      
      if (inputType === 'file') {
        // Extract text from file
        content = await extractTextFromFile(selectedFile)
      } else {
        content = textContent
      }
      
      if (!content.trim()) {
        throw new Error('No text content found to summarize')
      }
      
      await onSummarize(content)
    } catch (error) {
      toast.error(error.message || 'Failed to process document')
    } finally {
      setIsProcessing(false)
    }
  }
  
  const extractTextFromFile = async (file) => {
    // This is a placeholder for file text extraction
    // In a real implementation, you would use libraries like pdf-parse or mammoth
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        // This is a simplified text extraction
        // Real implementation would properly parse PDF/DOCX
        const text = e.target.result
        resolve(text || 'Sample contract text extracted from uploaded file.')
      }
      reader.readAsText(file)
    })
  }
  
  const canSummarize = () => {
    if (disabled || isProcessing) return false
    return inputType === 'file' ? selectedFile : textContent.trim()
  }
  
  return (
    <div className="space-y-6">
      {/* Input Type Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          variant={inputType === 'file' ? 'primary' : 'ghost'}
          onClick={() => handleInputTypeChange('file')}
          icon="Upload"
          size="small"
          disabled={disabled}
        >
          Upload File
        </Button>
        <Button
          variant={inputType === 'text' ? 'primary' : 'ghost'}
          onClick={() => handleInputTypeChange('text')}
          icon="FileText"
          size="small"
          disabled={disabled}
        >
          Paste Text
        </Button>
      </div>
      
      {/* Input Content */}
      <div className="grid grid-cols-1 gap-6">
        {inputType === 'file' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upload Document
            </h3>
            <FileUpload
              onFileSelect={handleFileSelect}
              disabled={disabled}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Paste Contract Text
            </h3>
            <TextInput
              value={textContent}
              onChange={handleTextChange}
              disabled={disabled}
            />
          </motion.div>
        )}
      </div>
      
      {/* Summarize Button */}
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="large"
          onClick={handleSummarize}
          disabled={!canSummarize()}
          loading={isProcessing}
          icon="Zap"
          className="px-12"
        >
          {isProcessing ? 'Processing...' : 'Summarize Document'}
        </Button>
      </div>
    </div>
  )
}

export default DocumentInput