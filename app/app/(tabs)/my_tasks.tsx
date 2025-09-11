import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Task from '@/components/Task';
import Ionicons from '@expo/vector-icons/Ionicons';

type People = {
  name: string,
  picture: string,
}

type TaskBody = {
  title: string,
  description: string,
  collaborators: [People];
}

export default function TabTwoScreen() {
  const [tasks, setTasks] = useState<TaskBody[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.71:8080/api/task/taskGet");
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView className='pt-12'>
        <View className='items-center justify-center h-full w-full gap-8 px-6'>
          <Text className='self-start text-[40px] font-bold tracking-[-0.1rem] text-slate-800'>My Tasks</Text>

          <View className='gap-4 pb-14'>
            {tasks?.map((task, index) => (
              <Task key={index} title={task.title} desc={task.description} collaborators={task.collaborators} />
            ))}
          </View>
        </View>
      </ScrollView>
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

