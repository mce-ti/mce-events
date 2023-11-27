import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, ProductEntry } from '../screens';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ProductEntry: undefined;
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

const StackRoutes = () => (
  <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="ProductEntry" component={ProductEntry} />
  </Stack.Navigator>
)

export { StackRoutes }