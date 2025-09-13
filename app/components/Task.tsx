import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tag from "./Tag";
import { Image } from "expo-image";

type tagColors = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

type Tags = {
    name: string,
    color: tagColors,
}

type People = {
    name: string,
    picture: string,
}

type taskProps = {
    tags: [Tags];
    title: string,
    desc: string,
    isCompleted: boolean,
    collaborators: [People];
    onRemove: () => void;
    onComplete?: () => void;
}

function Task(props: taskProps) {

    return (
        <View className="w-full rounded-lg bg-slate-100 p-4">
            <View className="flex-col gap-3 flex-wrap">
                <View className="flex-row flex-wrap gap-2">
                    {props.tags.map((tag, index) => (
                        <Tag key={index} color={tag.color} name={tag.name} />
                    ))}
                </View>
                <View className="gap-1.5">
                    <Text className="text-xl font-semibold text-slate-800">{props.title}</Text>
                    <Text className="text-base font-normal text-slate-600">{props.desc}</Text>
                </View>
                <View className="w-full flex-row justify-between items-center">
                    <View className="flex-row gap-1">
                        {props.collaborators.map((person, index) => (
                            <View key={index} className='w-9 h-9 rounded-[50%]'>
                                <Image source={person.picture} style={{ flex: 1, width: "auto", borderRadius: 50 }} contentFit='cover' />
                            </View>
                        ))}
                    </View>
                    <View className="actions flex-row gap-2">
                        {props.isCompleted === false && (
                            <TouchableOpacity>
                                <Ionicons onPress={() => props.onComplete ? props.onComplete() : null} name="checkmark-circle-outline" size={21} color={"#475569"} />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={() => props.onRemove()}>
                            <Ionicons name="trash-outline" size={21} color={"#475569"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Task;