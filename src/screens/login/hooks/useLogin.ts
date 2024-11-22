import { useEffect, useState } from 'react'
import { AwesomeAlertProps, useAsyncStorage } from "src/hooks"
import { apiAuth } from 'src/services/api'

import type { UserStorage } from 'src/storage/storage.types'

import { useFormik } from 'formik'
import { useAuth } from 'src/context/AuthContext'
import { useMovementStore, useOperatorsStore } from 'src/stores'
import { useArtsStore } from 'src/stores/artsStore'
import { useStockStore } from 'src/stores/stockStore'
import { hasNetwork } from "src/utils/net"
import { Alert, Linking } from 'react-native'
import Constants from 'expo-constants';

type useLoginProps = {
  showAlert: (arg0: AwesomeAlertProps) => void
}

const useLogin = ({ showAlert }: useLoginProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { getItem, setItem } = useAsyncStorage()
  const { login } = useAuth()

  const syncMovements = useMovementStore(state => state.sync)
  const calculateTotalStock = useMovementStore(state => state.calculateTotalStock)
  const calculateTotalSubStock = useMovementStore(state => state.calculateTotalSubStock)
  const syncOperators = useOperatorsStore(state => state.syncOperators)
  const syncArts = useArtsStore(state => state.syncArts)
  const syncStock = useStockStore(state => state.syncStock)
  const syncStockLimpos = useStockStore(state => state.syncStockLimpos)
  const syncStockRel = useStockStore(state => state.syncStockRel)
  const syncStockInfos = useStockStore(state => state.syncStockInfos)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async values => {
      setIsLoading(true)

      const response = await apiAuth.login(values)

      if(response) {
        if ('message' in response && response.status === "error") {
          setIsLoading(false)
          showAlert({
            show: true,
            title: 'Erro',
            message: response.message,
            confirmText: 'Entendi',
          })
  
          return;
        }

        if(!response.data) {
          setIsLoading(false)
          
          showAlert({
            show: true,
            title: 'Erro',
            message: response.message,
            confirmText: 'Entendi',
          })

          return;
        }

        const { evento, usuario } = response.data;
  
        await setItem('event', evento)
        await setItem('user', usuario)
  
        await syncArts()
        await syncMovements()
        await syncOperators()
        await syncStock()
        await syncStockLimpos()
        await syncStockRel()
        await syncStockInfos()
        await calculateTotalStock();
        await calculateTotalSubStock();
  
        login(usuario.id)
      } 
    }
  })

  const verifyUserIsLogged = async () => {
    setIsLoading(true)
    const user: UserStorage | null = await getItem('user')

    await syncArts();
    await syncOperators();
    await syncMovements();
    await syncStock();
    await syncStockLimpos();
    await syncStockRel();
    await syncStockInfos();
    await calculateTotalStock();
    await calculateTotalSubStock();

    user && login(user.id)
    setIsLoading(false)
  }

  const openDownloadLink = () => {
    const url = 'https://play.google.com/store/apps/details?id=com.tsunakyz.mceevents';

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("URL inválida: " + url);
        }
      })
      .catch((err) => console.error("Erro ao abrir o link:", err));
  };

  useEffect(() => {
    const checkVersionAndLogin = async () => {
      if (await hasNetwork()) {
        const response = await apiAuth.getLastedAppVersion();
        const appCurrentVersion = Constants.expoConfig?.version;
  
        if (response.version && response.version !== appCurrentVersion) {
          await setItem('event', '');
          await setItem('user', '');

          Alert.alert(
            'Atualização disponível!',
            'Uma nova versão do aplicativo está disponível. Por favor, atualize para continuar!',
            [
              { text: 'Atualizar', onPress: () => openDownloadLink() },
            ]
          );
          
          return;
        }
      } else {
        showAlert({
          show: true,
          title: 'Alerta',
          message: 'Você está desconectado da internet. Por favor, verifique sua conexão!',
          confirmText: 'Entendi',
        });
      }

      verifyUserIsLogged();
    };

    checkVersionAndLogin();
  }, [])

  return {
    isLoading,
    formik,
    openDownloadLink
  }
}

export { useLogin }