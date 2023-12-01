import { Animated, TouchableOpacity, View } from "react-native"
import { useSyncButton } from "./hooks/useSyncButton"
import { styles } from "./styles"

import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

const SyncButton = () => {
  const { hasSync, isSyncing, rotate, sync } = useSyncButton()

  return (
    <TouchableOpacity style={styles.container} onPress={sync}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <MaterialIcons name="loop" size={24} color="white" />
      </Animated.View>
      {(hasSync && !isSyncing) && <FontAwesome5 name="exclamation-circle" size={16} color="orange" style={styles.refreshIcon} />}
      {(!hasSync && !isSyncing) && (
        <>
          <View style={styles.insideCheckIcon} />
          <MaterialIcons name="check-circle" size={18} color="#16a34a" style={styles.refreshIcon} />
        </>
      )}
    </TouchableOpacity>
  )
}

export { SyncButton }