const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const {testConnectionAndCreateIndex} = require('./config/KabanaES')

require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: ".env" });
}
  

const app = express();
app.use(cors());

testConnectionAndCreateIndex()

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes
const user = require("./routes/userRoute");
const email = require("./routes/emailRoute");


// Use routes
app.use("/api/v1", user);
app.use("/api/v1", email);

app.use(errorMiddleware);


module.exports = app;