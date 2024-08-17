import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import app from '../firebaseConfig';

const db= getFirestore(app);

const Feed = () => {

  const loadFeed = async () => {
    // Fetch feed from
    const ref=collection(db,'socialpost');
    const snapshot =await getDocs(ref);
    console.log(snapshot.docs);
  }

  useEffect(() => {
    loadFeed();
  },[]);

  return (
    <View>
      <Text>Feed</Text>
    </View>
  )
}

export default Feed
