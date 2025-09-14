import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIPStore } from '@/store/storeIP';

type Collaborator = {
    name: string,
    picture: string,
    _id: string,
}

type Props = {
    onRemoveSelected: (index: string) => void,
    onAddSelected: () => void
}

function CollabsSettings(props: Props) {
    const [collabList, setCollabList] = useState<Collaborator[]>([]);
    const IP = useIPStore((state) => state.address);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${IP}:8080/api/collab/collabGet`);
                setCollabList(response.data);

            } catch (error) {
                console.log("Error while fetching the data", error);
            }
        };

        fetchData();
    });

    return (
        <View className='collaborators w-full rounded-xl border border-slate-200 bg-slate-100 p-4 gap-3'>
            <View className="w-full justify-between items-center flex-row">
                <Text className='text-xl font-medium text-slate-500'>Your collaborators</Text>
                <TouchableOpacity onPress={props.onAddSelected} className="py-1.5 px-2 bg-slate-200 rounded-xl flex-row gap-1 items-center border-[0.5px] border-slate-400">
                    <Text className="font-medium text-slate-500">Add</Text>
                    <Ionicons name="add-outline" color={"#64748b"} size={16} />
                </TouchableOpacity>
            </View>

            <View className="flex-col gap-2">
                {collabList.map((collaborator, index) => (
                    <View key={index} className="flex-row w-full items-center justify-between">
                        <View className="flex-row gap-2 items-center">
                            <TouchableOpacity key={index} className='w-10 h-10 bg-slate-500 rounded-[50%]'>
                                <Image source={collaborator.picture} style={{ flex: 1, width: "auto", borderRadius: 50 }} contentFit='cover' />
                            </TouchableOpacity>
                            <Text className="font-medium text-lg text-slate-700">{collaborator.name}</Text>
                        </View>

                        <TouchableOpacity onPress={() => props.onRemoveSelected(collaborator._id)}>
                            <Ionicons name="close-circle" size={21} color={"#64748b"} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default CollabsSettings;