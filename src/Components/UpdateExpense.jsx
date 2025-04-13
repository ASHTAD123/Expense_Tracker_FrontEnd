import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import updateExpense from "../Services/UpdateExpenseService";
import findExpense from "../Services/GetExpenseById";
import bg from '../assets/bg.jpg'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigationbar from "../Components/Navbar";

const UpdateExpense = () => {
 
    const [expenseNameError, setExpenseNameError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [dateError, setDateError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [failureMsg, setFailureMsg] = useState("");
    const [validated, setValidated] = useState(false);

  const [updatedExpenseDetails, setUpdatedExpenseDetails] = useState({
    expenseId: "",
    expenseName: "",
    amount: "",
    date: "",
    description: "",
  });

  const { expenseId } = useParams();

  useEffect(() => {

    findExpense(expenseId)
      .then((res) => {
        console.log("RESPONSE: ", res.data);
        setUpdatedExpenseDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [cleardDetails, setClearDetails] = useState({
    expenseId: "",
    expenseName: "",
    amount: "",
    date: "",
    description: "",
  });

  const handleReset = () => {
    setUpdatedExpenseDetails("")
    setSuccessMsg("");
    setFailureMsg("");
    setExpenseNameError("");
    setAmountError("");
    setDateError("");
    setDescriptionError("");


    setUpdatedExpenseDetails(cleardDetails)
  };
  const handleChange = (e) => {
    handleReset();
    const value = e.target.value;
    setUpdatedExpenseDetails({
      ...updatedExpenseDetails,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (event) => {

    const form = event.currentTarget;
   
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
   
    setValidated(true);
    console.log(updatedExpenseDetails, expenseId);

    try{
     const response = updateExpense(updatedExpenseDetails, expenseId);
      
      response.then((response)=>{
       
        
          if (response.status === 200 || response.status === 202) {
            
            let successMsg = "Expense Updated Successfully";
            
            toast.success(successMsg, {
              autoClose: 1000,
            });
            console.log(" Status: ", response.status);
            setSuccessMsg(setSuccessMsg)
            console.log(successMsg);
            handleReset();
          } 
      }).catch((error)=>{
      
        if (error.status === 400 || error.status === 500) {
      
          console.log(" Status: ", error.response.status);
          console.error("Failed to update expense");
          alert("Failed to add update :( ,Pls check your filled details");
    
          if ( error.response.data ==="Unable to update expense,User not found" ||
               error.response.data==="Unable to update expense,Expense not found with the given expense details"){
            console.log(error.response.data);
            alert("Unable to update expense, Pls try logging in again");
          }
          console.log(" ERROR");
          console.log(error);
          setExpenseNameError(error.response.data.expenseName);
          setAmountError(error.response.data.amount);
          setDateError(error.response.data.date);
          setDescriptionError(error.response.data.description);
        }
      });
    }catch (error) {
        console.error("Failed to add Expenses", error);
      }
  };

  return (

    <div
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute", // Ensure full coverage
      left: 0,
      top: 0,
    }}
  >

    <ToastContainer />
    <Navigationbar/>

       <Container
      className="p-4 rounded"
      style={{ 
        maxWidth: "400px",
        width: "90%",
      }} 
    >
      <Form className="bg-white p-4 rounded">
    
      <h2 className="text-center fs-3 mb-4 text-success">Modify Expense</h2>

      {successMsg && <div className="text-center text-success">{successMsg}</div>}
      {failureMsg && <div className="text-center text-danger">{failureMsg}</div>}

      <Form.Group className="mb-3" >
          <Form.Label className="fs-6 text-start d-block mb-2">
            Expense Name
          </Form.Label>
          <Form.Control
            type="text"
            name="expenseName"
            className="form-control"
            placeholder="Expense Name"
            value={updatedExpenseDetails.expenseName}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        {expenseNameError && (
          <div className="text-start text-danger">{expenseNameError}</div>
        )}
  
  <Form.Group className="mb-3" >
          <Form.Label className="fs-6 text-start d-block">Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            className="form-control"
            placeholder="Enter amount"
            onChange={(e) => handleChange(e)}
            value={updatedExpenseDetails.amount}
          />
        </Form.Group>
        {amountError && (
          <div className="text-start text-danger">{amountError}</div>
        )}

<Form.Group className="mb-3">
          <Form.Label className="fs-6 text-start d-block">Date</Form.Label>
          <Form.Control
            type="date"
            id="start"
            name="date"
            value={updateExpense.date}
            min="2018-01-01"
            max="2018-12-31"
            onChange={(e) => handleChange(e)}
            
          />
        </Form.Group>
        {dateError && <div className="text-start text-danger">{dateError}</div>}

        <Form.Group className="mb-3" >
          <Form.Label className="fs-6 text-start d-block">
            Description
          </Form.Label>
          <textarea
            id="w3review"
            name="description"
            value={updatedExpenseDetails.description}
            rows="4"
            cols="35"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </Form.Group>
        {descriptionError && (
          <div className="text-start text-danger">{descriptionError}</div>
        )}
    <div className="text-center mt-4">
          <div className="d-flex justify-content-center gap-3">
            <Button className="fs-6" variant="success" onClick={handleSubmit}>
              Update
            </Button>
            <Button className="fs-6" variant="danger" type="reset" onClick={handleReset} >
              Reset
            </Button>
          </div>
     </div>
        
      </Form>
   
      </Container>
</div>
  );
};

export default UpdateExpense;
