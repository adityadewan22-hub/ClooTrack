import React from "react";
import TicketCard from "./TicketCard";

export default function TicketList({ tickets, onTicketUpdated }) {
  if (!tickets.length) {
    return <p>No tickets found.</p>;
  }

  return (
    <div>
      <h2>All Tickets</h2>

      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onTicketUpdated={onTicketUpdated}
        />
      ))}
    </div>
  );
}
