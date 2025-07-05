import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import InfoBox from '@/components/molecules/InfoBox'

const InfoSidebar = ({ isOpen, onClose }) => {
  const infoItems = [
    {
      type: 'error',
      title: 'Educational Purpose Only',
      content: 'This tool is for educational purposes and is not a substitute for professional legal advice.',
      icon: 'AlertTriangle'
    },
    {
      type: 'success',
      title: 'Privacy Protection',
      content: 'We do not store any uploaded files or personal information. All processing happens temporarily.',
      icon: 'Shield'
    },
    {
      type: 'info',
      title: 'Accuracy Notice',
      content: 'Always review the original document. Summaries may not capture all nuances of legal language.',
      icon: 'Eye'
    }
  ]
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Information</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {infoItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <InfoBox {...item} />
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-primary/5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">How It Works</h3>
                <ol className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="font-medium text-primary">1.</span>
                    <span>Upload your PDF or DOCX file, or paste text directly</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-medium text-primary">2.</span>
                    <span>AI analyzes and extracts key legal information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-medium text-primary">3.</span>
                    <span>Review structured summary with categorized sections</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-medium text-primary">4.</span>
                    <span>Copy results or export (with paid plan)</span>
                  </li>
                </ol>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default InfoSidebar