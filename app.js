const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const middleware = require("./utils/middleware");
const config = require("./utils/config");
const notesRouter = require("./controllers/blogs");

mongoose.set("useUnifiedTopology", true);
console.log("connecting to", config.MONGODB_URI);
mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch(error => {
        console.log("error connection to MongoDB:", error.message);
    });

const app = express();
app.use(bodyParser.json());
app.use(cors());
morgan.token("data", function(req, res) {
    return JSON.stringify(req.body);
});
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :data"
    )
);
app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});
app.use("/api/blogs", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
