import { useState } from 'react'
import Header from '@/components/organisms/Header'
import InfoSidebar from '@/components/organisms/InfoSidebar'

const Layout = ({ children }) => {
  const [isInfoSidebarOpen, setIsInfoSidebarOpen] = useState(false)
  
  const handleInfoClick = () => {
    setIsInfoSidebarOpen(true)
  }
  
  const handleCloseSidebar = () => {
    setIsInfoSidebarOpen(false)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onInfoClick={handleInfoClick} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <InfoSidebar 
        isOpen={isInfoSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </div>
  )
}

export default Layout