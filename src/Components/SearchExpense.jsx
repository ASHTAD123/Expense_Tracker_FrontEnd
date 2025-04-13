import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import getExpenses from "../Services/GetExpensesService";
import { Link } from "react-router-dom";
import deleteUserExpense from "../Services/DeleteService";
import Form from "react-bootstrap/Form";
import fetchResults from "../Services/SearchExpenseService";
import Navigationbar from "../Components/Navbar";
import bg from "../assets/bg.jpg";
import { debouncedFetchResults } from "../Services/SearchExpenseService";

const SearchExpense = () => {
  const [query, setQueryParam] = useState("");
  const [results, setQueryResults] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const latestSearchRef = useRef(0); // Track the latest search request

  useEffect(() => {
    getExpenses()
      .then((res) => {
        setExpenses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setQueryResults([]); // Clear results if input is empty
      return;
    }

    const searchId = Date.now(); // Unique ID for each search
    latestSearchRef.current = searchId; // Save the latest search ID

    const delayDebounce = setTimeout(async () => {
      try {
        console.log("Searching for:", query);
        const response = await fetchResults(query);
        
        console.log("Full response data:", response.data);
        console.log("Array length:", response.length);
        
        if (response.status === 200) {
          console.log("Search results:", response.data);
          
          if (searchId === latestSearchRef.current) { 
            setQueryResults([...response.data]); // Force re-render
        }
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        setQueryResults([]);
      }
    }, 500); // Delay before search triggers

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // const handleInputChange = (e) => {
  //   setQueryParam(e.target.value);
  // };
  const handleInputChange = (e) => {
    let value = e.target.value;
    setQueryParam(value);
  
    if (value.trim() === "") {
      setQueryResults([]); // Clear results if input is empty
    } else {
      debouncedFetchResults(value).then(setQueryResults);
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
        position: "absolute",
        left: 0,
        top: 0,
      }}
    >
      <Navigationbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="fs-3 text-center">
              <strong>All Expenses</strong>
            </div>
            <br />
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search"
                value={query}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Table key={results.length} responsive="sm">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Date</th>
                  <th>Expense Name</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(query.length > 0 ? results : expenses).map(
                  (expense, index) => (
                    <tr key={expense.expenseId}>
                      <td>{index + 1}</td>
                      <td>{expense.date}</td>
                      <td>{expense.expenseName}</td>
                      <td>{expense.description}</td>
                      <td>{expense.amount}</td>
                      <td>
                        <Link
                          to={`/updateExpense/${expense.expenseId}`}
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={async () => {
                            try {
                              await deleteUserExpense(expense.expenseId);
                              setExpenses((prevExpenses) =>
                                prevExpenses.filter(
                                  (item) => item.expenseId !== expense.expenseId
                                )
                              );
                              setQueryResults((prevResults) =>
                                prevResults.filter(
                                  (item) => item.expenseId !== expense.expenseId
                                )
                              );
                            } catch (error) {
                              console.error("Error deleting expense:", error);
                            }
                          }}
                          className="btn btn-sm btn-danger ms-3"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchExpense;
