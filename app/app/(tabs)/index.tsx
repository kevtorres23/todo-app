import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Inter_900Black, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModifiableTask from '@/components/ModifiableTask';

SplashScreen.preventAutoHideAsync();

type People = {
  name: string,
  picture: string,
}

type TaskBody = {
  title: string,
  description: string,
  contributors: People[];
}


export default function HomeScreen() {
  const [loaded, error] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const [create, setCreate] = useState(false);
  const [finishedCreation, setFinishedCreation] = useState(false);

  function normalHome() {
    setCreate(!create);
  }

  function createdTask() {
    setFinishedCreation(true);
    setCreate(!create);
  }

  function onCreatePressed() {
    setCreate(!create);
    setFinishedCreation(false);
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
      <View className='items-center justify-center h-full w-full px-10 gap-6'>

        <View className='flex-col gap-2 items-center justify-center w-full'>
          <Text style={{ fontFamily: 'Inter_700Bold' }} className='text-slate-800 text-[36px] tracking-tightest'>
            ToDo App
          </Text>

          <Text style={{ fontFamily: 'Inter_500Medium' }} className='text-slate-600 text-xl tracking-tightest text-center'>
            What are you going to do today?
          </Text>
        </View>

        {finishedCreation && (
          <View className='bg-green-100 px-4 py-4 w-full items-center justify-center flex-col rounded-xl'>
            <View className='flex-row gap-2 items-center justify-center'>
              <Ionicons name="checkmark-circle-outline" size={32} color={"#16a34a"} />
              <Text style={{ fontFamily: 'Inter_500Medium' }} className='rounded-xl text-green-600 text-xl font-bold tracking-tightest text-center'>
                Task created successfully!
              </Text>
            </View>
          </View>
        )}

        {create === false && (
          <TouchableOpacity onPress={() => onCreatePressed()} className='w-full bg-slate-900 items-center justify-center py-3 rounded-xl flex-row gap-1.5'>
            <Ionicons name="add-outline" size={24} color="white" />
            <Text className='text-white text-lg'>
              Create a task
            </Text>
          </TouchableOpacity>
        )}

        {create === true && (
          <ModifiableTask cancelBtn={() => normalHome()} onFinished={createdTask} modifType="create" />
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
