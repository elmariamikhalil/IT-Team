import React, { useEffect, useState } from "react";
import { fetchTickets, deleteTicket } from "../services/ticketService";

const TicketList = ({ token }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const response = await fetchTickets(token);
        setTickets(response.data);
      } catch (error) {
        console.error("Failed to fetch tickets", error);
      }
    };
    loadTickets();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      await deleteTicket(id, token);
      setTickets(tickets.filter((ticket) => ticket._id !== id));
    }
  };

  return (
    <div>
      <h2>Ticket List</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> - {ticket.description}
            <p>
              Priority: {ticket.priority} | Status: {ticket.status}
            </p>
            <p>Assigned to: {ticket.assignedTo?.name || "Unassigned"}</p>
            <button onClick={() => handleDelete(ticket._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
