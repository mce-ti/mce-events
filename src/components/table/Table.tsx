import { StyleSheet, Text, View } from "react-native"

type TableColumn<T> = {
  label: string | number
  value: keyof T
  flex?: number
}

type TableData<T> = {
  [K in keyof T]: T[K]
}

type TableProps<T> = {
  columns: TableColumn<T>[]
  data: TableData<T>[]
}

const Table = <T extends {}>({ data, columns }: TableProps<T>) => {

  return (
    <View style={styles.container}>
      <View style={styles.thead}>
        {columns.map(({ label, value, flex }, idx) => (
          <Text
            key={`table-th-${value.toString()}-${idx}`}
            style={[styles.th, !!flex && { flex }]}
          >
            {label}
          </Text>
        ))}
      </View>

      <View>
        {data.map((item, idx) => (
          <View key={`table-tr-${idx}`} style={styles.tr}>
            {columns.map((column, cIdx) => (
              <Text
                key={`table-td-${idx}-${column.value.toString()}-${cIdx}`}
                style={[styles.td, { flex: column.flex || 1 }]}
              >
                {item[column.value as keyof T]?.toString()} 
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  thead: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#172554'
  },
  th: {
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontWeight: '600',
    flex: 1
  },
  tbody: {
    width: '100%',
  },
  tr: {
    flexDirection: 'row',
  },
  td: {
    color: '#172554'
  }
})

export { Table }