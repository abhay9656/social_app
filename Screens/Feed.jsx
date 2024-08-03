import React, { useState } from 'react'
import {Text, View } from 'react-native'
import { TextInput,Button } from 'react-native-paper'

const Feed = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

  return (
    <View>
      <Text>
         Feed Screen

      </Text>
      <TextInput label={'Post Title'}></TextInput>
      <TextInput label={'Post Description'}></TextInput>
        <Button mode={'contained'}>Post</Button>
    </View>
  )
}

export default Feed
