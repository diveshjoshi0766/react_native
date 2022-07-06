import React, { useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Platform, 
    PixelRatio,
    CheckBox,
    Animated,
    Easing 
} from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import Logo from "../components/Logo";
import TagLine from "../components/TagLine";
import { AuthContext } from "../context/AuthContext";

var {width: SCREEN_WIDTH, height: SCREEN_HEIGHT,} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;
console.log(SCREEN_HEIGHT)
console.log(SCREEN_WIDTH)
export function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
const spinValue = new Animated.Value(0);

export default function SignUpScreen({navigation}) {
    
    React.useEffect(() => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        }, []);

        const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    

    const { colors } = useTheme();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)

    const [isSelected, setSelection] = useState(false);

    const {isLoading, register} = useContext(AuthContext);


    return (
        
    <View style={styles.container}>
    <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: "rgb(235 235 235)"
        }]}
    >

        {/* Logo */}
        <Logo/>
        {/* TagLine */}
        <TagLine/>

        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <FontAwesome 
                name="user-o"
                color={colors.text}
                size={20}
            />
            <TextInput 
                placeholder="Email"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setEmail(val)}
                onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
            />
            <Animatable.View
                animation="bounceIn"
            >
                <Feather 
                    name="check-circle"
                    color="green"
                    size={20}
                />
            </Animatable.View>
        </View>

        <Animatable.View animation="fadeInLeft" duration={500}>
        {/* <Text style={styles.errorMsg}>Username must be 4 characters long.</Text> */}
        </Animatable.View>

        {/* <Text style={[styles.text_footer, {
            color: colors.text,
            marginTop: 35
        }]}>Password</Text> */}
        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <Feather 
                name="lock"
                color={colors.text}
                size={20}
            />
            <TextInput 
                placeholder="Password"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setPassword(val)}
            />
            <TouchableOpacity
            >
                {/* {data.secureTextEntry ? 
                <Feather 
                    name="eye-off"
                    color="grey"
                    size={20}
                />
                :
                <Feather 
                    name="eye"
                    color="grey"
                    size={20}
                />
                } */}
                <Feather 
                    name="eye"
                    color="grey"
                    size={20}
                />
            </TouchableOpacity>
        </View>

        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <Feather 
                name="lock"
                color={colors.text}
                size={20}
            />
            <TextInput 
                placeholder="Confirm Password"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setConfirmPassword(val)}
            />
            <TouchableOpacity
            >
                {/* {data.secureTextEntry ? 
                <Feather 
                    name="eye-off"
                    color="grey"
                    size={20}
                />
                :
                <Feather 
                    name="eye"
                    color="grey"
                    size={20}
                />
                } */}
                <Feather 
                    name="eye"
                    color="grey"
                    size={20}
                />
            </TouchableOpacity>
        </View>

        
        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <TextInput 
                placeholder="First Name"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setFirstName(val)}
            />
        </View>

        
        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <TextInput 
                placeholder="Last Name"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setLastName(val)}
            />
        </View>

        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                />
                <Text style={styles.label}>I accept the <Text style={{color: '#1E96F0'}}>terms and aggrement</Text></Text>
            </View>
        </View>

        <View style={styles.button}>
            <TouchableOpacity
                onPress={() => register(email, password, confirmPassword, firstName, lastName)}
                style={[styles.signIn, {
                    backgroundColor: '#378C3C',
                }]}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>SIGN IN</Text>
            </TouchableOpacity>
        </View>
            
        <TouchableOpacity>
        <Text style={{color: '#000000', marginTop:15, textAlign: "center", fontFamily: 'Poppins Regular 400', fontSize: 20}}>Or continue with</Text>
        </TouchableOpacity>
        <View style={{alignItems: "center", flexDirection: 'row', justifyContent:'space-evenly', marginTop: 20}}>

            <Image source={require('../assets/facebook_.png')} style={{height: 50, width: 50}}></Image>
            <Image source={require('../assets/google_.png')} style={{height: 50, width: 50}}></Image>
            
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Sign In Screen')}>
            <Text style={{color: '#000000', marginTop:15, textAlign: "center", fontSize:normalize(20), fontFamily: 'Poppins Regular 400'}}>Already a member: <Text style={{color: '#1E96F0', fontWeight: 'bold', fontFamily: 'Poppins Regular 400'}}>SIGN IN</Text></Text>
        </TouchableOpacity>
    </Animatable.View>
  </View>
    );
  }


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'rgb(235 235 235)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        maxWidth: SCREEN_WIDTH,
        maxHeight: SCREEN_HEIGHT
    },
    stretch: {
        width: SCREEN_WIDTH*0.5,
        height: SCREEN_WIDTH*0.5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: 'rgb(235 235 235)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        marginTop: normalize(10),
        minHeight: 40,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: normalize(10),
        paddingLeft: 3,
        paddingRight: 3,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        height: normalize(20),
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: normalize(5),
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOffset: {
        width: 0,
        height: 0
        },
        shadowOpacity: 0.3
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
  });
