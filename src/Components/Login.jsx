import React from "react";
import { useState } from "react";
import loginUser from "../Services/LoginService";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import bg from "../assets/bg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const notifyLogin = (message) => {
    toast.success(message, {
      autoClose: 2000,
      onClose: () => setTimeout(() => navigate("/addExpense"), 100), // Small delay
    });
  };

  const notifyLoginError = (message) => {
    toast.error(message, {
      autoClose: 1000
    });
  };

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    handleReset();
    const value = e.target.value;

    setLoginDetails((loginDetails) => ({
      ...loginDetails,
      [e.target.name]: value,
    }));
  };

  const handleReset = () => {
    setEmailError("");
    setPasswordError("");
    setSuccessMsg("");
    setFailureMsg("");
  };

  const handleSubmit = (event) => {

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    try {

      const response = loginUser(loginDetails);

      response
        .then((response) => {
    
          if (response.status === 200 || response.status === 202) {
           
            let successMsg = "Login Success 😁";
           
            notifyLogin(successMsg);
            localStorage.setItem('isAuthenticated','true')
           
            const isAuthenticated = localStorage.getItem("isAuthenticated");
            console.log("isAuthenticated inside login : " +isAuthenticated);
  
          } else {
            console.log("FAILURE");
          }
        })
        .catch((error) => {
         
          if (error.status === 400 || error.status === 500) {
          
            let errMsg = "Login failed ☹️ ";
            console.error(errMsg+response);
            notifyLoginError(errMsg);

            if (error.response.data ==="User Already exists with this email ,pls try different email") {
              console.log(error.response.data.email);
              setEmailError(error.response.data.email);
            }
            console.log("ERROR");
            console.log(error);

            setEmailError(error.response.data.email);
            setPasswordError(error.response.data.password);
          }
        });
    } catch (error) {
      console.error("Registration failed:", error);
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
            
            <Container
        className="p-4 rounded"
        style={{
          maxWidth: "400px",
          width: "90%",
        }}
        
      >
            <ToastContainer />
       
        <Form className="p-4 rounded">
          <h2 className="text-center fs-2  "><strong>Login</strong></h2>

          {successMsg && (
            <div className="text-center text-success">{successMsg}</div>
          )}
          {failureMsg && (
            <div className="text-center text-danger">{failureMsg}</div>
          )}

          <Form.Group className="mb-3 mt-4" controlId="email_login">
            <Form.Label className="fs-6 text-start d-block mb-2">
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              className="fs-6"
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          {emailError && (
            <div className="text-start text-danger">{emailError}</div>
          )}

          <Form.Group className="mb-3" controlId="password_login">
            <Form.Label className="fs-6 text-start d-block">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              className="fs-6"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          {passwordError && (
            <div className="text-start text-danger">{passwordError}</div>
          )}
    
    <div className="text-center mt-5">
  <div className="d-flex justify-content-center gap-4">
    <Button className=" w-40" variant="success" onClick={handleSubmit}>
       Login
    </Button>

    <Button className="w-40" variant="danger" type="reset">
      Reset
    </Button>
  </div><br></br>

  {/* Register Link */}
  <div className="mt-4">
    <span className="text-dark fw-semibold fs-6">Don't have an account ?</span><br></br>
    <Nav.Link href="/register" className="fw-bold text-primary d-inline ms-2">
      Sign Up
    </Nav.Link>
  </div>
</div>

        </Form>
      </Container>
    </div>
  );
};

export default Login;
