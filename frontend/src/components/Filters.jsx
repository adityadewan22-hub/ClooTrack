import React, { useState } from "react";

export default function Filters({ setFilters }) {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const applyFilters = () => {
    const newFilters = {};

    if (category) newFilters.category = category;
    if (priority) newFilters.priority = priority;
    if (status) newFilters.status = status;
    if (search) newFilters.search = search;

    setFilters(newFilters);
  };

  const clearFilters = () => {
    setCategory("");
    setPriority("");
    setStatus("");
    setSearch("");
    setFilters({});
  };

  return (
    <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ddd" }}>
      <h3>Filters</h3>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="billing">Billing</option>
        <option value="technical">Technical</option>
        <option value="account">Account</option>
        <option value="general">General</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      <input
        type="text"
        placeholder="Search title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginLeft: "8px" }}
      />

      <button onClick={applyFilters} style={{ marginLeft: "8px" }}>
        Apply
      </button>

      <button onClick={clearFilters} style={{ marginLeft: "8px" }}>
        Clear
      </button>
    </div>
  );
}
