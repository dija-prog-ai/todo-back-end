const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const router = require("./routes/tasks")
const app = express();
const { logger, isAuthenticated } = require("./middleware/middlewares");


require('dotenv').config();
app.use(express.json());




app.use(logger);
app.get("/", (_req, res) => {
  res.send("Hello World!");
});
app.use("/users", userRouter);
app.use("/tasks", isAuthenticated, router);
mongoose
  .connect(
    `mongodb+srv://${process.env.username}:${process.env.password}@back-end.oqh6v4n.mongodb.net/?retryWrites=true&w=majority&appName=back-end`
  )
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
