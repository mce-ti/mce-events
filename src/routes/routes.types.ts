import type { NavigationProp, RouteProp } from '@react-navigation/native'


type Produto = {
  id: number;
  id_arte: number;
  quantidade: number;
};

export type HomeStackParams = {
  Home: undefined
  ProductMovement: {
    id: number
    movementType: 'in' | 'out'
    name: string
    responsavel?: string | null
    indice_estoque: number
  }
  InfosEstoque: {
    id_estoque: number
    nome_estoque: string
    data: string
  }
  PrintRecibo: {
    produtos: Produto[]
    movementType: 'in' | 'out'
    indiceStock: number
    operador?: string
    reponsavel: string
    reponsavel_pdv: string
    assinatura?: string
  }
}

export type RootDrawerParams = {
  HomeStackRoutes: undefined
  MovementHistory: undefined
  QrCodesHistory: undefined
}

export type RootTabParams = {
  HomeStackRoutes: undefined
  MovementHistory: undefined
  QrCodesHistory: undefined
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
