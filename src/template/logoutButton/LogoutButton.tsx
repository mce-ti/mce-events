import { TouchableOpacity, View } from "react-native"

import { useAuth } from "src/context/AuthContext"
import Ionicons from '@expo/vector-icons/Ionicons';

const LogOutButton = () => {
  const { logout } = useAuth();

  return (
    <TouchableOpacity onPress={logout}>
        <View>
          <Ionicons name={'exit-outline'} size={25} color={'white'} />
        </View>
    </TouchableOpacity>
  )
}

export { LogOutButton }