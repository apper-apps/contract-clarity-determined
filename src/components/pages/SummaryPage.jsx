import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SummaryDisplay from '@/components/organisms/SummaryDisplay'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const SummaryPage = () => {
  const [summary, setSummary] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    const loadSummary = () => {
      try {
        const storedSummary = sessionStorage.getItem('currentSummary')
        if (storedSummary) {
          setSummary(JSON.parse(storedSummary))
        } else {
          setError('No summary found. Please create a new summary.')
        }
      } catch (error) {
        setError('Failed to load summary data.')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadSummary()
  }, [])
  
  const handleNewSummary = () => {
    // Clear stored summary
    sessionStorage.removeItem('currentSummary')
    navigate('/')
  }
  
  const handleRetry = () => {
    navigate('/')
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading message="Loading your summary..." />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Error
          message={error}
          onRetry={handleRetry}
        />
      </div>
    )
  }
  
  if (!summary) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Empty
          title="No Summary Available"
          message="We couldn't find a summary to display. Please create a new summary to get started."
          actionLabel="Create New Summary"
          onAction={handleNewSummary}
          icon="FileText"
        />
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <SummaryDisplay
        summary={summary}
        onNewSummary={handleNewSummary}
      />
    </motion.div>
  )
}

export default SummaryPage