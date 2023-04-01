import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import CharacterRoute from "./routes/character";

mongoose.connect("mongodb://127.0.0.1:27017", {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});

app.use("/api/character", CharacterRoute);