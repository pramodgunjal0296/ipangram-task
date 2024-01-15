const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://pramodgunjal1996:Pramod9762@cluster0.cjvg5x1.mongodb.net/mern",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userRoutes = require("./src/routes/userRoutes");
const departmentRoutes = require("./src/routes/departmentRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");

app.use("/users", userRoutes);
app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);

console.log("userroutes", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
