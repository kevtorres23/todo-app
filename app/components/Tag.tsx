import { View, Text } from "react-native";

type tagColors = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

type tagProps = {
    name: string,
    color: tagColors,
}

function Tag(props: tagProps) {
    const nameColors: Record<tagColors, string> = {
        "red": "rgb(251, 44, 54)",
        "orange": "rgb(255, 105, 0)",
        "yellow": "rgb(240, 177, 0)",
        "green": "rgb(0, 201, 81)",
        "blue": "rgb(21, 93, 252)",
        "purple": "rgb(152, 16, 250)",
        "pink": "rgb(152, 16, 250)",
    }

    const bgColors: Record<tagColors, string> = {
        "red": "rgba(251, 44, 54, 0.15)",
        "orange": "rgba(255, 105, 0, 0.15)",
        "yellow": "rgba(240, 177, 0, 0.15)",
        "green": "rgba(0, 201, 81, 0.15)",
        "blue": "rgba(21, 93, 252, 0.15)",
        "purple": "rgba(152, 16, 250, 0.15)",
        "pink": "rgba(152, 16, 250, 0.15)",
    }


    return (
        <View className="py-1 px-2 rounded-full self-start min-w-20 w-auto items-center justify-center" style={{ backgroundColor: bgColors[props.color] }}>
            <Text className="font-medium text-sm" style={{color: nameColors[props.color]}}>{props.name}</Text>
        </View>
    )
}

export default Tag;