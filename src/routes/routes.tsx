import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Home, Login, MovementHistory, QrCodesHistory,  ProductMovement } from '../screens'

import { CustomDrawerContent } from './CustomDrawerContent'

import type { HomeStackParams, RootDrawerParams, RootStackParams } from './routes.types'
import { useAuth } from 'src/context/AuthContext'
import { useQrCodeStore } from 'src/stores/qrCodesStore'

const Drawer = createDrawerNavigator<RootDrawerParams>()
const HomeStack = createStackNavigator<HomeStackParams>()
const RootStack = createStackNavigator<RootStackParams>()
const AuthStack = createStackNavigator()

const HomeStackRoutes = () => (
  <HomeStack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="ProductMovement" component={ProductMovement} />
  </HomeStack.Navigator>
)

export const RootDrawer = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false, swipeEdgeWidth: 5 }}
    drawerContent={CustomDrawerContent}
    initialRouteName='HomeStackRoutes'
  >
    <Drawer.Screen name="HomeStackRoutes" options={{ drawerLabel: 'Início' }} component={HomeStackRoutes} />
    <Drawer.Screen name="MovementHistory" options={{ drawerLabel: 'Histórico' }} component={MovementHistory} />
    <Drawer.Screen name="QrCodesHistory" options={{ drawerLabel: 'Histórico Qr-Codes' }} component={QrCodesHistory} />
 
  </Drawer.Navigator>
)

const RootRoutes = () => {

  const { user } = useAuth()

  if (!user) {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={Login} />
      </AuthStack.Navigator>
    )
  }

  return (
    <RootDrawer />
  )
}

export { RootRoutes }