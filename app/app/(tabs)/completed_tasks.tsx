import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Task from '@/components/Task';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCompletedTasks } from '@/store/storeCompletedTasks';

export default function TabTwoScreen() {
  const [removeModal, setRemoveModal] = useState(false);
  const [deletionId, setDeletionId] = useState("");
  const completedTasks = useCompletedTasks(state => state.list);
  const resetStorage = useCompletedTasks(state => state.reset);
  const removeTask = useCompletedTasks(state => state.removeTask);

  function onRemoveTask(id: any) {
    setRemoveModal(!removeModal);
    setDeletionId(id);
  }

  function deleteTask(taskId: any, markAsCompleted: boolean) {
    if (markAsCompleted === false) {
      setRemoveModal(!removeModal);
    }
    removeTask(taskId);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {removeModal && (
        <View className='w-full h-screen bg-slate-900 opacity-80 absolute z-10 items-center justify-center px-14'>
          <View className='p-6 bg-slate-50 rounded-xl w-full items-center justify-center gap-5'>
            <Text className='text-xl font-semibold text-center'>Are you sure you want to delete this task?</Text>

            <TouchableOpacity onPress={() => { deleteTask(deletionId, false) }} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 bg-slate-900'>
              <Ionicons name='trash' size={18} color={"white"} />
              <Text className='text-white font-semibold text-lg'>Remove task</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRemoveModal(!removeModal)} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 border border-slate-900 bg-transparent'>
              <Ionicons name='close-circle-outline' size={20} className='text-slate-900' />
              <Text className='text-slate-900 font-semibold text-lg'>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView className='py-8'>

        <View className='items-center justify-center h-full w-full gap-6 px-6'>

          <View className='flex-col h-full w-full gap-6'>
            <Text className='self-start text-[40px] font-bold tracking-[-0.1rem] text-slate-800'>Done Tasks</Text>

            <View className='pending-section w-full bg-[rgb(219,39,119,0.15)] bg-op py-4 px-4 rounded-xl justify-between flex-row items-center'>
              <View className='items-center gap-2 flex-row'>
                <View className='w-2 h-2 bg-rose-600 rounded-full'></View>
                <Text className='text-rose-600 font-semibold text-xl'>Completed</Text>
              </View>

              <TouchableOpacity>
                <Ionicons name='chevron-down' size={24} color={"rgb(219,39,119)"} />
              </TouchableOpacity>
            </View>

            {completedTasks.map((task, index) => (
              <Task key={index} isCompleted={true} tags={task.tags} title={task.title} desc={task.description} collaborators={task.collaborators} onRemove={() => onRemoveTask(index)} />
            ))}

            {completedTasks.length > 0 && (
              <TouchableOpacity className='w-full bg-slate-900 py-3 items-center justify-center rounded-xl' onPress={resetStorage}>
                <Text className='text-white font-medium'>
                  Clear all
                </Text>
              </TouchableOpacity>
            )}
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

