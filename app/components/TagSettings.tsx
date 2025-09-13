import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tag from "./Tag";

type tagColors = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

type Tag = {
    name: string,
    color: tagColors,
    _id: string,
}

type Props = {
    onRemoveSelected: (index: string) => void,
    onAddSelected: () => void
}

function TagSettings(props: Props) {
    const [tagList, setTagList] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.1.65:8080/api/tag/tagGet");
                setTagList(response.data);

            } catch (error) {
                console.log("Error while fetching the data", error);
            }
        };

        fetchData();
    });

    return (
        <View className='collaborators w-full rounded-xl border border-slate-200 bg-slate-100 p-4 gap-3'>
            <View className="w-full justify-between items-center flex-row">
                <Text className='text-xl font-medium text-slate-500'>Your tags</Text>
                <TouchableOpacity onPress={props.onAddSelected} className="py-1.5 px-2 bg-slate-200 rounded-xl flex-row gap-1 items-center border-[0.5px] border-slate-400">
                    <Text className="font-medium text-slate-500">Add</Text>
                    <Ionicons name="add-outline" color={"#64748b"} size={16} />
                </TouchableOpacity>
            </View>

            <View className="flex-col gap-2">
                {tagList.map((tag, index) => (
                    <View key={index} className="flex-row gap-1.5 items-center justify-center">
                        <TouchableOpacity>
                            <Ionicons name="close" color={"#64748b"} size={18}/>
                        </TouchableOpacity>
                        <Tag name={tag.name} color={tag.color} />
                    </View>
                ))}
            </View>
        </View>
    )
}

export default TagSettings;