const express = require("express");
const router = express.Router();

const {
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
} = require("../queries/tickets");

const {
  checkDate,
  checkTitle,
  checkDescription,
  checkPriority,
  checkUsername,
} = require("../validations/checkTickets");

router.get("/", async (req, res) => {
  const allTickets = await getAllTickets();
  if (allTickets[0]) {
    res.status(200).json(allTickets);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

router.get("/order-by-asc", async (req, res) => {
  const ascending = await orderByASC();
});
router.get("/order-by-desc", async (req, res) => {
  const descending = await orderByDESC();
});
/*
This is a way to query a set amount of data and not to call all of the data

in order for this query to work and pass on we need the page number
1,2,3,4,.....
we then take that number and times it by 10
So on page 0 we do 0 * 10 = 0 or page 1 which is 1 * 10 (ignore)

we then address a limit which is 

we can simply just pass down a starting index from the 
localhost:3003/get-collection?page=2&plimit=10

*/

//gets a portion of ticket entrys in the ticket collection
router.get("/get-collection", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = page;
  const endIndex = page + limit;
  try {
    const collection = await getPage(startIndex, endIndex);
    res.status(200).json(collection);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

//gets the logs length
router.get("/get-log-length", async (req, res) => {
  try {
    const logLength = await getLogsLength();
    res.status(200).send(logLength[0].count);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

//get by id
router.get("/:id", async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket || ticket.length === 0) {
      res.status(404).json({ error: "not found" });
    } else {
      res.status(200).json(ticket[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//create new ticket entry
router.post(
  "/",
  checkDate,
  checkTitle,
  checkDescription,
  checkPriority,
  checkUsername,
  async (req, res) => {
    console.log(req.body);
    try {
      const createdTicket = await createTicket(req.body);
      res.status(200).json(createdTicket[0]);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);

//delete ticket entry
router.delete("/:id", async (req, res) => {
  try {
    const deletedTicket = await deleteTicket(req.params.id);
    if (deletedTicket.length === 0) {
      res.status(404).json("Ticket not found");
    } else {
      res.status(200).json(deletedTicket[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Edit ticket entry
router.put(
  "/:id",
  checkDate,
  checkTitle,
  checkDescription,
  checkPriority,
  checkUsername,
  async (req, res) => {
    try {
      const updatedTicket = await updateTicket(req.params.id, req.body);
      if (updatedTicket.length === 0) {
        res.status(404).json("Ticket not found");
      } else {
        res.status(200).json(updatedTicket[0]);
      }
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);
router.get("/get-by-search/:search", async (req, res) => {
  try {
    const searchResults = await searchForTicket(req.params.search);
    if (!searchResults[0]) {
      res.status(404).json({ error: "Results not found" });
    } else {
      res.status(200).json(searchResults);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
