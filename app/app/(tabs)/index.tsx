import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Inter_900Black, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModifiableTask from '@/components/ModifiableTask';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [loaded, error] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const [create, setCreate] = useState(false);

  function normalHome() {
    setCreate(!create);
  }

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View className='items-center justify-center h-full w-full gap-8 px-10'>
        <View className='items-center justify-center w-full gap-1'>
          <Text style={{ fontFamily: 'Inter_700Bold' }} className='text-slate-800 text-[36px] tracking-tightest'>
            ToDo App
          </Text>
          <Text style={{ fontFamily: 'Inter_500Medium' }} className='text-slate-600 text-xl tracking-tightest text-center'>
            What are you going to do today?
          </Text>
        </View>

        {create === false && (
          <TouchableOpacity onPress={() => setCreate(!create)} className='w-full bg-slate-900 items-center justify-center py-3 rounded-xl flex-row gap-1.5'>
            <Ionicons name="add-outline" size={24} color="white" />
            <Text className='text-white text-lg'>
              Create a task
            </Text>
          </TouchableOpacity>
        )}

        {create === true && (
          <ModifiableTask cancelBtn={() => normalHome()} modifType="create"/>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
});
