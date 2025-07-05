import { generateId } from '@/utils/helpers'

const MOCK_DELAY = 800

const mockSummaryData = {
  summaryText: "This contract establishes a comprehensive service agreement between the parties with clearly defined terms and conditions. The document outlines payment structures, performance obligations, and termination procedures. Key provisions include intellectual property rights, confidentiality requirements, and dispute resolution mechanisms. The agreement includes standard liability limitations and includes renewal options for continued engagement.",
  keyPoints: [
    "Service delivery timeline is 30 days from contract execution",
    "Payment terms require 50% upfront with balance due upon completion",
    "Both parties retain rights to their respective intellectual property",
    "90-day notice required for contract termination",
    "Confidentiality provisions extend 2 years beyond contract end"
  ],
  importantTerms: [
    "Force majeure clause protects both parties from unforeseeable circumstances",
    "Governing law specified as the jurisdiction of contract execution",
    "Dispute resolution through binding arbitration required",
    "Limitation of liability capped at total contract value",
    "Automatic renewal clause unless terminated with proper notice"
  ],
  potentialConcerns: [
    "Broad indemnification clause may create unexpected liability exposure",
    "Termination penalties could be substantial if not properly managed",
    "Intellectual property ownership terms may be ambiguous in certain scenarios",
    "Payment schedule heavily favors the service provider",
    "Limited recourse for performance issues or delays"
  ]
}

export const summaryService = {
  async createSummary(content) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    
    if (!content || content.trim().length < 50) {
      throw new Error('Document content is too short to analyze effectively')
    }
    
    // In a real implementation, this would call the AI service
    // For now, return mock data with some variation
    const summary = {
      Id: generateId(),
      inputType: 'text',
      originalText: content,
      timestamp: new Date(),
      ...mockSummaryData
    }
    
    return summary
  },
  
  async getSummary(id) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    
    // In a real implementation, this would fetch from storage
    throw new Error('Summary not found')
  },
  
  async exportSummary(id, format) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    
    // In a real implementation, this would generate and return file
    throw new Error('Export feature not yet implemented')
  },
  
  async emailSummary(id, email) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    
    // In a real implementation, this would send email
    throw new Error('Email feature not yet implemented')
  }
}