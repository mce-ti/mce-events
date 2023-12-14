import { View, TouchableOpacity } from 'react-native'

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'

import type { DrawerContentComponentProps } from '@react-navigation/drawer'
import { Divider } from 'src/components'
import { useAuth } from 'src/context/AuthContext'

import {  FontAwesome5 } from '@expo/vector-icons'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {

  const { logout } = useAuth()

  return (
    <DrawerContentScrollView {...props} onTouchEnd={() => props.navigation.closeDrawer()}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, paddingVertical: 10 }}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <FontAwesome5 name="times" size={20} />
        </TouchableOpacity>
      </View>
      <Divider opacity={.3} />

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