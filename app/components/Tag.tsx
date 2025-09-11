import { View, Text } from "react-native";

type tagProps = {
    name: string,
    color: string,
}

function Tag() {
    return(
        <View className="py-1 px-2.5 bg-[rgb(29,107,209,0.15)] rounded-full self-start">
            <Text className="text-[rgb(29,107,209)] font-medium">Etiqueta 1</Text>
        </View>
    )
}

export default Tag;