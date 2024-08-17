import { getFirestore } from 'firebase/firestore';
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import app from '../firebaseConfig';

const db= getFirestore(app);

const Feed = () => {

  const loadFeed = async () => {
    // Fetch feed from
  }

  return (
    <View>
      <Text>Feed</Text>
    </View>
  )
}

export default Feed
