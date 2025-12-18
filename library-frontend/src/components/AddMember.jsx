import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddMember() {
  const navigate = useNavigate();
  const API = "http://localhost:8081/api/members";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name required";
    if (!form.email.trim()) err.email = "Email required";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrors({});

    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    try {
      await axios.post(API, form);
      toast.success("Member added");
      navigate("/members");
    } catch (error) {
      if (error.response?.data) setServerErrors(error.response.data);
      toast.error("Add failed");
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Add Member</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input name="name" value={form.name} onChange={handleChange} />
          <div style={{ color: "red" }}>{errors.name || serverErrors.name}</div>
        </div>

        <div>
          <label>Email</label>
          <br />
          <input name="email" value={form.email} onChange={handleChange} />
          <div style={{ color: "red" }}>
            {errors.email || serverErrors.email}
          </div>
        </div>

        <div>
          <label>Phone</label>
          <br />
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <button type="submit">Save</button>
        <button
          type="button"
          style={{ marginLeft: 8 }}
          onClick={() => navigate("/members")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
