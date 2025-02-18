import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Base = React.lazy(() => import('./views/base/Baseweb'))
const MMenu = React.lazy(() => import('./views/pages/modules/MMenu/MMenu'))
const MMenuCreate = React.lazy(() => import('./views/pages/modules/MMenu/MMenuCreate'))
const MMenuUpdate = React.lazy(() => import('./views/pages/modules/MMenu/MMenuUpdate'))
const MRole = React.lazy(() => import('./views/pages/modules/MRole/MRole'))
const MRoleCreate = React.lazy(() => import('./views/pages/modules/MRole/MRoleCreate'))
const MRoleUpdate = React.lazy(() => import('./views/pages/modules/MRole/MRoleUpdate'))
const MUser = React.lazy(() => import('./views/pages/modules/MUser/MUser'))
const MUserCreate = React.lazy(() => import('./views/pages/modules/MUser/MUserCreate'))
const MUserUpdate = React.lazy(() => import('./views/pages/modules/MUser/MUserUpdate'))

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
  { path: '/masterrole', name: 'MRole', element: MRole },
  { path: '/masterrole/create', name: 'MRoleCreate', element: MRoleCreate },
  { path: '/masterrole/update', name: 'MRoleUpdate', element: MRoleUpdate },
  { path: '/masteruser', name: 'MUser', element: MUser },
  { path: '/masteruser/create', name: 'MUserCreate', element: MUserCreate },
  { path: '/masteruser/update', name: 'MUserUpdate', element: MUserUpdate },
]

export default routes
