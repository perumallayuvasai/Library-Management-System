import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = "http://localhost:8081/api/members";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [serverErrors, setServerErrors] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((res) => {
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
        });
      })
      .catch(() => toast.error("Failed to load member"))
      .finally(() => setLoading(false));
  }, [API, id]);

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
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    try {
      await axios.put(`${API}/${id}`, form);
      toast.success("Member updated");
      navigate("/members");
    } catch (error) {
      if (error.response?.data) setServerErrors(error.response.data);
      toast.error("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 12 }}>
      <h2>Edit Member</h2>

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

        <button type="submit">Update</button>
        <button
          type="button"
          onClick={() => navigate("/members")}
          style={{ marginLeft: 8 }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
