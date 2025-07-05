import React, { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer, toast } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import MainPage from "@/components/pages/MainPage";
import SummaryPage from "@/components/pages/SummaryPage";
import PaymentPage from "@/components/pages/PaymentPage";

// Error Boundary Component
class ApperErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Apper SDK Error caught:', error, errorInfo);
    // Don't break the app, just log and continue
    if (error.message?.includes('canvas') || error.message?.includes('drawImage')) {
      this.setState({ hasError: false }); // Reset to continue
    }
  }

  render() {
    if (this.state.hasError && !this.state.error?.message?.includes('canvas')) {
      return this.props.children; // Always render children for canvas errors
    }
    return this.props.children;
  }
}

function App() {
  const [sdkReady, setSdkReady] = useState(false);
  
  useEffect(() => {
    // Check if SDK loaded with error
    if (window.apperSDKError) {
      toast.warn('Some features may be limited due to external service issues', {
        toastId: 'sdk-error'
      });
    }
    
    // Wait for SDK to initialize
    const checkSDK = () => {
      if (window.Apper || window.apperSDKError) {
        setSdkReady(true);
        return;
      }
      setTimeout(checkSDK, 100);
    };
    
    checkSDK();
  }, []);

  return (
    <Provider store={store}>
      <ApperErrorBoundary>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </Layout>
<ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ zIndex: 9999 }}
          />
        </Router>
      </ApperErrorBoundary>
    </Provider>
  );
}

export default App