const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./config/keys").mongoURI;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// passport middleware
app.use(passport.initialize());
// passport config
require("./config/passport")(passport);

// routes
// app.use(routes);
app.use("/api/users", users);
// Mongoose connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

//this takes care of the same port error
// process.on("uncaughtException", function (err) {
//   console.error(new Date().toUTCString() + " uncaughtException:", err.message);
//   console.error(err.stack);
//   process.exit(1);
// });
