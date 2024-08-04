import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddPost from './Screens/AddPost';
import Feed from './Screens/Feed';
import { NavigationContainer } from '@react-navigation/native';
const Tab= createBottomTabNavigator();

export default function App() {
  return (
   < NavigationContainer>
   <Tab.Navigator>
     <Tab.Screen name="Feed" component={Feed}/>
     <Tab.Screen name="AddPost" component={AddPost}/>
     </Tab.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  },
});
