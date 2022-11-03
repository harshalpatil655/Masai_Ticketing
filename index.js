const express = require("express");
const { connection } = require("./src/Config/db");
const { authetication } = require("./src/Middlewares/authetication");
const { SignupRouter } = require("./src/Routes/Signup.Route");
const { TicketingRouter } = require("./src/Routes/Ticketing.Route");
let cors = require("cors");
require("dotenv").config();

let PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to Ticketing App");
});

app.use("/user", SignupRouter);

app.use(authetication);

app.use("/ticketing", TicketingRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to Database");
  } catch (err) {
    console.log("Not Connected to DB");
  }
  console.log("Listening on port 8080");
});
