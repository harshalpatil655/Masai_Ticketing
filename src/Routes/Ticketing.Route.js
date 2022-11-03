const { Router } = require("express");
const { TicketingModel } = require("../Models/Ticketing.Model");

const TicketingRouter = Router();

TicketingRouter.get("/", (req, res) => {
  res.send("You are on Ticketing Route");
});

TicketingRouter.post("/create", async (req, res) => {
  const { category, title, message, userId } = req.body;
  console.log(req.body);

  let newticket = new TicketingModel({
    userId,
    category,
    title,
    message,
  });

  await newticket.save();
  res.send({ message: "Successfully Created", data: newticket });
});

module.exports = { TicketingRouter };
