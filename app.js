const express = require("express");
const middleware = require("./utils/middleware");
const bodyParser = require("body-parser");
const notesRouter = require("./controllers/notes");

const app = express();

app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});
app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
