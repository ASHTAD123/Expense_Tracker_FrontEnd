import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const API_UPDATE_EXPENSE_URL=`${API_URL}/updateExpense/`;

export const updateExpense = async (modifiedProduct,expenseId) => {
    try {
    return await axios.post(`${API_UPDATE_EXPENSE_URL}`+`${expenseId}`, modifiedProduct,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      },
    });
  } catch (error) {
    return await Promise.reject(error);
  }
}

export default updateExpense;