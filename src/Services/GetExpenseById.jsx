import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const API_FIND_EXPENSE_URL=`${API_URL}/`;

export const findExpense = async (expenseId) => {
    try {
      console.log("INSIDE FIND EXPENSE");
      
      console.log("URL : "+ `${API_FIND_EXPENSE_URL}`+`${expenseId}`);
      
    return await axios.get(`${API_FIND_EXPENSE_URL}`+`${expenseId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      },
    });
  } catch (error) {
    return await Promise.reject(error);
  }
}

export default findExpense;