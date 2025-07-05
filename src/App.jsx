import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MainPage from '@/components/pages/MainPage'
import SummaryPage from '@/components/pages/SummaryPage'
import PaymentPage from '@/components/pages/PaymentPage'
import Layout from '@/components/organisms/Layout'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App