import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Login, MovementHistory, QrCodesHistory,  ProductMovement, InfosEstoque } from '../screens'

import { CustomDrawerContent } from './CustomDrawerContent'

import type { HomeStackParams, RootDrawerParams, RootStackParams, RootTabParams } from './routes.types'
import { useAuth } from 'src/context/AuthContext'
import { useEffect, useState } from 'react'
import { useAsyncStorage } from 'src/hooks'
import { UserStorage } from 'src/storage/storage.types'
import Ionicons from '@expo/vector-icons/Ionicons';

const Drawer = createDrawerNavigator<RootDrawerParams>()
const Tab = createBottomTabNavigator<RootTabParams>();
const HomeStack = createStackNavigator<HomeStackParams>()
const RootStack = createStackNavigator<RootStackParams>()
const AuthStack = createStackNavigator()

const HomeStackRoutes = () => (
  <HomeStack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="ProductMovement" component={ProductMovement} />
    <HomeStack.Screen name="InfosEstoque" component={InfosEstoque} />
  </HomeStack.Navigator>
)

// interface RootDrawerProps {
//   qrUser?: boolean;
// }

// export const RootDrawer: React.FC<RootDrawerProps> = ({qrUser}) => (
//   <Drawer.Navigator
//     screenOptions={{ headerShown: false, swipeEdgeWidth: 5 }}
//     drawerContent={CustomDrawerContent}
//     initialRouteName='HomeStackRoutes'
//   >
//     <Drawer.Screen name="HomeStackRoutes" options={{ drawerLabel: 'Início' }} component={HomeStackRoutes} />
//     {!qrUser && <Drawer.Screen name="MovementHistory" options={{ drawerLabel: 'Histórico' }} component={MovementHistory} />}
//     {qrUser && <Drawer.Screen name="QrCodesHistory" options={{ drawerLabel: 'Histórico Qr-Codes' }} component={QrCodesHistory} />}
 
//   </Drawer.Navigator>
// )

interface RootTabProps {
  qrUser?: boolean;
}

export const RootTab: React.FC<RootTabProps> = ({ qrUser }) => (
  <Tab.Navigator
    initialRouteName='HomeStackRoutes'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        
        if (route.name === 'HomeStackRoutes') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'MovementHistory') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'QrCodesHistory') {
          iconName = focused ? 'qr-code' : 'qr-code-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'black',
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#F1F1F1',
        paddingBottom: 8,
        paddingTop: 5,
        height: 60
      },
    })}
  >
    <Tab.Screen name="HomeStackRoutes" options={{ tabBarLabel: 'Início' }} component={HomeStackRoutes} />
    {!qrUser && <Tab.Screen name="MovementHistory" options={{ tabBarLabel: 'Histórico' }} component={MovementHistory} />}
    {qrUser && <Tab.Screen name="QrCodesHistory" options={{ tabBarLabel: 'Histórico' }} component={QrCodesHistory} />}
  </Tab.Navigator>
);

const RootRoutes = () => {

  const { user } = useAuth()

  const [id_impressora, setIdImpressora] = useState<number | undefined>(undefined);

  const { getItem } = useAsyncStorage()

  useEffect(() => {
    const logUser = async () => {
      const storedUser: UserStorage | null = await getItem('user');

      if (storedUser && storedUser.id_impressora !== null && storedUser.id_impressora !== undefined) {
        setIdImpressora(storedUser.id_impressora);
      } else {
        setIdImpressora(undefined); 
      }
    };

    logUser();
  }, [user]);
  
  if (!user) {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={Login} />
      </AuthStack.Navigator>
    )
  }

  return (
    <RootTab qrUser={id_impressora !== null && id_impressora !== undefined ? true : false} />
  )
}

export { RootRoutes }