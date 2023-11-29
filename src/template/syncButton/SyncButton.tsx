import { Animated, TouchableOpacity } from "react-native"
import { useSyncButton } from "./hooks/useSyncButton"
import { styles } from "./styles"

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

const SyncButton = () => {
  const { hasSync, isSyncing, rotate, sync } = useSyncButton()

  return (
    <TouchableOpacity style={styles.container} onPress={sync}>
      <Animated.View style={{ transform: [{ rotate: rotate }] }}>
        <MaterialIcons name="loop" size={24} color="white" />
      </Animated.View>
      {(hasSync && !isSyncing) && <FontAwesome5 name="exclamation-circle" size={16} color="orange" style={styles.refreshIcon} />}
    </TouchableOpacity>
  )
}

export { SyncButton }