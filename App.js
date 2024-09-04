import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import GiftyuSplashScreen from './screen/splashSreen/GiftyuSplashScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoardScreen1 from './screen/onBoardScreens/OnBoardScreen1';
import OnBoardScreen2 from './screen/onBoardScreens/OnBoardScreen2';
import OnBoardScreen3 from './screen/onBoardScreens/OnBoardScreen3';
import Login from './screen/login-signup/Login';
import SignUpScreen from './screen/login-signup/SignUpScreen';
import OtpVerify from './screen/login-signup/OtpVerify';
import ForgotPassScreen from './screen/login-signup/ForgotPassScreen';
import ForgotOtp from './screen/login-signup/ForgotOtp';
import ChangePassScreen from './screen/login-signup/ChangePassScreen';
import HomeScreen from './screen/homePage/HomeScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './components/utills/colors';
import SearchScreen from './screen/homePage/SearchScreen';
import WishlistScreen from './screen/Wishlist/WishlistScreen';
import AllEventsScreen from './screen/allEvents/AllEventsScreen';
import InvitationScreen from './screen/invitations/InvitationScreen';
import ProfileScreen from './screen/profile/ProfileScreen';


const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator()

const defaultOptions = { headerShown: false };
function BottomNavigation() {
  return (
    <Bottom.Navigator screenOptions={({route})=>({
      tabBarHideOnKeyboard:true,
      tabBarItemStyle:{padding:8},
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        }
        // Add more icons for other routes

        if(route.name === 'Home'){
          return <Ionicons name={iconName} size={size} color={color} />;
        }else if(route.name === 'WishlistScreen'){
          useImage = true;
          imageSource = focused
          ?require('./assets/tabBar/wishlist-Active.png') : require('./assets/tabBar/wishlist.png')
          return (
            <Image
              source={imageSource}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          );
        }else if(route.name === 'AllEventsScreen'){
          useImage = true;
          imageSource = focused
          ?require('./assets/tabBar/allEvents-Active.png') : require('./assets/tabBar/allEvents.png')
          return (
            <Image
              source={imageSource}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          );
        }else if(route.name === 'InvitationScreen'){
          useImage = true;
          imageSource = focused
          ?require('./assets/tabBar/invitation-Active.png') : require('./assets/tabBar/invitation.png')
          return (
            <Image
              source={imageSource}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          );
        }else if(route.name === 'ProfileScreen'){
          useImage = true;
          imageSource = focused
          ?require('./assets/tabBar/profile-Active.png') : require('./assets/tabBar/profile.png')
          return (
            <Image
              source={imageSource}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          );
        }
      },
      tabBarActiveTintColor: colors.primary, // Active tab title color
      tabBarInactiveTintColor:colors.tabBar, // Inactive tab title color
    })
     
    }>
      <Bottom.Screen name='Home' component={HomeScreen} options={defaultOptions}  />
      <Bottom.Screen name='WishlistScreen'  component={WishlistScreen} 
      options={{
        ...defaultOptions,
        title:'Wishlist'
        }}  />
      <Bottom.Screen name='AllEventsScreen' component={AllEventsScreen} 
      options={{
        ...defaultOptions,  
        title:'All Events'
        }}  />
      <Bottom.Screen name='InvitationScreen' component={InvitationScreen} 
      options={{...defaultOptions,
        title:'Invitation'
      }}  />
      <Bottom.Screen name='ProfileScreen' component={ProfileScreen} 
      options={{...defaultOptions,
        title:'Profile'
      }}  />
    </Bottom.Navigator>
  )
}

export default function App() {


  return (
    <View style={{ flex: 1,backgroundColor: '#ffffff', }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name='GiftyuSplashScreen' component={GiftyuSplashScreen} options={defaultOptions} />
            <Stack.Screen name='OnBoardScreen1' component={OnBoardScreen1} options={defaultOptions} />
            <Stack.Screen name='OnBoardScreen2' component={OnBoardScreen2} options={defaultOptions} />
            <Stack.Screen name='OnBoardScreen3' component={OnBoardScreen3} options={defaultOptions} />

            {/* login-signup */}
            <Stack.Screen name='Login' component={Login} options={defaultOptions} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={defaultOptions} />
            <Stack.Screen name='OtpVerify' component={OtpVerify} options={defaultOptions} />
            <Stack.Screen name='ForgotPassScreen' component={ForgotPassScreen} options={defaultOptions} />
            <Stack.Screen name='ForgotOtp' component={ForgotOtp} options={defaultOptions} />
            <Stack.Screen name='ChangePassScreen' component={ChangePassScreen} options={defaultOptions} />


            {/* homeScreen */}
            <Stack.Screen name='HomeScreen' component={BottomNavigation} options={defaultOptions} />
            <Stack.Screen name='SearchScreen' component={SearchScreen} options={defaultOptions}/>

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    // borderColor:'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 60,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 10, height: 80 },
    backgroundColor: 'white',
    // overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  tabBarLabel:{
    fontSize:12,
    fontWeight:'800',
    fontFamily:'Manrope-semiBold'
  }
});
