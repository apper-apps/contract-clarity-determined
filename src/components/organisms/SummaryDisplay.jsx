import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import InfoBox from '@/components/molecules/InfoBox'
import ApperIcon from '@/components/ApperIcon'
import { useSession } from '@/hooks/useSession'

const SummaryDisplay = ({ summary, onNewSummary }) => {
  const navigate = useNavigate()
  const { isPaidUser } = useSession()
  
  const handleCopy = async () => {
    try {
      const fullSummary = `
${summary.summaryText}

Key Points:
${summary.keyPoints.map(point => `• ${point}`).join('\n')}

Important Terms:
${summary.importantTerms.map(term => `• ${term}`).join('\n')}

Potential Concerns:
${summary.potentialConcerns.map(concern => `• ${concern}`).join('\n')}
      `.trim()
      
      await navigator.clipboard.writeText(fullSummary)
      toast.success('Summary copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy summary')
    }
  }
  
  const handleDownload = () => {
    if (!isPaidUser) {
      toast.error('Download feature requires a paid plan')
      return
    }
    
    // Implement download functionality
    toast.info('Download feature coming soon!')
  }
  
  const handleEmail = () => {
    toast.info('Email feature available in Pro plan (coming soon)')
  }
  
  const handleNewSummary = () => {
    onNewSummary()
    navigate('/')
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Success Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-success to-green-600 text-white p-4 rounded-lg text-center"
      >
        <div className="flex items-center justify-center space-x-2">
          <ApperIcon name="CheckCircle" className="w-5 h-5" />
          <span className="font-semibold">Summarized Successfully</span>
        </div>
      </motion.div>
      
      {/* Main Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Document Summary</h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-base leading-relaxed">{summary.summaryText}</p>
        </div>
      </motion.div>
      
      {/* Information Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InfoBox
            type="gray"
            title="Key Points"
            content={summary.keyPoints}
            icon="FileText"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <InfoBox
            type="warning"
            title="Important Terms"
            content={summary.importantTerms}
            icon="AlertTriangle"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <InfoBox
            type="error"
            title="Potential Concerns"
            content={summary.potentialConcerns}
            icon="AlertCircle"
          />
        </motion.div>
      </div>
      
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-4 pt-6"
      >
        <Button
          variant="primary"
          onClick={handleCopy}
          icon="Copy"
        >
          Copy Summary
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleDownload}
          icon="Download"
          disabled={!isPaidUser}
        >
          {isPaidUser ? 'Download PDF' : 'Download (Paid)'}
        </Button>
        
        <Button
          variant="ghost"
          onClick={handleEmail}
          icon="Mail"
          disabled={true}
        >
          Email Summary (Pro)
        </Button>
        
        <Button
          variant="accent"
          onClick={handleNewSummary}
          icon="Plus"
        >
          New Summary
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default SummaryDisplay