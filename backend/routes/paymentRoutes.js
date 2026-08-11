const express = require("express");

const router = express.Router();

const {
    createPayment,
    getMyPayments,
    getAllPayments
} = require("../controllers/paymentController");

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");


// Create payment
router.post(
    "/create",
    authMiddleware,
    createPayment
);


// Get my payments
router.get(
    "/my",
    authMiddleware,
    getMyPayments
);


// Get all payments - Admin only
router.get(
    "/all",
    authMiddleware,
    adminMiddleware,
    getAllPayments
);


module.exports = router;