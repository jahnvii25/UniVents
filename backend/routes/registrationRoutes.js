const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const adminOnly =
    require("../middleware/roleMiddleware");

const {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration,
    getAllRegistrations,
     getEventRegistrations
} = require("../controllers/registrationController");


// Student - register for event
router.post(
    "/:eventId",
    protect,
    registerForEvent
);


// Student - view own registrations
router.get(
    "/my",
    protect,
    getMyRegistrations
);


// Admin - view ALL registrations
router.get(
    "/all",
    protect,
    adminOnly,
    getAllRegistrations
);
router.get(
    "/event/:eventId",
    protect,
    adminOnly,
    getEventRegistrations
);

// Student - cancel own registration
router.delete(
    "/:id",
    protect,
    cancelRegistration
);


module.exports = router;