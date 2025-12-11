import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API = "http://localhost:8081/api/books";

  // fetchBooks is memoized so other handlers can call it
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API);
      setBooks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch books", err);
      setError("Failed to load books. Check server.");
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this book?");
    if (!ok) return;

    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Book deleted");
      // refresh list
      fetchBooks();
    } catch (err) {
      console.error("Delete failed", err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to delete book";
      toast.error(msg);
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2>Library Books</h2>
        <div>
          <button
            onClick={() => navigate("/books/add")}
            style={{ marginRight: 8 }}
          >
            Add Book
          </button>
          <button onClick={() => fetchBooks()}>Refresh</button>
        </div>
      </div>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead style={{ background: "#f2f2f2" }}>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Total</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td style={{ textAlign: "center" }}>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.isbn}</td>
                <td style={{ textAlign: "center" }}>{book.totalCopies}</td>
                <td style={{ textAlign: "center" }}>{book.availableCopies}</td>
                <td style={{ textAlign: "center" }}>
                  <button onClick={() => navigate(`/books/edit/${book.id}`)}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
