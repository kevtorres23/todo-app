import { View, Text } from "react-native";

type tagColors = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

type tagProps = {
    name: string,
    color: tagColors,
}

function Tag(props: tagProps) {
    const bgColors: Record<tagColors, string> = {
        "red": "rgb(251, 44, 54)",
        "orange": "rgb(255, 105, 0)",
        "yellow": "rgb(240, 177, 0)",
        "green": "rgb(0, 201, 81)",
        "blue": "rgb(21, 93, 252)",
        "purple": "rgb(152, 16, 250)",
        "pink": "rgb(152, 16, 250)",
    }

    const nameColors: Record<tagColors, string> = {
        "red": "rgb(251, 44, 54, 0.15)",
        "orange": "rgb(255, 105, 0, 0.15)",
        "yellow": "rgb(240, 177, 0, 0.15)",
        "green": "rgb(0, 201, 81, 0.15)",
        "blue": "rgb(21, 93, 252, 0.15)",
        "purple": "rgb(152, 16, 250, 0.15)",
        "pink": "rgb(152, 16, 250, 0.15)",
    }


    return (
        <View className="py-1 px-2.5 rounded-full self-start" style={{ backgroundColor: bgColors[props.color] }}>
            <Text className="font-medium" style={{color: nameColors[props.color]}}>{props.name}</Text>
        </View>
    )
}

export default Tag;