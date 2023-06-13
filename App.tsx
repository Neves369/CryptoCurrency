import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => await Font.loadAsync({
      'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    }))();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
