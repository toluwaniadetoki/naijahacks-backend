// Importing Dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Importing Routes
const indexRouter = require("./routes/api/index");
const farmerRouter = require("./routes/api/farmers");
const toolRouter = require("./routes/api/tools");

// Import mongoose Key
const mongoUri = require("./config/keys").mongoURI;

// Connect to mongoDB
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// Use routes
app.use("/api", indexRouter);
app.use("/api/farmer", farmerRouter);
app.use("/api/tool", toolRouter);

const PORT = process.env.PORT || 3000;
app.listen((PORT, '0.0.0.0'), () => {
    console.log(`Our app is running on port ${ PORT }`);
});
