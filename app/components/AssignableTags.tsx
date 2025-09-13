import { Image } from "expo-image";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Tag from "./Tag";

type tagColors = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";


type Tag = {
    name: string,
    color: tagColors,
}

type Props = {
    onAddTag: (id: number) => void;
    tagList: Tag[];
}

function AssignableTags(props: Props) {

    function onPersonSelection(id: number) {
        props.onAddTag(id);
    }

    return (
        <View className="absolute left-12 top-0 bg-white p-4 border border-slate-200 items-start gap-3 z-10 rounded-3xl">
            <Text className="text-slate-500 font-medium">Available people</Text>
            {props.tagList.map((tag, id) =>
                <TouchableOpacity key={id} onPress={() => onPersonSelection(id)} className="flex-row gap-2 items-center justify-center">
                    <Tag key={id} color={tag.color} name={tag.name}/>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default AssignableTags;