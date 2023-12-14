import type { NavigationProp, RouteProp } from '@react-navigation/native'

export type HomeStackParams = {
  Home: undefined
  ProductMovement: {
    id: number
    movementType: 'in' | 'out'
    name: string
  }
}

export type RootDrawerParams = {
  HomeStackRoutes: undefined
  MovementHistory: undefined
}

export type RootStackParams = {
  Login: undefined
  RootDrawer: undefined
}

export type RootStackParamList = {
  Login: undefined
  RootDrawer: undefined
}

export type RootDrawerScreen<T extends keyof RootDrawerParams> = {
  navigation: NavigationProp<RootDrawerParams, T>
  route: RouteProp<RootDrawerParams, T>
}

export type RootRouteScreen<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>
  route: RouteProp<RootStackParamList, T>
}

export type HomeStackRouteScreen<T extends keyof HomeStackParams> = {
  navigation: NavigationProp<HomeStackParams, T>
  route: RouteProp<HomeStackParams, T>
}
