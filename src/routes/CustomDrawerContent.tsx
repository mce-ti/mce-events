import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'

import type { DrawerContentComponentProps } from '@react-navigation/drawer'
import { Divider } from 'src/components'
import { useAuth } from 'src/context/AuthContext'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {

  const { logout } = useAuth()

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
  
      <Divider opacity={.3} />
  
      <DrawerItem
        label="Sair"
        onPress={logout}
      />
    </DrawerContentScrollView>
  )
}

export { CustomDrawerContent }