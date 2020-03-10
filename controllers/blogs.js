const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
    const blog = new Blog(request.body);

    if (blog.title === undefined) {
        return response.status(400).json({
            error: "title missing : title and url are mandatory fields"
        });
    }
    if (blog.url === undefined) {
        return response.status(400).json({
            error: "url missing : title and url are mandatory fields"
        });
    }

    if (blog.likes === undefined) {
        blog.likes = 0;
    }
    try {
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

module.exports = blogsRouter;
