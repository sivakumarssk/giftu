// File: src/hooks/useApiCalls.js
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const baseUrl = 'https://giftyou.ezewin.in';

function useApiCalls() {

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [responseData, setresponseData] = useState(null);

    const navigation = useNavigation();

    // Utility function to save tokens
    const saveToken = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    };

    // Retrieve token from secure storage
    const getToken = async (key) => {
        return await SecureStore.getItemAsync(key);
    };

    // Remove token from secure storage
    const removeToken = async (key) => {
        await SecureStore.deleteItemAsync(key);
    };

    // Refresh access token
    const refreshAccessToken = async () => {
        try {
            const refreshToken = await getToken('refreshToken');
            const response = await axios.post(`${baseUrl}/auth/refresh`, { refresh_token: refreshToken });
            const { accessToken } = response.data;
            await saveToken('accessToken', accessToken);
            return accessToken;
        } catch (error) {
            console.error("Token refresh failed:", error);
            await removeToken('accessToken');
            await removeToken('refreshToken');
            navigation.replace('Login');
            throw error;
        }
    };

    const apiCall = useCallback(async (type, endPoint, formData, token = '') => {
        setLoading(true);
        setApiError(null);
        setresponseData(null);

        try {
            // If no token is passed, try to fetch it from storage
            const accessToken = token || await getToken('accessToken');

            const response = await axios[type](`${baseUrl}/${endPoint}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                setresponseData(response.data);
                return response.data;
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                console.log("API Error:", error.response);
            }

            // Handle session expiration and refresh token
            if (error.response && error.response.status === 401) {
                try {
                    // Attempt to refresh token
                    const newAccessToken = await refreshAccessToken();
                    // Retry the original request with the new token
                    const retryResponse = await axios[type](`${baseUrl}/${endPoint}`, formData, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                            'Content-Type': 'multipart/form-data',
                        }
                    });

                    if (retryResponse.status === 200) {
                        setresponseData(retryResponse.data);
                        return retryResponse.data;
                    } else {
                        throw new Error(`Retry request failed with status ${retryResponse.status}`);
                    }
                } catch (refreshError) {
                    console.log("Refresh Token Error:", refreshError);
                    alert('Session expired. Please log in again.');
                    navigation.replace('Login');
                }
            } else {
                // Handle other errors
                setApiError(error.response ? error.response.data.error : error.message);

                if (error.response && error.response.status === 500) {
                    setApiError('Internal server error! Please try after some time');
                }
            }
        } finally {
            setLoading(false);
        }

    }, []);

    return { loading, apiError, responseData, apiCall, setApiError };
}

export default useApiCalls;
