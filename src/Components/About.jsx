import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navigationbar from "../Components/Navbar";
import bg from "../assets/bg.jpg";
const About = () => {
  
  
//test line

  return (
   <div style={{

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

   }}>

<Navigationbar />
<Container className="mt-5">
      
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body>
              <h2 className="text-center mb-4">About Expense Tracker</h2>
              <p>
                Welcome to our Expense Tracker app! This application helps you manage your finances efficiently by tracking your income and expenses.
              </p>
            
              
              <h4 className="text-center mt-4">Key Features</h4><br></br>
              <div className="text-center">
                <p>✔ Add, edit, and delete expenses easily</p>
                <p>✔ Secure authentication for user accounts</p>
                <p>✔ Simple and user-friendly interface</p>
              </div>

              <hr />

              <h4 className="text-center mt-4">👨‍💻 Developer</h4>
              <p className="text-center">
                <strong>ASHTAD C. IRANI</strong>
              </p>
              <p className="text-center">
                <a
                  href="https://www.linkedin.com/in/ashtadirani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-3"
                >
                  🔗 LinkedIn
                </a>
                <a
                  href="https://github.com/ASHTAD123"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 GitHub
                </a>
              </p>

              <p className="text-muted text-center">
                Built with ❤️ 
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
   </div> 
  );
};

export default About;
