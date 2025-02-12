import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DefaultLayout = () => {
  const auth = useSelector((state) => state.isAuthenticated)
  if (auth) {
    return (
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    )
  } else {
    return <Navigate to={'/login'} />
  }
}

export default DefaultLayout
