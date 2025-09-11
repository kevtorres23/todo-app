import { Image } from "expo-image";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

type People = {
    name: string,
    picture: any,
}

type Props = {
    onAddPerson: (picture: string, id: number) => void;
    peopleList: People[];
}

function AssignablePeople(props: Props) {

    function onPersonSelection(picture: string, id: number) {
        props.onAddPerson(picture, id);
    }

    console.log(props.peopleList)

    return (
        <View className="absolute left-12 top-0 bg-white p-4 border border-slate-200 items-start gap-3 z-10 rounded-3xl">
            <Text className="text-slate-500 font-medium">Available people</Text>
            {props.peopleList.map((person, id) =>
                <TouchableOpacity key={id} onPress={() => onPersonSelection(person.picture, id)} className="flex-row gap-2 items-center justify-center">
                    <View className='w-10 h-10 bg-slate-500 rounded-[50%]'>
                        <Image source={person.picture} style={{ flex: 1, width: "auto", borderRadius: 50 }} contentFit='cover' />
                    </View>
                    <Text className="text-slate-700 font-semibold">{person.name}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default AssignablePeople;