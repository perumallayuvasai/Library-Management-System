import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    totalCopies: "",
  });
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();
  const API = "http://localhost:8081/api/books";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // clear field-level client validation on change
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setServerErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required";
    if (!form.author.trim()) err.author = "Author is required";
    if (!form.totalCopies || Number(form.totalCopies) < 1)
      err.totalCopies = "Must be at least 1";
    return err;
  };

  const resetForm = () => {
    setForm({ title: "", author: "", category: "", isbn: "", totalCopies: "" });
    setErrors({});
    setServerErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrors({});
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setErrors({});
    try {
      const payload = {
        title: form.title,
        author: form.author,
        category: form.category,
        isbn: form.isbn || null,
        totalCopies: Number(form.totalCopies),
      };
      const response = await axios.post(API, payload);
      // Success
      toast.success("Book added successfully");
      // Option 1: reset form and stay on page
      resetForm();
      // Option 2: navigate to books list
      // navigate("/books");
    } catch (error) {
      // If backend returned validation or conflict errors, map them
      if (error.response && error.response.data) {
        const data = error.response.data;
        // If server returns a map of field->message (validation or duplicate)
        if (typeof data === "object") {
          setServerErrors(data);
          // show a toast for conflict or general error
          if (error.response.status === 409) {
            // duplicate isbn specifically
            const isbnMsg = data.isbn || data.error || "Conflict";
            toast.error(isbnMsg);
          } else if (error.response.status === 400) {
            toast.error("Validation failed. Check fields.");
          } else {
            toast.error("Action failed. See errors.");
          }
        } else {
          toast.error("Action failed. Try again.");
        }
      } else {
        toast.error("Network error. Check server.");
      }
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Add Book</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Title</label>
          <br />
          <input name="title" value={form.title} onChange={handleChange} />
          <div style={{ color: "red" }}>
            {errors.title || serverErrors.title}
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Author</label>
          <br />
          <input name="author" value={form.author} onChange={handleChange} />
          <div style={{ color: "red" }}>
            {errors.author || serverErrors.author}
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Category</label>
          <br />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{serverErrors.category}</div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>ISBN</label>
          <br />
          <input name="isbn" value={form.isbn} onChange={handleChange} />
          <div style={{ color: "red" }}>{serverErrors.isbn}</div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Total Copies</label>
          <br />
          <input
            type="number"
            name="totalCopies"
            value={form.totalCopies}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>
            {errors.totalCopies || serverErrors.totalCopies}
          </div>
        </div>

        <button type="submit">Save</button>
        <button type="button" style={{ marginLeft: 8 }} onClick={resetForm}>
          Reset
        </button>
        <button
          type="button"
          style={{ marginLeft: 8 }}
          onClick={() => navigate("/books")}
        >
          Back to List
        </button>
      </form>
    </div>
  );
}
