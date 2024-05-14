import React, { useState, useEffect } from "react";

export default function Pagination() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployees(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        alert("Failed to fetch data");
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return employees.slice(startIndex, endIndex);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Data Table</h1>
      <table
        style={{
          borderSpacing: 0,
          width: "100%",
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.4)",
          marginBottom: "16px",
          borderBottom: "2px solid #009879",
        }}
      >
        <thead
          style={{ backgroundColor: "#009879", color: "white", height: "40px" }}
        >
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((employee) => (
            <tr key={employee.id}>
              <td
                style={{
                  borderBottom: "2px solid #f4f4f4",
                  padding: "12px 0px",
                }}
              >
                {employee.id}
              </td>
              <td
                style={{
                  borderBottom: "2px solid #f4f4f4",
                  padding: "12px 0px",
                }}
              >
                {employee.name}
              </td>
              <td
                style={{
                  borderBottom: "2px solid #f4f4f4",
                  padding: "12px 0px",
                }}
              >
                {employee.email}
              </td>
              <td
                style={{
                  borderBottom: "2px solid #f4f4f4",
                  padding: "12px 0px",
                }}
              >
                {employee.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button style={{ height: "30px" }}>{currentPage}</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
