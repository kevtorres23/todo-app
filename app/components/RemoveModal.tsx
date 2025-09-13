import { View, Text, TouchableOpacity } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

type Props = {
    modalType: "collaborator" | "tag";
    onDeleteCollab: (id: number) => void;
    onDeleteTag: (id: number) => void;
    onCloseModal: () => void; 
}

function RemoveModal(props: Props) {
    return (
        <View className='w-full h-screen bg-slate-900 opacity-80 absolute z-10 items-center justify-center px-14'>
            <View className='p-6 bg-slate-50 rounded-xl w-full items-center justify-center gap-5'>
                <Text className='text-xl font-semibold text-center'>Are you sure you want to delete this collaborator?</Text>

                <TouchableOpacity onPress={() => { props.onDeleteCollab }} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 bg-slate-900'>
                    <Ionicons name='trash' size={18} color={"white"} />
                    <Text className='text-white font-semibold text-lg'>Remove collaborator</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={props.onCloseModal} className='w-full py-3 px-6 rounded-xl items-center justify-center flex-row gap-2 border border-slate-900 bg-transparent'>
                    <Ionicons name='close-circle-outline' size={20} className='text-slate-900' />
                    <Text className='text-slate-900 font-semibold text-lg'>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RemoveModal;