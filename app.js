const express = require("express");
const middleware = require("./utils/middleware");
const bodyParser = require("body-parser");
const notesRouter = require("./controllers/blogs");
const morgan = require("morgan");
const app = express();

app.use(bodyParser.json());
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
