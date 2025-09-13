import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Inter_900Black, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import CollabsSettings from '@/components/CollabsSettings';
import TagSettings from '@/components/TagSettings';
import RemoveModal from '@/components/RemoveModal';
import AddModal from '@/components/AddModal';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

SplashScreen.preventAutoHideAsync();

type People = {
    name: string,
    picture: string,
}

type TaskBody = {
    title: string,
    description: string,
    contributors: People[];
}

export default function SettingsScreen() {
    const [loaded, error] = useFonts({
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_900Black,
    });

    const [removeModal, setRemoveModal] = useState(false);
    const [addCollabModal, setAddCollabModal] = useState(false);
    const [addTagModal, setAddTagModal] = useState(false);
    const [deletionId, setDeletionId] = useState("");
    const [collabName, setCollabName] = useState("");
    const [collabPic, setCollabPic] = useState("");
    const [noName, setNoName] = useState(false);
    const [noPic, setNoPic] = useState(false);
    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState("");
    const [noTagName, setNoTagName] = useState(false);
    const [noColor, setNoColor] = useState(false);
    const [modalType, setModalType] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    function onRemovePressed(id: string) {
        console.log("Hi");
        setRemoveModal(true);
        deleteCollab(id);
    }

    const deleteCollab = async (id: string) => {
        setRemoveModal(!removeModal);

        await axios
            .delete(`http://192.168.1.65:8080/api/collab/collabDelete/${id}`)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteTag = async (id: string) => {
        setRemoveModal(!removeModal);

        await axios
            .delete(`http://192.168.1.65:8080/api/tag/tagDelete/${id}`)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function onAddCollabPressed() {
        setAddCollabModal(!addCollabModal);
        setModalType("collaborator");
    }

    function onAddTagPressed() {
        setAddTagModal(!addTagModal);
        setModalType("tag");
    }

    function createCollaborator() {

        if (!collabName) {
            setNoName(true);
        } else if (!collabPic) {
            setNoPic(true);
        } else {
            setAddCollabModal(!addCollabModal);

            axios.post("http://192.168.1.65:8080/api/collab/collabCreation", {
                "name": collabName,
                "picture": collabPic
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <SafeAreaView style={styles.safe}>

            {(modalType === "collaborator") && (addCollabModal) && (
                <AddModal modalType={modalType} onDeleteCollab={deleteCollab} onCloseModal={() => setAddCollabModal(!addCollabModal)}/>
            )}

            {(modalType === "tag")  && (addTagModal) && (
                <AddModal modalType={modalType} onDeleteTag={deleteTag} onCloseModal={() => setAddTagModal(!addTagModal)}/>
            )}

            <View className='justify-start h-full w-full px-8 gap-6 py-10'>

                <View className='flex-col gap-2 items-start justify-center w-full'>
                    <Text style={{ fontFamily: 'Inter_700Bold' }} className='text-slate-800 text-[36px] tracking-[-0.1rem]'>
                        Settings
                    </Text>

                    <Text style={{ fontFamily: 'Inter_500Medium' }} className='text-slate-600 text-lg tracking-tightest'>
                        Manage the collaborators and tags that you cand add to your tasks!
                    </Text>
                </View>

                <CollabsSettings onRemoveSelected={onRemovePressed} onAddSelected={onAddCollabPressed} />

                <TagSettings onRemoveSelected={onRemovePressed} onAddSelected={onAddTagPressed} />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 30 : 20,
        paddingBottom: 20,
        backgroundColor: "white",
    },
});