import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import DocumentInput from '@/components/organisms/DocumentInput'
import PricingCard from '@/components/molecules/PricingCard'
import Loading from '@/components/ui/Loading'
import { useSession } from '@/hooks/useSession'
import { summaryService } from '@/services/api/summaryService'

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { summariesUsed, maxFreeSummaries, canCreateSummary, useSummary } = useSession()
  
  const pricingPlans = [
    {
      name: 'Free Plan',
      price: 0,
      features: [
        { name: '3 free summaries', included: true },
        { name: 'Copy results', included: true },
        { name: 'Export (PDF/DOCX)', included: false },
        { name: 'Email summary', included: false }
      ],
      isActive: true
    },
    {
      name: 'Pay-Per-Summary',
      price: 1,
      features: [
        { name: 'Unlimited summaries', included: true },
        { name: 'Copy results', included: true },
        { name: 'Export (PDF/DOCX)', included: true },
        { name: 'Email summary', included: false }
      ],
      isActive: false,
      isPopular: true
    },
    {
      name: 'Pro Plan',
      price: 9.99,
      features: [
        { name: 'Unlimited summaries', included: true },
        { name: 'Copy results', included: true },
        { name: 'Export (PDF/DOCX)', included: true },
        { name: 'Email summary', included: true },
        { name: 'Priority support', included: true }
      ],
      isActive: false,
      disabled: true
    }
  ]
  
  const handleSummarize = async (content) => {
    if (!canCreateSummary()) {
      toast.error('You have reached your free summary limit. Please purchase a credit to continue.')
      navigate('/payment')
      return
    }
    
    setIsLoading(true)
    
    try {
      const summary = await summaryService.createSummary(content)
      useSummary()
      
      // Store summary in session storage for the summary page
      sessionStorage.setItem('currentSummary', JSON.stringify(summary))
      
      toast.success('Document summarized successfully!')
      navigate('/summary')
    } catch (error) {
      toast.error(error.message || 'Failed to summarize document')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handlePlanSelect = (plan) => {
    if (plan.disabled) {
      toast.info('Pro plan coming soon!')
      return
    }
    
    if (plan.name === 'Pay-Per-Summary') {
      navigate('/payment')
    } else {
      toast.info('You are already on the free plan!')
    }
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading message="AI is analyzing your document..." />
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simplify Your Legal Documents
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform complex contracts into clear, structured summaries with AI-powered analysis. 
            Get instant insights into key terms, obligations, and potential risks.
          </p>
        </motion.div>
        
        {/* Document Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <DocumentInput
            onSummarize={handleSummarize}
            disabled={!canCreateSummary()}
          />
        </motion.div>
        
        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <PricingCard
                  {...plan}
                  onSelect={() => handlePlanSelect(plan)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fast & Accurate
            </h3>
            <p className="text-gray-600">
              AI-powered analysis delivers comprehensive summaries in seconds
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Your documents are processed securely and never stored
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Professional Grade
            </h3>
            <p className="text-gray-600">
              Structured analysis designed for legal professionals
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MainPage