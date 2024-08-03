import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Tab= createBottomTabNavigator();

export default function App() {
  return (
   <Tab.Navigator>
     <Tab.Screen name="Home" component={Home}/>
     <Tab.Screen name="Profile" component={Profile}/>
     </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
