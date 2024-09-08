import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { Avatar, Button, IconButton, Text, TextInput } from 'react-native-paper'
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

            <View style={{padding:20}}>
                {
                    (postData.comments ? postData.comments : []).map((comment, index) => {
                        return  <View style={{marginBottom:10}}>
                            <View style={styles.comment}>
                            <Avatar.Image size={40} label={comment[0]}/>
                            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                                <View>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>John Doe</Text>
                                <Text key={index}>{comment}</Text>
                                </View>
                                
                            <IconButton icon={'heart-outline'} iconColor='red' size={20}/>
                            </View>
                            
                        </View> 
                        <Text>Reply</Text>
                        </View>
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
    },
    comment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        gap: 10
    }
})

export default Comments