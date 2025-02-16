import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Base = React.lazy(() => import('./views/base/Baseweb'))
const MMenu = React.lazy(() => import('./views/pages/modules/MMenu/MMenu'))
const MMenuCreate = React.lazy(() => import('./views/pages/modules/MMenu/MMenuCreate'))
const MMenuUpdate = React.lazy(() => import('./views/pages/modules/MMenu/MMenuUpdate'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base', name: 'Base Page', element: Base },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/mastermenu', name: 'MMenu', element: MMenu },
  { path: '/mastermenu/create', name: 'MMenuCreate', element: MMenuCreate },
  { path: '/mastermenu/update', name: 'MMenuUpdate', element: MMenuUpdate },
]

export default routes
