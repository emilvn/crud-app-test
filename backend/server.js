const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const CharacterRoute = require("./routes/character");

/* ========== Establish connection to DB URL ========== */
mongoose.connect("mongodb://127.0.0.1:27017", {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

/* ========== DB error/success messages ========== */
db.on("error", (err) => {
    console.log(err)
});
db.once("open", () => {
    console.log("Database Connection Established.")
})

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* ========== Set root for frontend ========== */
app.use(express.static("../frontend"));

/* ========== PORT is specified port if set or 3000 by default ========== */
const PORT = process.env.PORT || 3000;

/* ========== Listening on the port ========== */
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});

/* ========== handle requests to /api/character ========== */
app.use("/api/character", CharacterRoute);