import { CNavGroup, CNavItem } from '@coreui/react'
import { localStorageKey, localStorageService } from './utils/localStorageService'

const _nav = () => {
  let userData = localStorageService.getData(localStorageKey.user)
  let menu = []
  userData.role.menu_group.map((menuGroup) => {
    if (menuGroup.menu_group_detail.length == 1) {
      menu.push({
        component: CNavItem,
        name: menuGroup.menu_group_detail[0].menu.name,
        to: `/${menuGroup.menu_group_detail[0].menu.route}`,
      })
    } else {
      let dataMenuGroup = {
        component: CNavGroup,
        name: menuGroup.name,
        to: `/${menuGroup.name}`,
        items: [],
      }
      menuGroup.menu_group_detail.map((menuChild) => {
        dataMenuGroup.items.push({
          component: CNavItem,
          name: menuChild.menu.name,
          to: `/${menuChild.menu.route}`,
        })
      })
      menu.push(dataMenuGroup)
    }
  })
  return [
    // {
    //   component: CNavItem,
    //   name: 'Dashboard',
    //   to: '/dashboard',
    //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Base',
    //   to: '/base',
    //   icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavTitle,
    //   name: 'Theme',
    // },
    // {
    //   component: CNavItem,
    //   name: 'Colors',
    //   to: '/theme/colors',
    //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Typography',
    //   to: '/theme/typography',
    //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    // },
    ...menu,
  ]
}

export default _nav
