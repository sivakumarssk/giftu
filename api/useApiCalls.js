import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store'
// import { removeLocal } from "../removeLocal";

const baseUrl = 'https://admin.giftyu.in';


const apiClient =axios.create({
    baseURL:baseUrl,
    headers:{
        'Content-Type':'multipart/form-data',
    }
})


const saveToken = async (key,value)=>{
    await SecureStore.setItemAsync(key,value)
}

const getToken = async(key) =>{
   return await SecureStore.getItemAsync(key)
}

const removeToken =async (key) =>{
    await SecureStore.deleteItemAsync(key)
}


function useApiCalls() {

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null)
    const [responseData, setresponseData] = useState(null)

    const navigation = useNavigation()


    const refreshAccessToken = async ()=>{
        try {
            const clientRefreshToken = await getToken('refreshToken');
            const response =await apiClient.post('/giftYU/refreshToken',{refreshToken:clientRefreshToken})
            if(response){                
                const {accessToken,refreshToken} = response.data
                await saveToken('accessToken',accessToken)
                await saveToken('refreshToken',refreshToken)
<<<<<<< HEAD
                console.log(accessToken,'access');
=======
                // console.log(accessToken,'access');
>>>>>>> 13d87f0 (Describe)
                
                return accessToken
            }
        } catch (error) {
            console.error('Token refresh Faled', error);   
            alert('Session expired. Please log in Again.');
            await removeToken('accessToken');
            await removeToken('refreshToken');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            throw error;
        }
    }

    useEffect(()=>{
        const requestInterceptor =apiClient.interceptors.request.use(
            async(config)=>{

                const publicEndpoints = ['/giftYU/register', '/giftYU/login','/giftYU/getDefaultEvents'];

                const token =await getToken('accessToken');
                
                if(token && !publicEndpoints.some(endpoint=> config.url.includes(endpoint))){
                    config.headers['Authorization'] =`Bearer ${token}`;
                }
                return config
            },
            (error)=>{
<<<<<<< HEAD
                console.log('request',error);
=======
                // console.log('request',error);
>>>>>>> 13d87f0 (Describe)
                return Promise.reject(error)
            }
        );

        const responseInterceptor = apiClient.interceptors.response.use(
             async(response)=>{
                const publicEndpoints = ['/giftYU/login','/giftYU/registerVerifyOtp'];

                if(publicEndpoints.some(endPoint => response.config.url.includes(endPoint))){
                    const {accessToken,refreshToken} = response.data
                    await saveToken('accessToken',accessToken)
                    await saveToken('refreshToken',refreshToken)
                }

                if(response.config.url.includes('/giftYU/verifyOTP')){
                    const {accessToken} = response?.data
                    await saveToken('accessToken',accessToken)
                }

                return response
            },
            async (error)=>{
                if(error.response && error.response.status === 401){
                    try {
                        const newAccessToken = await refreshAccessToken();
                        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`
                        return apiClient.request(error.config);

                    } catch (refreshError) {
                        // console.log("refresh Token Error", refreshError);
                        // alert('Session expired. Please log in Again.');
                        // navigation.reset({
                        //     index:0,
                        //     routes:[{name : 'Login'}]
                        // })
                        return Promise.reject(refreshError)
                    }
                }
                return Promise.reject(error)
            }
        );
        return ()=>{
            apiClient.interceptors.request.eject(requestInterceptor);
            apiClient.interceptors.request.eject(responseInterceptor);
        }
    },[])


    const apiCall = useCallback(async (type,endPoint, formData) => {

        

        setLoading(true)
        setApiError(null)
        setresponseData(null)

        try {
            // console.log('entered');

            const response = await apiClient[type](`/giftYU/${endPoint}`, formData);
            // console.log(response.data,'ggvggfcgfcg');
            if (response.status === 200) {
                setresponseData(response.data)
                return response.data
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        } catch (error) {
            console.log(error, 'tfcfcf');
            if(error.response && error.response.status === 403){
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
                setApiError('Account Freezed,Contact Admin through Website')
            }
            if (error.response && error.response.status === 500) {
                setApiError('Internal server error! Please try after some time');
            } else {         
                setApiError(error.response.data.message)
            }

        } finally {
            setLoading(false)
        }

    }, [])



    return { baseUrl,loading, apiError, responseData, apiCall,setApiError }
}


export default useApiCalls