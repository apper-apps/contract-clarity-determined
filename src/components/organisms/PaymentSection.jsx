import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { useSession } from '@/hooks/useSession'

const PaymentSection = () => {
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const { addPaidSummary } = useSession()
  
  useEffect(() => {
    // Check if PayPal is loaded
    if (window.paypal) {
      setIsPayPalLoaded(true)
      renderPayPalButton()
    } else {
      // Fallback for when PayPal isn't loaded
      console.warn('PayPal SDK not loaded')
    }
  }, [])
  
  const renderPayPalButton = () => {
    if (!window.paypal) return
    
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '1.00',
              currency_code: 'USD'
            },
            description: 'ContractClarity - 1 Summary Credit'
          }]
        })
      },
      onApprove: async (data, actions) => {
        setIsProcessing(true)
        try {
          const details = await actions.order.capture()
          
          // Add paid summary to session
          addPaidSummary()
          
          toast.success('Payment successful! You can now create another summary.')
          navigate('/')
        } catch (error) {
          toast.error('Payment processing failed. Please try again.')
        } finally {
          setIsProcessing(false)
        }
      },
      onError: (error) => {
        console.error('PayPal error:', error)
        toast.error('Payment failed. Please try again.')
        setIsProcessing(false)
      },
      onCancel: () => {
        toast.info('Payment cancelled')
        setIsProcessing(false)
      }
    }).render('#paypal-button-container')
  }
  
  const handleBackClick = () => {
    navigate('/')
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="card p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Zap" className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Purchase Summary Credit
          </h2>
          <p className="text-gray-600">
            You've used all your free summaries. Purchase a credit to continue.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-accent/10 to-orange-100 p-6 rounded-lg mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-3xl font-bold text-accent">$1.00</span>
            <span className="text-gray-600">USD</span>
          </div>
          <p className="text-sm text-gray-600">Per summary</p>
        </div>
        
        <div className="space-y-4">
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 mb-2">What you get:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-success" />
                <span>1 AI-powered summary</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-success" />
                <span>Copy to clipboard</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-success" />
                <span>Export to PDF/DOCX</span>
              </li>
            </ul>
          </div>
          
          <div className="pt-4">
            {isPayPalLoaded ? (
              <div>
                <div id="paypal-button-container"></div>
                {isProcessing && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center space-x-2 text-primary">
                      <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Processing payment...</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-gray-500">
                  PayPal payment system loading...
                </div>
                <Button
                  variant="primary"
                  className="w-full"
                  disabled={true}
                  loading={true}
                >
                  Loading Payment Options
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            icon="ArrowLeft"
            size="small"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentSection