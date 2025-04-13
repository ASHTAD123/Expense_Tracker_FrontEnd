import React from "react";
import bg from "../assets/bg.jpg";
import Navigationbar from "../Components/Navbar";
import { Container, Row, Col, Card,Button } from "react-bootstrap";

const Home = () => {
  
  console.log("HOME");
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("isAuthenticated at HOME : " +isAuthenticated);
  
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
          <Navigationbar/>

          <Container className="mt-5">

      <Button> Get Started</Button>
    </Container>

    </div>
  );
};

export default Home;
