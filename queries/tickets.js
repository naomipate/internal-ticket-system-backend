const db = require("../db/dbConfig");

const getAllTickets = async () => {
  try {
    const allTickets = await db.any("SELECT * FROM tickets");
    return allTickets;
  } catch (error) {
    return error;
  }
};

const getTicketById = async (id) => {
  try {
    const ticket = await db.any("SELECT * FROM tickets WHERE id=$1", [id]);
    return ticket;
  } catch (error) {
    return error;
  }
};

const getPage = async (startInd, endInd) => {
  try {
    const ticketCollection = await db.any(
      "SELECT * FROM tickets WHERE id BETWEEN $1 AND $2",
      [startInd, endInd]
    );
    return ticketCollection;
  } catch (error) {
    return error;
  }
};

const searchForTicket = async (term) => {
  const formTerm = `%${term}%`;

  try {
    const searchResults = await db.any(
      "SELECT * FROM tickets WHERE title ILIKE $1",
      [formTerm]
    );

    return searchResults;
  } catch (error) {
    return error;
  }
};

const createTicket = async ({
  date,
  title,
  description,
  priority,
  assigned,
  resolution,
  username,
}) => {
  try {
    const newTicket = await db.any(
      "INSERT INTO tickets (date, title, description, priority, assigned, resolution, username) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        date, // 1
        title, // 2
        description, // 3
        priority, // 4
        assigned, // 5
        resolution, // 6
        username, // 7
      ]
    );
    return newTicket;
  } catch (error) {
    return error;
  }
};

const deleteTicket = async (id) => {
  try {
    const deletedTicket = await db.any(
      "DELETE FROM tickets WHERE id=$1 RETURNING *",
      [id]
    );
    return deletedTicket;
  } catch (error) {
    return error;
  }
};

const getLogsLength = async () => {
  try {
    const logsLength = await db.any("SELECT COUNT(id) from tickets");
    console.log(logsLength);
    return logsLength;
  } catch (error) {
    return error;
  }
};

const updateTicket = async (id, ticket) => {
  try {
    const updatedTicket = await db.any(
      "UPDATE tickets SET date=$1, title=$2, description=$3, priority=$4, assigned=$5, resolution=$6, username=$7 WHERE id=$8 RETURNING *",
      [
        ticket.date,
        ticket.title,
        ticket.description,
        ticket.priority,
        ticket.assigned,
        ticket.resolution,
        ticket.username,
        id,
      ]
    );
    return updatedTicket;
  } catch (error) {
    return error;
  }
};
const orderByASC = async () => {
  try {
    const ascTickets = await db.any("SELECT * FROM tickets ORDER BY id ASC");
    return ascTickets;
  } catch (error) {
    return error;
  }
};
const orderByDESC = async () => {
  try {
    const descTickets = await db.any("SELECT * FROM tickets ORDER BY id DESC");
    return descTickets;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  deleteTicket,
  getPage,
  getLogsLength,
  updateTicket,
  orderByASC,
  orderByDESC,
  searchForTicket,
};
