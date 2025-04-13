import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const API_ADD_EXPENSE_URL=`${API_URL}/addExpense`;

export const addExpense = async (expenseDetails) => {
    
    try {
    return await axios.post(API_ADD_EXPENSE_URL, expenseDetails, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return await Promise.reject(error);
  }
}

export default addExpense;