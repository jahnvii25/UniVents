const Event = require("../models/event");

// GET /events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        res.json(events);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// POST /events
const addEvent = async (req, res) => {
    try {
        const event = new Event(req.body);

        await event.save();

        res.status(201).json({
            message: "Event Created Successfully",
            event
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// GET /events/:id
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.json(event);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// PUT /events/:id
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.json({
            message: "Event Updated Successfully",
            event
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
// DELETE /events/:id
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.json({
            message: "Event Deleted Successfully",
            event
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Export functions
module.exports = {
    getAllEvents,
    addEvent,
    getEventById,
    updateEvent,
    deleteEvent
};