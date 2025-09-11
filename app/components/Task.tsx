import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tag from "./Tag";
import { Image } from "expo-image";

type People = {
    name: string,
    picture: string,
}

type taskProps = {
    title: string,
    desc: string,
    collaborators: [People];
}

function Task(props: taskProps) {
    console.log(props.collaborators);

    return (
        <View className="w-full rounded-lg bg-slate-100 p-4">
            <View className="flex-col gap-3">
                <View>
                    <Tag />
                </View>
                <View className="gap-1.5">
                    <Text className="text-xl font-semibold text-slate-800">{props.title}</Text>
                    <Text className="text-base font-normal text-slate-500">{props.desc}</Text>
                </View>
                <View className="w-full flex-row justify-between items-center">
                    <View className="flex-row gap-1">
                        {props.collaborators?.map((person, index) => (
                            <View className='w-9 h-9 rounded-[50%]'>
                                <Image source={person.picture} style={{ flex: 1, width: "auto", borderRadius: 50 }} contentFit='cover' />
                            </View>
                        ))}
                    </View>
                    <View className="actions flex-row gap-2">
                        <TouchableOpacity>
                            <Ionicons name="move-outline" size={18} className="text-slate-500" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="trash-outline" size={18} className="text-slate-500" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Task;