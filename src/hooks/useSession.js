import { useState, useEffect } from 'react'

export const useSession = () => {
  const [summariesUsed, setSummariesUsed] = useState(0)
  const [paidSummaries, setPaidSummaries] = useState(0)
  const maxFreeSummaries = 3
  
  useEffect(() => {
    // Load session data from localStorage
    const storedUsed = localStorage.getItem('summariesUsed')
    const storedPaid = localStorage.getItem('paidSummaries')
    
    if (storedUsed) {
      setSummariesUsed(parseInt(storedUsed, 10))
    }
    
    if (storedPaid) {
      setPaidSummaries(parseInt(storedPaid, 10))
    }
  }, [])
  
  const useSummary = () => {
    const newUsed = summariesUsed + 1
    setSummariesUsed(newUsed)
    localStorage.setItem('summariesUsed', newUsed.toString())
  }
  
  const addPaidSummary = () => {
    const newPaid = paidSummaries + 1
    setPaidSummaries(newPaid)
    localStorage.setItem('paidSummaries', newPaid.toString())
  }
  
  const canCreateSummary = () => {
    return summariesUsed < maxFreeSummaries || paidSummaries > 0
  }
  
  const isPaidUser = () => {
    return paidSummaries > 0
  }
  
  const resetSession = () => {
    setSummariesUsed(0)
    setPaidSummaries(0)
    localStorage.removeItem('summariesUsed')
    localStorage.removeItem('paidSummaries')
  }
  
  return {
    summariesUsed,
    paidSummaries,
    maxFreeSummaries,
    useSummary,
    addPaidSummary,
    canCreateSummary: canCreateSummary(),
    isPaidUser: isPaidUser(),
    resetSession
  }
}