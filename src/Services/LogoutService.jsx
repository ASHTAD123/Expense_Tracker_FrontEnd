import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_LOGOUT_USER_URL = `${API_URL}/logout`;

export const logoutUser = async() =>{

    
    try{
        return await axios.post(API_LOGOUT_USER_URL,{
            withCredentials: true,
            headers:{
                "Content-Type":"application/json",
            },
        });
    }catch(error){
        return await Promise.reject(error);
}
}
export default logoutUser;