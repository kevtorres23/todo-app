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
  collaborators: [People],
  _id: string,
}

export default function TabTwoScreen() {
  const [tasks, setTasks] = useState<TaskBody[]>([]);
  const [removeModal, setRemoveModal] = useState(false);
  const [deletionId, setDeletionId] = useState("");

  function onRemoveTask(id: any) {
    setRemoveModal(!removeModal);

    setDeletionId(id);
  }

  const deleteTask = async (taskId: any) => {
    setRemoveModal(!removeModal);

    await axios
      .delete(`http://192.168.1.71:8080/api/task/taskDelete/${taskId}`)
      .then((response) => {
        setTasks((prevTask) => prevTask?.filter((task) => task._id !== taskId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.71:8080/api/task/taskGet");
        setTasks(response.data);

      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      {removeModal && (
        <View className='w-full h-screen bg-slate-900 opacity-80 absolute z-10 items-center justify-center px-14'>
          <View className='p-6 bg-slate-50 rounded-xl w-full items-center justify-center gap-5'>
            <Text className='text-xl font-semibold text-center'>Are you sure you want to delete this task?</Text>

            <TouchableOpacity onPress={() => deleteTask(deletionId)} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 bg-slate-900'>
              <Ionicons name='trash' size={18} color={"white"}/>
              <Text className='text-white font-semibold text-lg'>Remove task</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRemoveModal(!removeModal)} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 border border-slate-900 bg-transparent'>
              <Ionicons name='close-circle-outline' size={20} className='text-slate-900'/>
              <Text className='text-slate-900 font-semibold text-lg'>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView className='pt-12'>

        <View className='items-center justify-center h-full w-full gap-8 px-6'>
          <Text className='self-start text-[40px] font-bold tracking-[-0.1rem] text-slate-800'>My Tasks</Text>

          <View className='gap-4 pb-14'>
            {tasks?.map((task, index) => (
              <Task key={index} title={task.title} desc={task.description} collaborators={task.collaborators} onRemove={() => onRemoveTask(task._id)} />
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

