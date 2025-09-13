import React, { useState, useEffect } from "react";
import { Image } from 'expo-image';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AssignablePeople from "./AssignablePeople";
import AssignableTags from "./AssignableTags";
import axios from 'axios';
import Tag from "./Tag";

type Props = {
    cancelBtn: () => void;
    onFinished: () => void;
    editionId: string;
}

type People = {
    name: string,
    picture: string,
}

type tagColors = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

type Tags = {
    name: string,
    color: tagColors
}

type TaskBody = {
    tags: [Tags],
    title: string,
    description: string,
    collaborators: [People],
    _id: string,
}

function EditableTask(props: Props) {
    const [peopleModal, setPeopleModal] = useState(false);
    const [tagModal, setTagModal] = useState(false);
    const [collabsList, setCollabsList] = useState<People[]>([]);
    const [assignedPeople, setAssignedPeople] = useState<People[]>([]);
    const [assignablePeople, setAssignablePeople] = useState<People[]>([]);
    const [taskData, setTaskData] = useState<TaskBody>()

    const [tagList, setTagList] = useState<Tags[]>([]);
    const [assignableTags, setAssignableTags] = useState<Tags[]>([]);
    const [assignedTags, setAssignedTags] = useState<Tags[]>([]);

    const [taskTitle, setTaskTitle] = useState(taskData?.title);
    const [taskDescription, setTaskDescription] = useState(taskData?.description);
    const [noTitle, setNoTitle] = useState(false);
    const [noDesc, setNoDesc] = useState(false);
    const [noCollabs, setNoCollabs] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.65:8080/api/task/taskGet/${props.editionId}`);
                setTaskData(response.data);
                setAssignedTags(response.data.tags);
                setAssignedPeople(response.data.collaborators);

            } catch (error) {
                console.log("Error while fetching the data", error);
            }
        };

        const fetchCollabData = async () => {
            try {
                const response = await axios.get("http://192.168.1.65:8080/api/collab/collabGet");
                setCollabsList(response.data);

                for (let j = 0; j < collabsList.length; j++) {
                    for (let i = 0; i < assignedPeople.length; i++) {
                        if (
                            assignedPeople[i].name === collabsList[j].name &&
                            assignedPeople[i].picture === collabsList[j].picture
                        ) {
                            const newList = collabsList.filter((_, index) => index != j);
                            setAssignablePeople(newList);
                            break;
                        } else {
                            continue;
                        }
                    }
                }

            } catch (error) {
                console.log("Error while fetching the data", error);
            }
        };

        const fetchTagData = async () => {
            try {
                const response = await axios.get("http://192.168.1.65:8080/api/tag/tagGet");
                setTagList(response.data);

            } catch (error) {
                console.log("Error while fetching the data", error);
            }
        };

        fetchData();
        fetchCollabData();
        fetchTagData();
    }, []);

    useEffect(() => {
        for (let j = 0; j < tagList.length; j++) {
            for (let i = 0; i < assignedTags.length; i++) {
                if (
                    assignedTags[i].color === tagList[j].color &&
                    assignedTags[i].name === tagList[j].name
                ) {
                    const newList = tagList.filter((_, index) => index != j);
                    setAssignableTags(newList);
                    break;
                } else {
                    continue;
                }
            }
        }
    }, [tagModal]);

    useEffect(() => {
        for (let j = 0; j < collabsList.length; j++) {
            for (let i = 0; i < assignedPeople.length; i++) {
                if (
                    assignedPeople[i].name === collabsList[j].name &&
                    assignedPeople[i].picture === collabsList[j].picture
                ) {
                    const newList = collabsList.filter((_, index) => index != j);
                    setAssignablePeople(newList);
                    break;
                } else {
                    continue;
                }
            }
        }
    }, [peopleModal])

    const onSaveTask = (id: string) => {
        if (!taskTitle && !taskData?.title) {
            setNoTitle(true);
        } else if (!taskDescription && !taskData?.description) {
            setNoDesc(true);
        } else if (assignedPeople.length < 1) {
            setNoCollabs(true);
        } else {
            axios.put(`http://192.168.1.65:8080/api/task/taskUpdate/${id}`, {
                "tags": assignedTags,
                "title": taskTitle,
                "description": taskDescription,
                "collaborators": assignedPeople
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })

            props.onFinished();
        }
    }

    function cancelBtnPressed() {
        props.cancelBtn();
    }

    function addPersonToTask(id: number) {
        // Aquí, ELIMINAMOS la persona disponible de la modal.
        const newList = assignablePeople.filter((_, i) => i != id);
        setAssignablePeople(newList);

        // Aquí, AGREGAMOS a la persona a la tarea.
        const pic = assignablePeople[id].picture;
        const name = assignablePeople[id].name;

        const newCollaborator = {
            name: name,
            picture: pic
        }
        setAssignedPeople([...assignedPeople, newCollaborator]);
    }

    function removePersonFromTask(pic: string, id: number) {
        // Aquí, AGREGAMOS la persona disponible a la modal.
        console.log("removed person img: ", pic);

        for (let i = 0; i < collabsList.length; i++) {
            if (collabsList[i].picture === pic) {
                let removedPerson = collabsList[i];
                setAssignablePeople([...assignablePeople, removedPerson]);
                break;
            }
        }

        // Aquí, ELIMINAMOS la persona disponible de la tarea.
        const newList = assignedPeople?.filter((_, i) => i != id);
        setAssignedPeople(newList);
    }

    function addTagToTask(id: number) {
        // Aquí, ELIMINAMOS la persona disponible de la modal.
        const newList = assignableTags.filter((_, i) => i != id);
        setAssignableTags(newList);

        // Aquí, AGREGAMOS a la persona a la tarea.
        const name = assignableTags[id].name;
        const color = assignableTags[id].color;

        const newTag = {
            name: name,
            color: color
        }
        setAssignedTags([...assignedTags, newTag]);
    }

    function removeTagFromTask(color: string, id: number) {
        // Aquí, AGREGAMOS la tag disponible a la modal.
        for (let i = 0; i < tagList.length; i++) {
            if (tagList[i].color === color) {
                let removedTag = tagList[i];
                setAssignableTags([...assignableTags, removedTag]);
                break;
            }
        }

        // Aquí, ELIMINAMOS la tag de la tarea.
        const newList = assignedTags?.filter((_, i) => i != id);
        setAssignedTags(newList);
    }

    return (
        <View className="w-full h-auto bg-slate-100 border border-slate-200 rounded-xl gap-4">
            <View className="border-b border-b-slate-400 px-4 py-6 flex-row gap-1.5">
                <Ionicons name="create" size={20} color="#1e293b" />
                <Text className="text-xl font-bold tracking-tighter text-slate-800">
                    Editing task.
                </Text>
            </View>

            <View className="px-4 pb-6 gap-4">

                <View className="gap-2">
                    <Text className="text-lg font-medium text-slate-600">
                        Add tags
                    </Text>
                    <View className="flex-row gap-2 items-center justify-start">
                        <TouchableOpacity onPress={() => setTagModal(!tagModal)} className="bg-slate-200 w-9 h-9 self-start items-center justify-center rounded-full">
                            <Ionicons name="add-outline" size={21} color="gray" />
                        </TouchableOpacity>
                        {assignedTags?.map((tag, id) =>
                            <TouchableOpacity key={id} onPress={() => removeTagFromTask(tag.color, id)}>
                                <Tag color={tag.color} name={tag.name} />
                            </TouchableOpacity>
                        )}
                        {tagModal === true && (
                            <AssignableTags tagList={assignableTags} onAddTag={addTagToTask} />
                        )}
                    </View>
                    {noCollabs && (
                        <Text className="text-sm text-red-600 font-medium">Please select at least one person.</Text>
                    )}
                </View>

                <View className="gap-2">
                    <Text className="text-lg font-medium text-slate-600">
                        Task title
                    </Text>
                    <TextInput defaultValue={taskData?.title} onChangeText={newTitle => setTaskTitle(newTitle)} className="bg-slate-200 px-3 rounded-lg" placeholder="Task number 1" />
                    {noTitle && (
                        <Text className="text-sm text-red-600 font-medium">Please enter a title for the task.</Text>
                    )}
                </View>

                <View className="gap-2">
                    <Text className="text-lg font-medium text-slate-600">
                        Task description
                    </Text>
                    <TextInput defaultValue={taskData?.description} onChangeText={newDesc => setTaskDescription(newDesc)} className="bg-slate-200 px-3 rounded-lg" placeholder="Enter the description of the task." />
                    {noDesc && (
                        <Text className="text-sm text-red-600 font-medium">Please enter a description.</Text>
                    )}
                </View>

                <View className="gap-2">
                    <Text className="text-lg font-medium text-slate-600">
                        Assign people
                    </Text>
                    <View className="flex-row gap-2 items-center justify-start">
                        <TouchableOpacity onPress={() => setPeopleModal(!peopleModal)} className="bg-slate-200 w-9 h-9 self-start items-center justify-center rounded-full">
                            <Ionicons name="add-outline" size={21} color="gray" />
                        </TouchableOpacity>
                        {assignedPeople?.map((collaborator, id) =>
                            <TouchableOpacity key={id} onPress={() => removePersonFromTask(collaborator.picture, id)} className='w-10 h-10 bg-slate-500 rounded-[50%]'>
                                <Image source={collaborator.picture} style={{ flex: 1, width: "auto", borderRadius: 50 }} contentFit='cover' />
                            </TouchableOpacity>
                        )}
                        {peopleModal === true && (
                            <AssignablePeople peopleList={assignablePeople} onAddPerson={addPersonToTask} />
                        )}
                    </View>
                    {noCollabs && (
                        <Text className="text-sm text-red-600 font-medium">Please select at least one person.</Text>
                    )}
                </View>

                <TouchableOpacity onPress={() => onSaveTask(props.editionId)} className='w-full bg-slate-900 items-center justify-center py-3 rounded-xl flex-row gap-1.5'>
                    <Ionicons name="checkmark-outline" size={20} color="white" />
                    <Text className='text-white text-base'>
                        Save task
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={cancelBtnPressed} className='w-full border border-slate-900 bg-transparent items-center justify-center py-3 rounded-xl flex-row gap-1.5'>
                    <Text className='text-slate-900 text-base'>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditableTask;