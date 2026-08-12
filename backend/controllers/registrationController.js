const Registration = require("../models/registration");
const Event = require("../models/Event");

// POST /registrations/:eventId
const registerForEvent = async (req, res) => {
    try {

        const eventId = req.params.eventId;

        const userId = req.user.id;


        // Check if event exists
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }


        // Check if already registered
        const existingRegistration =
            await Registration.findOne({
                user: userId,
                event: eventId
            });

        if (existingRegistration) {
            return res.status(400).json({
                message: "Already registered for this event"
            });
        }


        // Create registration
        const registration =
            await Registration.create({
                user: userId,
                event: eventId
            });


        res.status(201).json({
            message: "Successfully registered for event",
            registration
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// GET /registrations/my
const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration
            .find({ user: req.user.id })
            .populate("event")
            .sort({ createdAt: -1 });

        res.json(registrations);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET /registrations/all
const getAllRegistrations = async (req, res) => {
    try {

        const registrations = await Registration
            .find()
            .populate("user", "name email")
            .populate("event", "title venue date category")
            .sort({ createdAt: -1 });

        res.json(registrations);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



const cancelRegistration = async (req, res) => {
    try {
        const registration =
            await Registration.findOneAndDelete({
                _id: req.params.id,
                user: req.user.id
            });

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.json({
            message: "Registration cancelled successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// GET /registrations/event/:eventId
const getEventRegistrations = async (req, res) => {
    try {

        const registrations = await Registration
            .find({
                event: req.params.eventId
            })
            .populate("user", "name email")
            .populate("event", "title venue date")
            .sort({ createdAt: 1 });

        res.json(registrations);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    registerForEvent,
     getMyRegistrations,
      cancelRegistration,
       getAllRegistrations,
        getEventRegistrations
};