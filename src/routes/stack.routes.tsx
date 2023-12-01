import { createStackNavigator } from '@react-navigation/stack'
import { Home, Login, ProductMovement } from '../screens'

import type { NavigationProp, RouteProp } from '@react-navigation/native'

export type RootStackParamList = {
  Home: undefined
  Login: undefined
  ProductMovement: { 
    id: number
    movementType: 'in' | 'out'
  }
}

export type RootStackNavigation<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>
  route: RouteProp<RootStackParamList, T>
}

export const Stack = createStackNavigator<RootStackParamList>();

const StackRoutes = () => (
  <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="ProductMovement" component={ProductMovement} />
  </Stack.Navigator>
)

export { StackRoutes }