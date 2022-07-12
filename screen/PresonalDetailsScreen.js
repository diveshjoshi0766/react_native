import React, { useContext, useState, useEffect } from "react";
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
    Animated,
    Easing ,
    Button
} from "react-native";
import * as Animatable from 'react-native-animatable';
import { RadioButton } from 'react-native-paper'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios";

import { useTheme } from 'react-native-paper';
import { BASE_URL } from "../config";
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



const _data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];



export default function PresonalDetailsScreen({navigation}) {

    const {userInfo, panelist_basic_details,udpate_profile} = useContext(AuthContext);
        // console.log(userInfo.Result.countryID)
        // console.log(userInfo.Result.panelistID)
    // const [data, setData] = useState([])

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

    const [state_,setState_data]=useState(null)
    const [state_code, setState_code] = useState(null);
    const [city, setCity] = useState(null); 
    useEffect(() => {
        fetchState();
    }, [])
    useEffect(() => {
        if(state_code != 0){
            fetchCity();
        }
    }, [state_code])
    useEffect(() => {
        console.log(state_)
    }, [state_])
    const fetchState=async()=>{
        const response=await axios(`${BASE_URL}/getStateList/232`);
        setState_data(response.data)    
    }

    const fetchCity=async()=>{
        const response=await axios(`${BASE_URL}/getCityList/${state_code && state_code.value ? state_code.value : 0}`);
        setCity(response.data)    
    }

    let state_data = []
    console.log(state_data)
    if(state_ && state_.status == 'success'){
        let len = Object.values(state_.result).length
        for(let i=0;i<len;i++){
            let obj = {
                label: Object.values(state_.result)[i].name,
                value: Object.values(state_.result)[i].id
            }
            // data.push(obj)
            state_data.push(obj)
        }
        console.log(state_data)
    }

    console.log(city)


    let city_data = []
    console.log(city_data)
    if(city && city.message != 'Cities are not found!'){
        let len = Object.values(city.result).length
        for(let i=0;i<len;i++){
            let obj = {
                label: Object.values(city.result)[i].name,
                value: Object.values(city.result)[i].id
            }
            // data.push(obj)
            city_data.push(obj)
        }
        console.log(data)
    }

    console.log(state_code && state_code.value ? state_code.value + " <- state code" : ' no state_code')

  

    
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)

    // date state
    const [date, setDate] = useState("")
    
    const [checked, setChecked] = React.useState('first');
    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [chooseState, setChooseState] = useState(null);
    const [chooseCity, setChooseCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [phone, setPhone] = useState(null);

    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };


    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            
          </Text>
        );
      }
      return null;
    };

    const [value_, setValue_] = useState(null);
    const [isFocus_, setIsFocus_] = useState(false);

    const renderLabel_ = () => {
      if (value_ || isFocus_) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            
          </Text>
        );
      }
      return null;
    };



    return (
    <View style={styles.container}>
    <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: "rgb(235 235 235)"
        }]}
    >
        <Text style={{color: '#000000', marginTop:normalize(5), fontWeight: 'Bold', fontSize: normalize(20), fontFamily: 'Poppins Regular 400'}}>Good Afternoon, RamChara</Text>
        <Text style={{color: '#000000', marginTop:normalize(5), fontSize: normalize(20), fontFamily: 'Poppins Regular 400'}}>Presonal Details</Text>

        <View style={{display: 'flex', flexDirection:'row', alignItems: 'center', marginTop: '0'}}>
            <Image
                style={styles.stretch}
                source={require('../assets/logo_remove_bg.png')}
            />
            <View style={{paddingLeft: normalize(10)}}>
                <Text style={[styles.label, { fontSize: normalize(15), fontFamily: 'Poppins Regular 400'}]}>SOID: </Text>
                <Text style={[styles.label, { fontSize: normalize(15), fontFamily: 'Poppins Regular 400'}]}>Profile Completion: </Text>
                <Text style={[styles.label, { fontSize: normalize(15), fontFamily: 'Poppins Regular 400'}]}>Email: </Text>
            </View>
        </View>

        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <TextInput 
                placeholder="First Name"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
                onChangeText={(val) => handlePasswordChange(val)}
            />
        </View>

        <View style={{backgroundColor: '#ffffff', 
        marginTop: normalize(10),
        minHeight: 40,
        flex:1,
        flexDirection:'row',
        alignItems: "center",
        borderRadius: normalize(10),
        paddingLeft: 3,
        paddingRight: 3,}}>
        <TouchableOpacity
        onPress={showDatePicker}
        >
        <View >
            <Text style={{paddingLeft: 4}}>Select date of Birth</Text>
            <Image source={require('../assets/date.png')} size={{height: 20, width: 20}}></Image>
        </View>
        </TouchableOpacity>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        
        </View>
        <View style={[styles.action]}>
            
            <Text style={[styles.textInput, {
                    color: colors.text
                }]}>Gender</Text>
            <RadioButton
                value="first"
                status={ checked === 'first' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('first')}
            />
            <RadioButton
                value="second"
                status={ checked === 'second' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('second')}
            />

        </View>

        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <TextInput 
                placeholder="Address 1"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
            />
        </View>

        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <TextInput 
                placeholder="Address 2"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
            />
        </View>
        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={state_data} 
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select state' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    console.log(item)
                    setState_code(item)
                }}
            />
        </View>

        {city && city.message != 'Cities are not found!' ? (
            <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            {renderLabel_()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={city_data} 
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select City' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue_(item.value);
                    setIsFocus_(false);
                }}
            />
        </View>
        ) : (
            <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <TextInput 
                placeholder="Country India"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => setValue_(val)}
            />
        </View>
        )}
        

        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <TextInput 
                placeholder="Country India"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
            />
        </View>

        <View style={[styles.action, {backgroundColor: '#ffffff'}]}>
            <TextInput 
                placeholder="Zipcode"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
            />
            <TextInput 
                placeholder="Phone Number"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
            />
        </View>

        <View style={styles.button}>

            <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}
                style={[styles.signIn, {
                    backgroundColor: '#378C3C',
                }]}
            >
                <Text style={[styles.textSign, {
                    color: '#fff',
                    fontFamily: 'Poppins Regular 400'
                }]}>Next</Text>
            </TouchableOpacity>
        </View>
    </Animatable.View>
  </View>
);
}


const styles = StyleSheet.create({
    dropdown: {
        height: 'justifyContent',
        width: '100%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },  
    container: {
        flex: 1, 
        backgroundColor: 'rgb(235 235 235)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    stretch: {
        width: SCREEN_WIDTH*0.20,
        height: SCREEN_WIDTH*0.20,
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
        marginTop: normalize(10),
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
  });

