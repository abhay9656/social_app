import React, { useState } from 'react'
import {Text, View } from 'react-native'
import { TextInput,Button } from 'react-native-paper'
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import app from '../firebaseConfig';
import { Controller, useForm } from 'react-hook-form';

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
    const onSubmit = (data) => {
      alert(JSON.stringify(data));
    }

    const publishPost = async () =>{
      const docRef=await addDoc(collection(db,'socialposts'),{title,description})
      console.log(docRef);
    }
  return (
    <View>
      <Text style={{textAlign:'center',fontSize:24}}>Add New Post</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={( { onChange, onBlur, value  }) => (
         <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label={'Post Title'}
            error={errors.title}
          />
        )}
        name="title"
      />
      
       <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={( { onChange, onBlur, value  }) => (
         <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label={'Post Description'}
          />
        )}
        name="description"
      />
      
      
        <Button onPress={handleSubmit(onSubmit)} mode={'contained'}>Post</Button>
    </View>
  )
}

export default Feed
