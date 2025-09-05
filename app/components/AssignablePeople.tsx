import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

type People = {
    name: string,
    picture: string,
}

type Props = {
    assignedPersonPic: (picture: string) => void;
}

const defaultList = [
    {name: "Juan Pérez", picture: "img1"},
    {name: "Lucía Rosales", picture: "img2"},
    {name: "Héctor Contreras", picture: "img3"},
]

function AssignablePeople(props: Props) {
    const [peopleList, setPeopleList] = useState<People[]>(defaultList);

    function personImage(id: number) {
        const pic = peopleList[id].picture;
        props.assignedPersonPic(pic);
    }

    function onPersonSelection(id: number) {
        setPeopleList(peopleList => peopleList.filter((_, i) => i != id)); // Eliminamos la persona disponible de la modal.
        personImage(id);
    }

    return(
        <View className="absolute left-12 top-0 bg-white p-4 border border-slate-200 items-start gap-3 z-10 rounded-3xl">
            <Text className="text-slate-500 font-medium">Available people</Text>
            {peopleList.map((person, id) =>
                <TouchableOpacity key={id} onPress={() => onPersonSelection(id)} className="flex-row gap-2 items-center justify-center">
                    <View className="w-9 h-9 bg-slate-600 rounded-[50%]"></View>
                    <Text className="text-slate-700 font-semibold">{person.name}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default AssignablePeople;