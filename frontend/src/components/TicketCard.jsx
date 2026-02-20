import React, { useState } from "react";
import { updateTicket } from "../api/ticketApi";

export default function TicketCard({ ticket, onTicketUpdated }) {
  const [updating, setUpdating] = useState(false);

  const truncate = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    setUpdating(true);

    try {
      await updateTicket(ticket.id, { status: newStatus });
      onTicketUpdated();
    } catch (err) {
      console.error("Failed to update ticket");
    }

    setUpdating(false);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "10px" }}>
      <h3>{ticket.title}</h3>

      <p>{truncate(ticket.description)}</p>

      <p>
        <strong>Category:</strong> {ticket.category}
      </p>

      <p>
        <strong>Priority:</strong> {ticket.priority}
      </p>

      <p>
        <strong>Status:</strong>
        <select
          value={ticket.status}
          onChange={handleStatusChange}
          disabled={updating}
          style={{ marginLeft: "8px" }}
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </p>

      <p>
        <small>
          Created: {new Date(ticket.created_at).toLocaleString()}
        </small>
      </p>
    </div>
  );
}
