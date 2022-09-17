import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Modal, Pressable, Image } from 'react-native';
import users from './UserList.json';
import { Avatar } from "react-native-paper";
const InstaStories = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    // console.log(users)
    return (
        <ScrollView style={styles.card} >
            <View style={styles.contanier}>
                <Avatar.Image
                    size={43}
                    style={styles.avatar}
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg",
                    }}
                />
                <View>
                    <Text style={styles.name}>My Status</Text>
                    <Text style={styles.time}>Tap to add status update</Text>
                </View>
            </View>
            <Text style={styles.title}>Recent updates</Text>
            <FlatList style={styles.flatlist}
                data={users}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                renderItem={(elem) => {
                    console.log(modalVisible)
                    return (
                        <>
                            <Pressable
                                onPress={() => setModalVisible(true)}>
                                <View
                                    style={styles.contanier}
                                    onPress={() => console.log(setSelectedId(elem.item.id))}
                                >
                                    <Avatar.Image
                                        size={43}
                                        style={styles.avatar}
                                        source={{
                                            uri: elem.item.avatar,
                                        }}

                                    />
                                    <View>
                                        <Text style={styles.name}>{elem.item.name}</Text>
                                        <Text style={styles.time}>{elem.item.time}</Text>
                                    </View>
                                </View>
                            </Pressable>
                            <Modal
                                animationType='slide'
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                {elem.item.stories && elem.item.stories.length ?
                                    <View
                                        style={styles.centeredView}>
                                        {elem.item.stories.map((story) =>

                                            <Image
                                                style={styles.story}
                                                source={{
                                                    uri: story.image,
                                                }} />)}</View> :
                                    null}
                            </Modal>
                        </>

                    )
                }}
            />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 8,
        paddingTop: 40,
        margin: "auto",
    },
    flatlist: {
        cursor: "pointer"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    story: {
        width: "100%",
        height: "100%"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 60 / 2,
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        marginLeft: 2,
    },
    contanier: {
        flexDirection: "row",
        padding: 5,
        cursor: "pointer"
    },
    name: {
        marginTop: 5,
        paddingLeft: 10,
    },
    time: {
        fontSize: 12,
        paddingLeft: 10
    }
})

export default InstaStories;