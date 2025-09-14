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
import { useIPStore } from '@/store/storeIP';

SplashScreen.preventAutoHideAsync();

type Tag = {
    name: string,
    color: string
}

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

    const IP = useIPStore((state) => state.address);
    const [removeModal, setRemoveModal] = useState(false);
    const [addCollabModal, setAddCollabModal] = useState(false);
    const [addTagModal, setAddTagModal] = useState(false);
    const [modalType, setModalType] = useState("");

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
            .delete(`http://${IP}:8080/api/collab/collabDelete/${id}`)
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
            .delete(`http://${IP}:8080/api/tag/tagDelete/${id}`)
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

    function createCollaborator(newCollab: People) {
        setAddCollabModal(!addCollabModal);

        axios.post(`http://${IP}:8080/api/collab/collabCreation`, {
            "name": newCollab.name,
            "picture": newCollab.picture
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    };

    function createTag(newTag: Tag) {
        setAddTagModal(!addTagModal);

        axios.post(`http://${IP}:8080/api/tag/tagCreation`, {
            "name": newTag.name,
            "color": newTag.color
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <SafeAreaView style={styles.safe}>

            {(modalType === "collaborator") && (addCollabModal) && (
                <AddModal modalType={modalType} onAddCollab={createCollaborator} onCloseModal={() => setAddCollabModal(!addCollabModal)} />
            )}

            {(modalType === "tag") && (addTagModal) && (
                <AddModal modalType={modalType} onAddTag={createTag} onCloseModal={() => setAddTagModal(!addTagModal)} />
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

                <TagSettings onRemoveSelected={deleteTag} onAddSelected={onAddTagPressed} />

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