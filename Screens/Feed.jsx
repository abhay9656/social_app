import React, { useState } from 'react'
import {Text, View } from 'react-native'
import { TextInput,Button } from 'react-native-paper'
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import app from '../firebaseConfig';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

const db =getFirestore(app);

const Feed = () => {
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');

    const [image, setImage] = useState(null)

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

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
      <Button onPress={pickImage} >Pick an image</Button>
      {image && <Image source={{ uri: image }} resizeMode='contain' style={{width:'100%',height:300}} />}
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
