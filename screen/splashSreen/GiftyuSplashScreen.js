
import { Animated, Image, StyleSheet, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useRef, useState } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

function GiftyuSplashScreen({navigation}) {
    const [appIsReady, setAppIsReady] = useState(false);

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const [image, setImage] = useState(false)


    useEffect(() => {
        const prepareResources = async () => {
            try {
                // Load fonts
                await Font.loadAsync({
                    // Load a font with a custom name
                    'Manrope-Medium': require('../../assets/fonts/Manrope-Medium.ttf'),
                    'Manrope-semiBold': require('../../assets/fonts/Manrope-SemiBold.ttf'),
                    ...Ionicons.font, // Load Ionicons font
                });

                // Hide splash screen after resources are loaded
                await SplashScreen.hideAsync();
                setAppIsReady(true);
            } catch (e) {
                console.warn(e);
            }
        };

        prepareResources();
    }, []);




    useEffect(() => {

        if(appIsReady){

        setTimeout(() => {
            setImage(true)
            // Start the animation  
            Animated.timing(scaleAnim, {
                toValue: 1, // Scale to 1 (fully expanded)
                duration: 2000, // Animation duration (1 second)
                useNativeDriver: true, // Use native driver for better performance
            }).start(()=>{
                navigation.replace('OnBoardScreen1')
                // navigation.replace('Login')
            });
        }, 1900);
    }

    }, [scaleAnim,appIsReady]);

    
  
    return (
        <View style={styles.main}>


            <Animated.View
                style={[
                    styles.circle,
                    {
                        transform: [
                            {
                                scale: scaleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 10], // The larger the second value, the bigger the circle
                                }),
                            },
                        ],
                    },
                ]}
            />


            <View style={!image ? styles.gif :styles.gifImg}>
                <Image
                    source={!image ?
                        require('../../assets/splashScreen/logoanimation.gif')
                        : require('../../assets/splashScreen/splashlogo.png')}
                    resizeMode={image ? 'contain' : ''}
                    style={styles.img}
                />
            </View>
        </View>
    )
}

export default GiftyuSplashScreen


const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    circle: {
        position: 'absolute',
        width: 100, // Circle size (will be scaled up)
        height: 100,
        borderRadius: 50, // Make the circle round
        backgroundColor: 'rgba(254, 216, 223, 1)', // Target background color
        top: '50%',
        left: '50%',
        marginLeft: -50, // Center the circle horizontally
        marginTop: -50, // Center the circle vertically
    },
    gif: {
        // width: 250,
        // height: 80,
        width: '85%',
        height: '18%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gifImg: {
        width: '90%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: '100%'
    }
})