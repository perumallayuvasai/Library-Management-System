import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LoansList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/loans")
      .then((res) => setLoans(res.data));
  }, []);

  return (
    <div style={{ padding: 12 }}>
      <h2>Issued Books</h2>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Member</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.book.title}</td>
              <td>{l.member.name}</td>
              <td>{l.issueDate}</td>
              <td>{l.dueDate}</td>
              <td>{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
