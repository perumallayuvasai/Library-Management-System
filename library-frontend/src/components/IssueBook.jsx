import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function IssueBook() {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    memberId: "",
    bookId: "",
    dueDate: "",
  });

  const navigate = useNavigate();
  const MEMBERS_API = "http://localhost:8081/api/members";
  const BOOKS_API = "http://localhost:8081/api/books";
  const LOAN_API = "http://localhost:8081/api/loans/issue";

  useEffect(() => {
    axios.get(MEMBERS_API).then((res) => setMembers(res.data));
    axios
      .get(BOOKS_API)
      .then((res) => setBooks(res.data.filter((b) => b.availableCopies > 0)));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.memberId || !form.bookId || !form.dueDate) {
      toast.error("All fields required");
      return;
    }

    try {
      await axios.post(LOAN_API, {
        memberId: Number(form.memberId),
        bookId: Number(form.bookId),
        dueDate: form.dueDate,
      });

      toast.success("Book issued successfully");
      navigate("/loans");
    } catch (err) {
      const msg = err.response?.data?.error || "Issue failed";
      toast.error(msg);
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Issue Book</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Member:</label>
          <br />
          <select name="memberId" value={form.memberId} onChange={handleChange}>
            <option value="">Select Member</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Book:</label>
          <br />
          <select name="bookId" value={form.bookId} onChange={handleChange}>
            <option value="">Select Available Book</option>
            {books.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title} (Available: {b.availableCopies})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Due Date:</label>
          <br />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: 12 }}>
          Issue
        </button>
      </form>
    </div>
  );
}
