import type { NavigationProp, RouteProp } from '@react-navigation/native'

export type HomeStackParams = {
  Home: undefined
  ProductMovement: {
    id: number
    movementType: 'in' | 'out'
  }
}

export type RootDrawerParams = {
  HomeStackRoutes: undefined
}

export type RootStackParams = {
  Login: undefined
  RootDrawer: undefined
}

export type RootStackParamList = {
  Login: undefined
  RootDrawer: undefined
}

export type RootRouteScreen<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>
  route: RouteProp<RootStackParamList, T>
}

export type HomeStackRouteScreen<T extends keyof HomeStackParams> = {
  navigation: NavigationProp<HomeStackParams, T>
  route: RouteProp<HomeStackParams, T>
}