import React, { useState } from 'react'
import {Text, View } from 'react-native'
import { TextInput,Button } from 'react-native-paper'
import { getFirestore } from 'firebase/firestore';
import app from '../firebaseConfig';

const db =getFirestore(app);

const Feed = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const publishPost = async()=>{
      const docRef=await addDoc(collection(db,'socialposts'),{title,description})
      console.log(docRef);
    }
  return (
    <View>
      <Text>
         Feed Screen
      </Text>
      <TextInput onChangeText={setTitle} label={'Post Title'}></TextInput>
      <TextInput onChangeText={setDescription} label={'Post Description'}></TextInput>
        <Button onPress={publishPost} mode={'contained'}>Post</Button>
    </View>
  )
}

export default Feed
