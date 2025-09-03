import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
    cancelBtn: () => void;
    modifType: "create" | "edit";
}

function ModifiableTask(props: Props) {

    function cancelBtnPressed() {
        props.cancelBtn();
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
                    <TouchableOpacity className="bg-slate-200 p-2 self-start items-center justify-center rounded-full">
                        <Ionicons name="add-outline" size={21} color="gray" />
                    </TouchableOpacity>
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