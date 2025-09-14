import { useEffect, useState } from 'react';
import { Platform, StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import Task from '@/components/Task';
import Ionicons from '@expo/vector-icons/Ionicons';
import EditableTask from '@/components/EditableTask';
import { useCompletedTasks } from '@/store/storeCompletedTasks';
import filter from "lodash.filter";

type People = {
  name: string,
  picture: string,
}

type tagColors = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

type Tags = {
  name: string,
  color: tagColors,
}

type TaskBody = {
  tags: [Tags],
  title: string,
  description: string,
  collaborators: [People],
  _id: string,
}

type Tasks = {
  tags: [Tags],
  title: string,
  description: string,
  collaborators: [People],
}

export default function TabTwoScreen() {

  const [tasks, setTasks] = useState<any[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [removeModal, setRemoveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deletionId, setDeletionId] = useState("");
  const [editionId, setEditionId] = useState("");
  const addTask = useCompletedTasks(state => state.addTask);
  const [completionMsg, setCompletionMsg] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  function onRemoveTask(id: string) {
    setRemoveModal(!removeModal);
    setDeletionId(id);
  }

  function onEditTask(id: string) {
    setEditModal(!editModal);
    setEditionId(id);
  }

  function onCompleteTask(taskId: string, listId: number) {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.65:8080/api/task/taskGet/${taskId}`);

        const taskInfo = {
          tags: response.data.tags,
          title: response.data.title,
          description: response.data.description,
          collaborators: response.data.collaborators,
          _id: response.data._id
        };

        addTask(taskInfo); // añadimos la tarea a la lista de completadas.
        setCompletionMsg(true);
        deleteTask(taskId, true);

      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchData();
  }

  const deleteTask = async (taskId: string, markAsCompleted: boolean) => {
    if (markAsCompleted === false) {
      setRemoveModal(!removeModal);
    }

    await axios
      .delete(`http://192.168.1.65:8080/api/task/taskDelete/${taskId}`)
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
        const response = await axios.get("http://192.168.1.65:8080/api/task/taskGet");
        setTasks(response.data);
        setFullData(response.data);

      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchData();
  });

  useEffect(() => {
    setTimeout(function () {
      setCompletionMsg(false);
    }, 3000);
  }, [completionMsg]);

  function handleSearch(query: string) {
    console.log(!searchQuery);
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    console.log(formattedQuery);
    const filteredData = filter(fullData, (task) => {
      return contains(task, formattedQuery);
    });
    console.log(filteredData);
    setFilteredTasks(filteredData);
  };

  const contains = ({ tags, title, description, collaborators }: Tasks, query: string) => {
    const formattedTitle = title.toLowerCase();
    const formattedDesc = description.toLowerCase();
    if (formattedTitle.includes(query) || formattedDesc.includes(query)) {
      return true;
    }
    return false;
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

      {editModal && (
        <View className='w-full h-screen bg-slate-900 opacity-80 absolute z-10 items-center justify-center px-14'>
          <EditableTask cancelBtn={() => setEditModal(!editModal)} onFinished={() => setEditModal(!editModal)} editionId={editionId} />
        </View>
      )}
      <ScrollView className='py-8'>

        <View className='items-center justify-center h-full w-full gap-6 px-6'>
          <Text className='self-start text-[40px] font-bold tracking-[-0.1rem] text-slate-800'>My Tasks</Text>

          <View className='w-full pl-6 bg-slate-100 border border-slate-200 rounded-xl flex-row items-center justify-center'>
            <Ionicons name='search' size={18} color="#64748b" />
            <TextInput
              defaultValue={searchQuery}
              clearButtonMode='always'
              onChangeText={query => handleSearch(query)}
              placeholder='Search a task'
              className='w-full placeholder:text-lg' />
          </View>

          <View className='gap-4 pb-14 w-full'>

            <View className='pending-section w-full bg-[rgba(251,147,1,0.15)] bg-op py-4 px-4 rounded-xl justify-between flex-row items-center'>
              <View className='items-center gap-2 flex-row'>
                <View className='w-2 h-2 bg-[#e7921a] rounded-full'></View>
                <Text className='text-[#e7921a] font-semibold text-xl'>To do</Text>
              </View>

              <TouchableOpacity>
                <Ionicons name='chevron-down' size={24} color={"#e7921a"} />
              </TouchableOpacity>
            </View>

            {!searchQuery && (
              <View className='gap-3'>
                {tasks?.map((task, index) => (
                  <Task key={index} isCompleted={false} tags={task.tags} title={task.title} desc={task.description} collaborators={task.collaborators} onRemove={() => onRemoveTask(task._id)} onComplete={() => onCompleteTask(task._id, index)} onEdit={() => onEditTask(task._id)} />
                ))}
              </View>
            )}

            {searchQuery && (
              <View className='gap-3'>
                {filteredTasks?.map((task, index) => (
                  <Task key={index} isCompleted={false} tags={task.tags} title={task.title} desc={task.description} collaborators={task.collaborators} onRemove={() => onRemoveTask(task._id)} onComplete={() => onCompleteTask(task._id, index)} onEdit={() => onEditTask(task._id)} />
                ))}
              </View>
            )}

            {completionMsg && (
              <View className='bg-green-100 py-3 w-full self-center items-center justify-center flex-row gap-2'>
                <Ionicons name='checkmark-circle-outline' color={"#16a34a"} size={18} />
                <Text className='text-green-600 font-xl font-semibold'>
                  Task mark as completed!
                </Text>
              </View>
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

