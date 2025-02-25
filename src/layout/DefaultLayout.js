import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useLocation } from 'react-router-dom'
import { localStorageKey, localStorageService } from '../utils/localStorageService'
import { useDispatch } from 'react-redux'

const DefaultLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    const getLocalData = async () => {
      const menusPrivilage = await localStorageService.getData(localStorageKey.user)
      for (const MenuGroup of menusPrivilage.role.menu_group) {
        for (const menusDetail of MenuGroup.menu_group_detail) {
          if (menusDetail.menu.route == location.pathname.split('/')[1]) {
            dispatch({ type: 'set', menuPrivilage: menusDetail })
          }
        }
      }
    }
    getLocalData()
  }, [dispatch, location.pathname])
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
}

export default DefaultLayout
