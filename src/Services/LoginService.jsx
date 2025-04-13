import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const API_LOGIN_USER_URL = `${API_URL}/login`;

export const loginUser = async(loginDetails)=>{

    try{
        return await axios.post(API_LOGIN_USER_URL,loginDetails,{
            withCredentials: true,
              
        });
    }catch(error){
        return await Promise.reject(error);
}
}
export default loginUser;