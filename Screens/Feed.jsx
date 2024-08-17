import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FlatList,StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import app from '../firebaseConfig';

const db= getFirestore(app);

const FeedCard =({data,index})=>{
  return <Card style={styles.Card} key={data.id}>
   <Card.Title title={data.title} subtitle={data.description}/>
   <Text>{new Date(data.postedOn).toDateString()}</Text>
   <Card.Cover source={{uri:data.image}}/>
   <View style={styles.container}>
      <IconButton icon="heart-outline" mode='contained'/>
      <IconButton icon="comment-outline" mode='contained'/>
      <IconButton icon="share" mode='contained'/>
   </View>
  </Card>
}

const Feed = () => {

  const [feedList, setfeedList] = useState([])
  const [refreshing, setrefreshing] = useState(false)
  const loadFeed = async () => {
    // Fetch feed from
    const ref=collection(db,'socialpost');
    setrefreshing(true);
    const snapshot =await getDocs(ref);
    const data = snapshot.docs.map(doc =>{
      return {...doc.data(),id:doc.id}
    })
    console.log(data);
    setfeedList(data);
    setrefreshing(false);
  }

  useEffect(() => {
    loadFeed();
  },[]);


  const displayFeed =()=>{
    return <View>
      <FlatList
      data={feedList}
      renderItem={({item,index})=> <FeedCard data={item} index={index} />} 
      refreshing={refreshing} onRefresh={loadFeed}/> 
    </View>
  }

  return (
    <View>
      <Text style={{fontSize:24,textAlign:'center'}}>Feed</Text>
      {displayFeed()}
    </View>
  )
 
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  },
  Card:{
    margin:10
  }
})
export default Feed
