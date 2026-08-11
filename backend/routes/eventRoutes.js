const express = require("express");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

const {
    getAllEvents,
    addEvent,
    getEventById,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");


// Get all events
router.get("/", getAllEvents);


// Get event by ID
router.get("/:id", getEventById);


// Admin only - create event
router.post(
    "/",
    protect,
    adminOnly,
    addEvent
);


// Admin only - update event
router.put(
    "/:id",
    protect,
    adminOnly,
    updateEvent
);


// Admin only - delete event
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteEvent
);


module.exports = router;