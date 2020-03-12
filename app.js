const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const notesRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

mongoose.set("useUnifiedTopology", true);
logger.info("connecting to", config.MONGODB_URI);
mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch(error => {
        logger.error("error connection to MongoDB:", error.message);
    });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));
morgan.token("data", function(req, res) {
    return JSON.stringify(req.body);
});

if (process.env.NODE_ENV !== "test") {
    app.use(
        morgan(
            ":method :url :status :res[content-length] - :response-time ms :data"
        )
    );
}

app.use("/api/blogs", notesRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
