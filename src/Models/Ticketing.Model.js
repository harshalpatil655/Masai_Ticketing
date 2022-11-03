const mongoose = require("mongoose");

const TicketingSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TicketingModel = mongoose.model("ticket", TicketingSchema);

module.exports = { TicketingModel };
