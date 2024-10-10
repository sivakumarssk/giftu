import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react"
// import { removeLocal } from "../removeLocal";

const baseUrl = 'https://giftyou.ezewin.in';

// component name useApiCalls
function useApiCalls() {

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null)
    const [responseData, setresponseData] = useState(null)

    const navigation = useNavigation()

    // console.log('called');


    const apiCall = useCallback(async (endPoint, formData, token) => {

        setLoading(true)
        setApiError(null)
        setresponseData(null)

        try {

            const response = await axios.post(`${baseUrl}/${endPoint}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            // console.log(response,'ggvggfcgfcg');
            if (response.status === 200) {
                setresponseData(response.data)
                return response.data
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        } catch (error) {
            console.log(error, 'tfcfcf');
            if (error.response && error.response.status === 401) {
                alert('session expried')
                // removeLocal('token')
                navigation.replace('Login');
            } else {
                setApiError(error.response ? error.response.data.error : error.message)

            }

            if (error.response.status === 500) {
                setApiError('internal server error! please try after some time');
            }
        } finally {
            setLoading(false)
        }

    }, [])



    return { loading, apiError, responseData, apiCall,setApiError }
}


export default useApiCalls