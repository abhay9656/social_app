import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddPost from './Screens/AddPost';
import Feed from './Screens/Feed';
import { NavigationContainer } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import Signup from './Screens/Signup';
import { useEffect, useState } from 'react';
import Login from './Screens/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);
const Tab = createBottomTabNavigator();

export default function App() {

  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, [])


  const openLogin = () => {
    setLoginOpen(true);
    setSignupOpen(false);
  }

  const openSignup = () => {
    setSignupOpen(true);
    setLoginOpen(false);
  }

  return (
    <NavigationContainer>
      <Signup visible={signupOpen} setVisible={setSignupOpen} openLogin={openLogin} />
      <Login visible={loginOpen} setVisible={setLoginOpen} openSignup={openSignup} />
      <Tab.Navigator screenOptions={({route})=>{
        return {
          tabBarIcon: ({focused, color, size})=>{
            let iconName;
            if(route.name === 'Feed'){
              iconName = focused ? 'home' : 'home-outline';
            }else if(route.name === 'Addpost'){
              iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            }
            return <IconButton icon={iconName} size={size} color={focused ?'blue':'black'} />
          }
        }
      }}>
        <Tab.Screen name="Feed" component={Feed} options={{
          headerRight: () => !userLoggedIn ? <IconButton
            icon={'account-circle'}
            onPress={() => { setLoginOpen(true); }} />
            :
            <IconButton
              icon={'logout'}
              onPress={() => { setUserLoggedIn(false); }} />
        }} />
        <Tab.Screen name="Addpost" component={AddPost} />
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
  },
});