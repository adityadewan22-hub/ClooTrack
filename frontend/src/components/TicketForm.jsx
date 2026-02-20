import React, { useState } from "react";
import { createTicket, classifyTicket } from "../api/ticketApi";

export default function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  const handleClassify = async () => {
    if (!description) return;

    setLoading(true);
    try {
      const response = await classifyTicket(description);
      setCategory(response.data.suggested_category);
      setPriority(response.data.suggested_priority);
    } catch (err) {
      console.error("LLM failed");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTicket({
      title,
      description,
      category,
      priority,
      status: "open"
    });

    setTitle("");
    setDescription("");
    setCategory("general");
    setPriority("medium");

    onTicketCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        maxLength={200}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={handleClassify}
        placeholder="Description"
        required
      />

      {loading && <p>Classifying...</p>}

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="billing">Billing</option>
        <option value="technical">Technical</option>
        <option value="account">Account</option>
        <option value="general">General</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <button type="submit">Submit Ticket</button>
    </form>
  );
}
