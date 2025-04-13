import "./App.css";
import { BrowserRouter, Route, Routes, Navigate, replace } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddExpense from "./Components/AddExpense";
import UpdateExpense from "./Components/UpdateExpense";
import DeleteExpense from "./Components/DeleteExpense";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import About from "./Components/About";
import Home from "./Components/Home";
import SearchExpense from "./Components/SearchExpense"
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

         {/* Protected Routes */}
         <Route element={<ProtectedRoute />}>
      
          <Route path="/addExpense" element={<AddExpense />} />
          <Route path="/search" element={<SearchExpense />} />
          <Route path="/updateExpense/:expenseId" element={ <UpdateExpense />}/>
          <Route path="/deleteExpense" element={<DeleteExpense/>}
        />
        </Route>

        <Route path="/about" element={<About />} />
    
      </Routes>
    </BrowserRouter>
  );

}

export default App;

