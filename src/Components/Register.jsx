import React from "react";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import registerUser from "../Services/RegistrationService";
import "react-toastify/dist/ReactToastify.css";
import bg from "../assets/bg.jpg";

const Register = () => {

  const [errorUsername, setUsernameError] = useState("");
  const [errorPassword, setPasswordError] = useState("");
  const [errorEmail, setEmailError] = useState("");
  const [errorFullName, setFullNameError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setfailureMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const notifyRegister = (message) => {
      toast.success(message, {
        autoClose: 2000,
        onClose: () => setTimeout(() => navigate("/login"))
      });
    };
  const notifyLoginError = (message) => {
    toast.error(message, {
      autoClose: 1000
    });
  };
  const [registrationDetails, setRegistrationDetails] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
  });

  const handleChange = (e) => {
    handleReset();
    const value = e.target.value;
    
    setRegistrationDetails((registrationDetails) => ({
      ...registrationDetails,
      [e.target.name]: value,
    }));
  };
  const handleReset = () => {
    setEmailError("");
    setPasswordError("");
    setUsernameError("");
    setFullNameError("");
    setSuccessMsg("");
    setfailureMsg("");
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    try {
  
      const response = registerUser(registrationDetails);

      response
        .then((response) => {
        
          if (response.status === 200 || response.status === 202) {

            let successMsg = "Registration Success 😁";

            notifyRegister(successMsg)
            console.log(successMsg +response);
          } 
          else {
            console.log("FAILURE");
          }
        })
        .catch((error) => {
         
          if (error.status === 400 || error.status === 500) {
            
            let errMsg = "Registration failed ☹️ ";
            console.error("Registration failed");
            notifyLoginError(errMsg);
            console.error("Registration failed :( " +response);

            if (error.response.data ==="User Already exists with this email ,pls try different email") {
              console.log(error.response.data.email);
              setEmailError(error.response.data.email);
            }
            console.log(" ERROR");
            console.log(error);

            setUsernameError(error.response.data.username);
            setPasswordError(error.response.data.password);
            setEmailError(error.response.data.email);
            setFullNameError(error.response.data.fullName);
          }
        });
    } catch (error) {
      console.error("Registration failed :( , Something went wrong", error);
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
        className="d-flex justify-content-center align-items-center container vh-100"
        style={{ backgroundColor: "" }}
      >
        <ToastContainer />
        <Form
          className="rounded justify-content-center p-4"
          style={{
            maxWidth: "600px"
          }}
        >
          <h2 className="justify-content-start text-center fs-1 mb-4 ">
            Register
          </h2>
          <br></br>
          {successMsg && (
            <div className="text-center text-success">{successMsg}</div>
          )}
          {failureMsg && (
            <div className="text-center text-danger">{failureMsg}</div>
          )}

          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="fs-6 text-start d-block">
              Username
            </Form.Label>
            <Form.Control
              type="texte"
              placeholder="Enter username"
              className="fs-6"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
        
          {errorUsername && (
              <div className="text-center text-danger w-100">
                {errorUsername}
              </div>
          )}

          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fs-6 text-start d-block">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              className="fs-6"
              style={{ minWidth: "300px", width: "100%" }}
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
         
          {errorEmail && (
              <div className="text-center text-danger w-100">
                {errorEmail}
              </div>
          )}

          <Form.Group className="mb-3" controlId="password">
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
          
          {
           errorPassword && (
              <div className="text-center text-danger w-100">
                {errorPassword}
              </div>
          )}

          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label className="fs-6 text-start d-block">
              Full Name
            </Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              className="fs-6"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          {errorFullName && (
              <div className="text-center text-danger w-100">
                {errorFullName}
              </div>
          )}

          <div className="text-center mt-5">
            <div className="d-flex justify-content-center gap-4">
              <Button
                className="w-40"
                variant="success"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                className="w-40"
                variant="danger"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>

<br></br>

<div className="mt-3">
  <Nav.Link href="/login" className="text-dark fw-semibold">
    Already registered ? 
  </Nav.Link>
  <Nav.Link href="/login" className="text-primary fw-bold">
 Log in
  </Nav.Link>
</div>

          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
