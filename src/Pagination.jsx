import React, { useState, useEffect } from "react";

export default function Pagination() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        alert("Failed to fetch data");
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(employees.length / 10);
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const startIndex = (page - 1) * 10;
  const endIndex = page * 10;

  const visibleEmployees = employees.slice(startIndex, endIndex);

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
          {visibleEmployees.map((employee, index) => (
            <tr key={index}>
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
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <button style={{ height: "30px" }}>{page}</button>
        <button
          onClick={handleNext}
          disabled={page === Math.ceil(employees.length / 10)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
