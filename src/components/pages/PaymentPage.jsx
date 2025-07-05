import { motion } from 'framer-motion'
import PaymentSection from '@/components/organisms/PaymentSection'

const PaymentPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Continue Your Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Purchase a summary credit to unlock powerful document analysis features
          </p>
        </motion.div>
        
        <PaymentSection />
      </div>
    </motion.div>
  )
}

export default PaymentPage