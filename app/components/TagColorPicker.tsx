import { useState } from "react";
import { View, TouchableOpacity } from "react-native";

type Props = {
    selectedColor: (color: string) => void;
}

function TagColorPicker(props: Props) {
    const [pickedColor, setPickedColor] = useState("");

    function redPressed() {
        props.selectedColor("red");
        setPickedColor("red");
    }

    function orangePressed() {
        props.selectedColor("orange");
        setPickedColor("orange");
    }

    function yellowPressed() {
        props.selectedColor("yellow");
        setPickedColor("yellow");
    }

    function greenPressed() {
        props.selectedColor("green");
        setPickedColor("green");
    }

    function bluePressed() {
        props.selectedColor("blue");
        setPickedColor("blue");
    }

    function purplePressed() {
        props.selectedColor("purple");
        setPickedColor("purple");
    }

    function pinkPressed() {
        props.selectedColor("pink");
        setPickedColor("pink");
    }

    return (
        <View className="w-full flex-col gap-2">
            <View className="w-full flex-row gap-3 items-center justify-center">
                <TouchableOpacity onPress={redPressed} className="w-6 h-6 rounded-[50%] bg-red-500" style={{ borderWidth: 2, borderColor: pickedColor === "red" ? "#475569" : "transparent" }}></TouchableOpacity>
                <TouchableOpacity onPress={orangePressed} className="w-6 h-6 rounded-[50%] bg-orange-500" style={{ borderWidth: 2, borderColor: pickedColor === "orange" ? "#475569" : "transparent" }}></TouchableOpacity>
                <TouchableOpacity onPress={yellowPressed} className="w-6 h-6 rounded-[50%] bg-yellow-600" style={{ borderWidth: 2, borderColor: pickedColor === "yellow" ? "#475569" : "transparent" }}></TouchableOpacity>
                <TouchableOpacity onPress={greenPressed} className="w-6 h-6 rounded-[50%] bg-green-600" style={{ borderWidth: 2, borderColor: pickedColor === "green" ? "#475569" : "transparent" }}></TouchableOpacity>
                <TouchableOpacity onPress={bluePressed} className="w-6 h-6 rounded-[50%] bg-blue-500" style={{ borderWidth: 2, borderColor: pickedColor === "blue" ? "#475569" : "transparent" }}></TouchableOpacity>
                <TouchableOpacity onPress={purplePressed} className="w-6 h-6 rounded-[50%] bg-purple-500" style={{ borderWidth: 2, borderColor: pickedColor === "purple" ? "#475569" : "transparent" }}></TouchableOpacity>
                <TouchableOpacity onPress={pinkPressed} className="w-6 h-6 rounded-[50%] bg-pink-600" style={{ borderWidth: 2, borderColor: pickedColor === "pink" ? "#475569" : "transparent" }}></TouchableOpacity>
            </View>
        </View>
    );
};

export default TagColorPicker;