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
      publishPost(data);
    }

    const publishPost = async (data) =>{
      const docRef=await addDoc(collection(db,'socialposts'),data)
      console.log(docRef);
    }
  return (
    <View>
      <Text style={{textAlign:'center',fontSize:24}}>Add New Post</Text>
      <Controller
        control={control}
        rules={{
          required:{message:'Title is required',value:true},
        }}
        render={( { field}) => (
         <TextInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            label={'Post Title'}
            error={errors.title}
          />
        )}
        name="title"
      />
      <Text>{errors.title?.message}</Text>
       <Controller
        control={control}
        rules={{
          required:{message:'Title is required',value:true},
        }}
        render={( { field  }) => (
         <TextInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            label={'Post Description'}
            error={errors.title}
          />
        )}
        name="description"
      />
      <Text>{errors.title?.message}</Text>
      
      
        <Button onPress={handleSubmit(onSubmit)} mode={'contained'}>Post</Button>
    </View>
  )
}

export default Feed
