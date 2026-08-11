const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        venue: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        registerLink: {
            type: String,
            default: ""
        },

        // Event registration/payment fee
        eventFee: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Event", eventSchema);