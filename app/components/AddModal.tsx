import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import TagColorPicker from "./TagColorPicker";

type Tag = {
    name: string,
    color: string
}

type People = {
    name: string,
    picture: string,
}

type Props = {
    modalType: "collaborator" | "tag";
    onAddCollab?: (newCollab: People) => void;
    onAddTag?: (newTag: Tag) => void;
    onCloseModal: () => void;
}

function AddModal(props: Props) {
    const [collabName, setCollabName] = useState("");
    const [collabPic, setCollabPic] = useState("");
    const [noName, setNoName] = useState(false);
    const [noPic, setNoPic] = useState(false);
    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState("");
    const [noTagName, setNoTagName] = useState(false);
    const [noColor, setNoColor] = useState(false);

    function changeTagColor(color: string) {
        setTagColor(color);
        console.log(tagColor);
    }

    function createCollaborator() {
        if (!collabName) {
            setNoName(true);
        } else if (!collabPic) {
            setNoPic(true);
        } else {
            const newCollab = {
                name: collabName,
                picture: collabPic
            }

            if (props.onAddCollab) {
                props.onAddCollab(newCollab);
            }
        }
    }

    function createTag() {
        if (!tagName) {
            setNoTagName(!noTagName);
        } else if (!tagColor) {
            setNoColor(!noColor);
        } else {
            const newTag = {
                name: tagName,
                color: tagColor
            }

            if (props.onAddTag) {
                props.onAddTag(newTag);
            }
        }
    }

    return (
        <View className='w-full h-screen bg-slate-900 opacity-80 absolute z-10 items-center justify-center px-14'>
            {props.modalType === "collaborator" && (
                <View className='p-6 bg-slate-50 rounded-xl w-full items-center justify-center gap-5'>
                    <Text className='text-xl font-semibold text-center'>Add a new collaborator</Text>

                    <View className="gap-1 w-full">
                        <Text className="text-lg font-medium text-slate-600">
                            Name
                        </Text>
                        <TextInput defaultValue={collabName} onChangeText={newName => setCollabName(newName)} className="bg-slate-300 px-3 border border-slate-400 rounded-lg w-full placeholder:text-slate-600" placeholder="Name here" />
                        {noName && (
                            <Text className="text-sm text-red-600 font-medium">Please enter a name</Text>
                        )}
                    </View>

                    <View className="gap-2 w-full">
                        <Text className="text-lg font-medium text-slate-600">
                            Avatar URL
                        </Text>
                        <TextInput defaultValue={collabPic} onChangeText={newPic => setCollabPic(newPic)} className="bg-slate-300 px-3 border border-slate-400 rounded-lg w-full placeholder:text-slate-600" placeholder="Name here" />
                        {noPic && (
                            <Text className="text-sm text-red-600 font-medium">Please enter the URL for the picture.</Text>
                        )}
                    </View>

                    <TouchableOpacity onPress={createCollaborator} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 bg-slate-900'>
                        <Ionicons name='add-outline' size={20} color={"white"} />
                        <Text className='text-white font-semibold text-lg'>Create collaborator</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={props.onCloseModal} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 border border-slate-900 bg-transparent'>
                        <Ionicons name='close-circle-outline' size={20} className='text-slate-900' />
                        <Text className='text-slate-900 font-semibold text-lg'>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}
            {props.modalType === "tag" && (
                <View className='p-6 bg-slate-50 rounded-xl w-full items-center justify-center gap-5'>
                    <Text className='text-xl font-semibold text-center'>Create a new tag</Text>

                    <View className="gap-1 w-full">
                        <Text className="text-lg font-medium text-slate-600">
                            Name
                        </Text>
                        <TextInput defaultValue={tagName} onChangeText={newName => setTagName(newName)} className="bg-slate-300 px-3 border border-slate-400 rounded-lg w-full placeholder:text-slate-600" placeholder="Name here" />
                        {noTagName && (
                            <Text className="text-sm text-red-600 font-medium">Please enter a name.</Text>
                        )}
                    </View>

                    <View className="gap-2 w-full">
                        <Text className="text-lg font-medium text-slate-600">
                            Color
                        </Text>
                        <View className="w-full">
                            <TagColorPicker selectedColor={changeTagColor}/>
                        </View>
                        {noColor && (
                            <Text className="text-sm text-red-600 font-medium">Please pick a color.</Text>
                        )}
                    </View>

                    <TouchableOpacity onPress={createTag} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 bg-slate-900'>
                        <Ionicons name='add-outline' size={20} color={"white"} />
                        <Text className='text-white font-semibold text-lg'>Create tag</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={props.onCloseModal} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 border border-slate-900 bg-transparent'>
                        <Ionicons name='close-circle-outline' size={20} className='text-slate-900' />
                        <Text className='text-slate-900 font-semibold text-lg'>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default AddModal;