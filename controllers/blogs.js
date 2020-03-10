const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs);
    });
});

blogsRouter.post("/", (request, response, next) => {
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

    blog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog);
        })
        .catch(error => next(error));
});

module.exports = blogsRouter;
