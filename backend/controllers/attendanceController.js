const Attendance = require("../models/attendance");
const Event = require("../models/event");
const Registration = require("../models/registration");


// ==========================================
// MARK ATTENDANCE
// ==========================================

const markAttendance = async (req, res) => {

    try {

        const {
            userId,
            eventId,
            status
        } = req.body;


        // Validate input
        if (!userId || !eventId || !status) {

            return res.status(400).json({
                message:
                    "userId, eventId and status are required"
            });

        }


        // Validate status
        if (
            status !== "Present" &&
            status !== "Absent"
        ) {

            return res.status(400).json({
                message:
                    "Status must be Present or Absent"
            });

        }


        // Check event exists
        const event =
            await Event.findById(eventId);


        if (!event) {

            return res.status(404).json({
                message:
                    "Event not found"
            });

        }


        // Check student is registered
        const registration =
            await Registration.findOne({
                user: userId,
                event: eventId
            });


        if (!registration) {

            return res.status(400).json({
                message:
                    "Student is not registered for this event"
            });

        }


        // Check if attendance already exists
        const existingAttendance =
            await Attendance.findOne({
                user: userId,
                event: eventId
            });


        // If already exists, update it
        if (existingAttendance) {

            existingAttendance.status =
                status;

            await existingAttendance.save();


            return res.json({

                message:
                    "Attendance updated successfully",

                attendance:
                    existingAttendance

            });

        }


        // Create attendance
        const attendance =
            await Attendance.create({

                user: userId,

                event: eventId,

                status: status

            });


        res.status(201).json({

            message:
                "Attendance marked successfully",

            attendance

        });


    } catch (error) {

        console.error(
            "Attendance error:",
            error
        );


        res.status(500).json({

            message:
                error.message

        });

    }

};


// ==========================================
// GET ATTENDANCE FOR AN EVENT
// ==========================================

const getEventAttendance = async (req, res) => {

    try {

        const eventId =
            req.params.eventId;


        const attendance =
            await Attendance
                .find({
                    event: eventId
                })
                .populate(
                    "user",
                    "name email"
                )
                .populate(
                    "event",
                    "title venue date"
                )
                .sort({
                    createdAt: 1
                });


        res.json(attendance);


    } catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

};


// ==========================================
// GET MY ATTENDANCE
// ==========================================

const getMyAttendance = async (req, res) => {

    try {

        const attendance =
            await Attendance
                .find({
                    user: req.user.id
                })
                .populate(
                    "event",
                    "title venue date"
                )
                .sort({
                    createdAt: -1
                });


        res.json(attendance);


    } catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

};



module.exports = {

    markAttendance,

    getEventAttendance,

    getMyAttendance

};