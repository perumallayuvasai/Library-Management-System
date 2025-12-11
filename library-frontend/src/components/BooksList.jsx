import React, { useEffect, useState } from "react";
import axios from "axios";

function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load books");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Library Books</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Total Copies</th>
              <th>Available Copies</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.isbn}</td>
                <td>{book.total_copies}</td>
                <td>{book.available_copies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => window.location.href = '/books/add'} style={{ marginTop: '20px' }}>Add New Book</button>
    </div>
  );
}

export default BooksList;
