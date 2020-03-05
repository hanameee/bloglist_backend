const notesRouter = require("express").Router();

let blogs = [{ writer: "hannah", content: "very first blog" }];

notesRouter.get("/", (request, response) => {
    response.json(blogs);
});

module.exports = notesRouter;
