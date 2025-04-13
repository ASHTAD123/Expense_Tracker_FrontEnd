import axios from "axios";
import deleteExpenseService from "../Services/DeleteService";

const deleteUserExpense = (id) => {

    deleteExpenseService(id).then((res)=>{

      console.log("Expense Deleted Successfully");
      
    }).catch((error)=>{
      console.log(error);
      
    })
  }

export default deleteUserExpense;