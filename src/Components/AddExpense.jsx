import React from "react";
import { useState } from "react";
import addExpense from "../Services/ExpenseService";
import backgroundImage from "../assets/bg.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navigationbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from '../assets/bg.jpg'

const AddExpense = () => {

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("isAuthenticated inside add expense : " +isAuthenticated);

  const [expenseNameError, setExpenseNameError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [dateError, setDateError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");
  const [validated, setValidated] = useState(false);

  const [expenseDetails, setExpenseDetails] = useState({
    expenseName: "",
    amount: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    handleReset();
    const value = e.target.value;
    setExpenseDetails({ ...expenseDetails, [e.target.name]: value });
  };

  const handleReset = () => {
    setSuccessMsg("");
    setFailureMsg("");
    setExpenseNameError("");
    setAmountError("");
    setDateError("");
    setDescriptionError("");
  };

  const handleSubmit = (event) => {
   
    const form = event.currentTarget;
   
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

      try{
        const response = addExpense(expenseDetails);
      
        response
      
        .then((response) => {
        
          if (response.status === 200 || response.status === 202) {
            
            let successMsg = "Expense Added Successfully";

            toast.success(successMsg, {
              autoClose: 1000,
            });

            console.log(" Status: ", response.status);
            setSuccessMsg(successMsg)
            console.log(successMsg);
            handleReset();
          }
        })
        .catch((error) => {
          
          if (error.status === 400 || error.status === 500) {
            let failureMsg = "Failed to add expense :( , Pls check your filled details";
            console.log(" Status: ", error.response.status);
            console.error(failureMsg);
            setFailureMsg(failureMsg)

            if ( error.response.data ==="Unable to add expense, Pls try logging in again"){
              console.log(error.response.data);
              alert("Unable to add expense, Pls try logging in again");
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
}
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
      <Navigationbar />
      <Container
        className="p-4 rounded"
        style={{
          maxWidth: "400px",
          width: "90%",
         
        }} // Ensures responsiveness
      >
        <ToastContainer />

        <Form className=" p-5 rounded">
          <h2 className="text-center fs-3 mb-4 "><strong> Add Expense</strong></h2>
<br />
          {successMsg && (
            <div className="text-center text-success">{successMsg}</div>
          )}
          {failureMsg && (
            <div className="text-center text-danger">{failureMsg}</div>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="fs-6 text-start d-block mb-2">
              Expense Name
            </Form.Label>
            <Form.Control
              type="text"
              name="expenseName"
              className="form-control"
              placeholder="Expense Name"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          {expenseNameError && (
            <div className="text-start text-danger">{expenseNameError}</div>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="fs-6 text-start d-block">Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              className="form-control"
              placeholder="Enter amount"
              onChange={(e) => handleChange(e)}
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
              min="2018-01-01"
              max="2099-1-31"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          {dateError && <div className="text-start text-danger">{dateError}</div>}

          <Form.Group className="mb-3">
            <Form.Label className="fs-6 text-start d-block">
              Description
            </Form.Label>
            <textarea
              id="w3review"
              name="description"
              rows="4"
              cols="30"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </Form.Group>
          {descriptionError && (
            <div className="text-start text-danger">{descriptionError}</div>
          )}
          <div className="text-center mt-4">
            <div className="d-flex justify-content-center gap-3">
              <Button className="fs-6" variant="success" onClick={handleSubmit}>
                Submit
              </Button>
              <Button
                className="fs-6"
                variant="danger"
                type="reset"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddExpense;
