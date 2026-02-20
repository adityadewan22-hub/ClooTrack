import React, { useEffect, useState } from "react";
import { getTickets, getStats } from "../api/ticketApi";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import StatsDashboard from "../components/StatsDashboard";
import Filters from "../components/Filters";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({});

  const fetchTickets = async () => {
    const response = await getTickets(filters);
    setTickets(response.data.results);
  };

  const fetchStats = async () => {
    const response = await getStats();
    setStats(response.data);
  };

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex justify-center">
      <div className="w-full max-w-5xl px-6 py-10 space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-800">
            Support Ticket System
          </h1>
          <p className="text-slate-600">
            Submit, track, and manage support tickets efficiently
          </p>
        </div>

        {/* Ticket Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <TicketForm
            onTicketCreated={() => {
              fetchTickets();
              fetchStats();
            }}
          />
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <StatsDashboard stats={stats} />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <Filters setFilters={setFilters} />
        </div>

        {/* Ticket List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <TicketList
            tickets={tickets}
            onTicketUpdated={() => {
              fetchTickets();
              fetchStats();
            }}
          />
        </div>

      </div>
    </div>
  );
}
