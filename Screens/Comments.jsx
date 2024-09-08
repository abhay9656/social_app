import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { Button, IconButton, Text, TextInput } from 'react-native-paper'
import app from '../firebaseConfig';

const db = getFirestore(app);

const Comments = ({ visible, setVisible, postData, feedList, setFeedList, index }) => {

    const [userInput, setUserInput] = useState('');

    const addComment = async () => {
        const ref = doc(db, 'socialpost', postData.id);
        await setDoc(ref,
            { comments: (Array.isArray(postData.comments) ? [...postData.comments, userInput] : [userInput]) },
            { merge: true });

        const updateData = (await getDoc(ref)).data();

        const temp = feedList;
        temp[index] = { ...postData, comments: updateData.comments };
        setFeedList([...temp]);
    }

    return (
        <Modal visible={visible} onRequestClose={() => { setVisible(false) }} >
            <View style={styles.header}>
                <IconButton icon={'arrow-left'} onPress={()=>{setVisible(false)}}>Close</IconButton>
                <Text style={styles.headerTitle}>Comments</Text>
            </View>

            <View>
                {
                    (postData.comments ? postData.comments : []).map((comment, index) => {
                        return <Text key={index}>{comment}</Text>
                    })
                }
            </View>
            <View style={styles.commentInput}>
                <TextInput style={{ flex: 1 }} onChangeText={setUserInput} value={userInput} />
                <Button
                    mode='contained'
                    onPress={addComment}
                    icon={'send'}
                >Post</Button>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    header: {
        height: 60,
       
        flexDirection: 'row',
        alignContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        alignSelf: 'center'
    }
})

export default Comments