const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const adminOnly =
    require("../middleware/roleMiddleware");


const {
    markAttendance,
    getEventAttendance,
    getMyAttendance
} = require("../controllers/attendanceController");

router.post(
    "/",
    protect,
    adminOnly,
    markAttendance
);


router.get(
    "/event/:eventId",
    protect,
    adminOnly,
    getEventAttendance
);


router.get(
    "/my",
    protect,
    getMyAttendance
);


module.exports = router;