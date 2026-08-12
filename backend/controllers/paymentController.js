const Payment = require("../models/payment");
const Event = require("../models/Event");

// POST /payments/create
const createPayment = async (req, res) => {
    try {

        const { eventId, amount, paymentMethod } = req.body;

        const userId = req.user.id;

        // Check required fields
        if (!eventId || amount === undefined) {
            return res.status(400).json({
                message: "Event ID and amount are required"
            });
        }

        // Check event exists
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Create payment
        const payment = await Payment.create({
            user: userId,
            event: eventId,
            amount: amount,
            paymentMethod: paymentMethod || "Not Selected",
            status: "Paid"
        });

        res.status(201).json({
            message: "Payment created successfully",
            payment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// GET /payments/my
const getMyPayments = async (req, res) => {
    try {

        const payments = await Payment.find({
            user: req.user.id
        })
        .populate("event")
        .sort({ createdAt: -1 });

        res.json(payments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
    // GET /payments/all

};
// GET /payments/all
const getAllPayments = async (req, res) => {

    try {

        const payments = await Payment.find()
            .populate("user", "name email")
            .populate("event", "title")
            .sort({ createdAt: -1 });

        res.json(payments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    createPayment,
    getMyPayments,
    getAllPayments
};