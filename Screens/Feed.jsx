import React, { useState } from 'react'
import {Text, View } from 'react-native'
import { TextInput,Button } from 'react-native-paper'
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import app from '../firebaseConfig';
import { useForm } from 'react-hook-form';

const db =getFirestore(app);

const Feed = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        title: "",
        description: "",
      },
    })
    const onSubmit = (data) => console.log(data)

    const publishPost = async () =>{
      const docRef=await addDoc(collection(db,'socialposts'),{title,description})
      console.log(docRef);
    }
  return (
    <View>
      <TextInput onChangeText={setTitle} label={'Post Title'}></TextInput>
      <TextInput onChangeText={setDescription} label={'Post Description'}></TextInput>
        <Button onPress={publishPost} mode={'contained'}>Post</Button>
    </View>
  )
}

export default Feed
