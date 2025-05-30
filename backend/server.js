const express = require("express");
require('dotenv').config();
const db = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;
const errorHandler = require("./middlewares/errorHandler")
const authRouter = require("./routes/auth.route")
const userRouter = require("./routes/task.route")
const cors = require("cors");
const boardRouter = require("./routes/board.route")

app.use(express.json());

app.use(cors());


// Public Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🎉");
});
app.use("/auth",authRouter)

// Private Route
app.use("/auth/user",userRouter)

// Board Route
app.use("/auth/board",boardRouter)







app.use(errorHandler)
app.listen(PORT,()=>console.log(`server is running at http://localhost:${PORT}`))
