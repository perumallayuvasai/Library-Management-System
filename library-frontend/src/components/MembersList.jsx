import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MembersList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = "http://localhost:8081/api/members";

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setMembers(res.data);
    } catch (err) {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Member deleted");
      fetchMembers();
    } catch (err) {
      const msg = err.response?.data?.error || "Delete failed";
      toast.error(msg);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 12 }}>
      <h2>Members</h2>
      <button onClick={() => navigate("/members/add")}>Add Member</button>

      <table
        border="1"
        cellPadding="8"
        style={{ marginTop: 12, width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{m.membershipDate}</td>

              <td>
                <button onClick={() => navigate(`/members/edit/${m.id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
