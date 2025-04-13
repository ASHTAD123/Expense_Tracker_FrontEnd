import axios from "axios";

// Correctly assign VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL;

export const API_REGISTER_USER_URL = `${API_URL}/register`;

export const registerUser = async (registrationDetails) => {
  try {
    return await axios.post(API_REGISTER_USER_URL, registrationDetails, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default registerUser;
