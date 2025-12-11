import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = "http://localhost:8081/api/books";

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    totalCopies: "",
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/${id}`);
        const b = res.data;
        setForm({
          title: b.title || "",
          author: b.author || "",
          category: b.category || "",
          isbn: b.isbn || "",
          totalCopies: b.totalCopies !== undefined ? String(b.totalCopies) : "",
        });
      } catch (err) {
        console.error("Failed to load book", err);
        toast.error("Failed to load book");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [API, id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    try {
      const payload = {
        title: form.title,
        author: form.author,
        category: form.category,
        isbn: form.isbn || null,
        totalCopies: Number(form.totalCopies),
      };
      await axios.put(`${API}/${id}`, payload);
      toast.success("Book updated");
      navigate("/books");
    } catch (error) {
      console.error("Update failed", error);
      if (error.response && error.response.data) {
        setServerErrors(error.response.data);
        const msg = error.response.data.error || "Update failed";
        toast.error(msg);
      } else {
        toast.error("Network error");
      }
    }
  };

  if (loading) return <p>Loading book...</p>;

  return (
    <div style={{ maxWidth: 700, padding: 12 }}>
      <h2>Edit Book</h2>

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

        <div>
          <button type="submit">Update</button>
          <button
            type="button"
            style={{ marginLeft: 8 }}
            onClick={() => navigate("/books")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
