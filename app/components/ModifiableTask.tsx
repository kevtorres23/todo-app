import React, { useState } from "react";
import { Image } from 'expo-image';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AssignablePeople from "./AssignablePeople";

type Props = {
    cancelBtn: () => void;
    modifType: "create" | "edit";
}

const defaultList = [
    { name: "Juan Pérez", picture: "img1" },
    { name: "Lucía Rosales", picture: "img2" },
    { name: "Héctor Contreras", picture: "img3" },
]


function ModifiableTask(props: Props) {
    const [peopleModal, setPeopleModal] = useState(false);
    const [assignedPeople, setAssignedPeople] = useState([""]);
    const [assignablePeople, setAssignablePeople] = useState(defaultList);

    function cancelBtnPressed() {
        props.cancelBtn();
    }

    function addPersonToTask(id: number) {
        // Aquí, ELIMINAMOS la persona disponible de la modal.
        const newList = assignablePeople.filter((_, i) => i != id);
        setAssignablePeople(newList);

        // Aquí, AGREGAMOS la imagen de la persona a la tarea.
        const pic = assignablePeople[id].picture;
        setAssignedPeople([...assignedPeople, pic]);
    }

    function removePersonFromTask(id: number) {
        // Aquí, AGREGAMOS la persona disponible a la modal.
        const removedPerson = defaultList[id];
        setAssignablePeople([...assignablePeople, removedPerson]);

        // Aquí, ELIMINAMOS la persona disponible de la tarea.
        const newList = assignedPeople.filter((_, i) => i != id);
        setAssignedPeople(newList);
        
    }

    return (
        <View className="w-full h-auto bg-slate-100 border border-slate-200 rounded-xl gap-4">
            {props.modifType === "create" && (
                <View className="border-b border-b-slate-300 px-4 py-6 flex-row gap-1.5">
                    <Ionicons name="checkmark-circle" size={20} color="#1e293b" />
                    <Text className="text-xl font-bold tracking-tighter text-slate-800">
                        Creating task.
                    </Text>
                </View>
            )}

            {props.modifType === "edit" && (
                <View className="border-b border-b-slate-300 px-4 py-6 flex-row gap-1.5">
                    <Ionicons name="create" size={20} color="#1e293b" />
                    <Text className="text-xl font-bold tracking-tighter text-slate-800">
                        Editing task.
                    </Text>
                </View>
            )}

            <View className="px-4 pb-6 gap-4">
                <View className="gap-2">
                    <Text className="text-lg font-medium text-slate-600">
                        Task title
                    </Text>
                    <TextInput className="bg-slate-200 px-3 rounded-lg" placeholder="Task number 1" />
                </View>

                <View className="gap-2">
                    <Text className="text-lg font-medium text-slate-600">
                        Task description
                    </Text>
                    <TextInput className="bg-slate-200 px-3 rounded-lg" placeholder="Enter the description of the task." />
                </View>

                <View className="gap-2">
                    <Text className="text-lg font-medium text-slate-600">
                        Assign people
                    </Text>
                    <View className="flex-row gap-2 items-center justify-start">
                        <TouchableOpacity onPress={() => setPeopleModal(!peopleModal)} className="bg-slate-200 w-9 h-9 self-start items-center justify-center rounded-full">
                            <Ionicons name="add-outline" size={21} color="gray" />
                        </TouchableOpacity>
                        {assignedPeople.map((pic, id) =>
                            // <Image key={id} className="p-2 w-9 h-9 self-start items-center justify-center rounded-full" contentFit="cover" source={pic} />
                            <TouchableOpacity onPress={() => removePersonFromTask(id)}>
                                <Text key={id}>{pic}</Text>
                            </TouchableOpacity>
                        )}
                        {peopleModal === true && (
                            <AssignablePeople peopleList={assignablePeople} onAddPerson={addPersonToTask} />
                        )}
                    </View>
                </View>

                <TouchableOpacity className='w-full bg-slate-900 items-center justify-center py-3 rounded-xl flex-row gap-1.5'>
                    <Ionicons name="checkmark-outline" size={20} color="white" />
                    <Text className='text-white text-base'>
                        Create task
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={cancelBtnPressed} className='w-full border border-slate-900 bg-transparent items-center justify-center py-3 rounded-xl flex-row gap-1.5'>
                    <Text className='text-slate-900 text-base'>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModifiableTask;