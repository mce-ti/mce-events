import { useState, useEffect, memo } from 'react'
import AwesomeAlert from "react-native-awesome-alerts"

export type AwesomeAlertProps = {
  show: boolean
  showProgress?: boolean
  title: string
  message?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
}

export const useAwesomeAlert = () => {
  const [alertProps, setAlertProps] = useState<AwesomeAlertProps>({
    show: false,
    title: '',
  })

  const showAlert = (props: AwesomeAlertProps) => {
    console.log(props)
    setAlertProps(props)
  }

  const hideAlert = () => {
    setAlertProps({
      show: false,
      title: '',
    })
  }

  const AwesomeAlertComponent = () => (
    <AwesomeAlert
      show={alertProps.show}
      showProgress={!!alertProps.showProgress}
      title={alertProps.title}
      message={alertProps.message}
      confirmText={alertProps.confirmText || 'OK'}
      showConfirmButton
      onDismiss={hideAlert}
      onCancelPressed={() => {
        hideAlert()
        alertProps.onCancel?.()
      }}
      onConfirmPressed={() => {
        hideAlert()
        alertProps.onConfirm?.()
      }}
      confirmButtonColor="#2563eb"
      closeOnTouchOutside={true}
    />
  )

  return {
    showAlert,
    AwesomeAlertComponent,
  }
}
