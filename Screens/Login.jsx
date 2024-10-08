import { View, Text, Modal } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import app from '../firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

const Login = ({ visible, setVisible, openSignup }) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = (data) => {
        // alert(JSON.stringify(data)); 

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((result) => {
                const { user } = result;
                console.log(user);
                alert('Logged in successfully');
            }).catch((err) => {
                console.log(err);
                alert(err.message);
            });
    };

    return (
        <Modal visible={visible} onRequestClose={() => { setVisible(false) }}>
            <View>
                <Text style={{fontSize:24,textAlign:'center',marginTop:100,marginBottom:30,fontWeight:'bold'}}>Login</Text>

                <Controller
                    control={control}
                    rules={{
                        required: { message: 'Email is required', value: true }
                    }}

                    render={({ field }) => {
                        return <TextInput
                            onBlur={field.onBlur}
                            onChangeText={field.onChange}
                            value={field.value}
                            label={"Email Address"}
                            error={errors.email}
                        />
                    }}
                    name='email'
                />
                <Text>{errors.email?.message}</Text>


                <Controller
                    control={control}
                    rules={{
                        required: { message: 'Password is required', value: true },
                    }}

                    render={({ field }) => {
                        return <TextInput
                            secureTextEntry
                            onBlur={field.onBlur}
                            onChangeText={field.onChange}
                            value={field.value}
                            label={"Password"}
                            error={errors.password}
                        />
                    }}
                    name='password'
                />
                <Text>{errors.password?.message}</Text>

                <Button onPress={handleSubmit(onSubmit)} mode='contained'>Login</Button>

                <Button onPress={openSignup} style={{ marginTop: 20 }} mode='outlined'> Not Registered Yet? </Button>

            </View>
        </Modal>
    )
}

export default Login;