const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./blog_api_test_helper");
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

test("all blogs are returned", async () => {
    const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body.length).toBe(helper.initialBlogs.length);
});

test("unique identifier property of the blogs are named id", async () => {
    const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    const receivedBlogs = response.body;
    for (let blog of receivedBlogs) {
        expect(blog.id).toBeDefined();
    }
});

test("new post is successfully saved into Database", async () => {
    const newBlog = {
        title: "I'll be newly saved",
        author: "newbie",
        url: "https://www.facebook.com",
        likes: 0
    };

    await api
        .post(`/api/blogs`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    // helper의 blogsInDb 역시 async function이므로 앞에 꼭 await 을 붙여야 함에 주의!
    const blogAtEnd = await helper.blogsInDb();
    expect(blogAtEnd.length).toBe(helper.initialBlogs.length + 1);

    const contents = blogAtEnd.map(blog => blog.title);
    expect(contents).toContain(newBlog.title);
});

test("post with missing likes property should default to value 0", async () => {
    const newBlogMissingLikes = {
        title: "Will someone like me?",
        author: "newbie",
        url: "https://www.youtube.com"
    };

    const response = await api
        .post(`/api/blogs`)
        .send(newBlogMissingLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
});

test("blogs missing title can't be saved", async () => {
    const newBlogMissingTitle = {
        author: "newbie",
        url: "https://www.youtube.com"
    };

    await api
        .post(`/api/blogs`)
        .send(newBlogMissingTitle)
        .expect(400);
});

test("blogs missing url can't be saved", async () => {
    const newBlogMissingUrl = {
        title: "Will someone like me?",
        author: "newbie"
    };

    await api
        .post(`/api/blogs`)
        .send(newBlogMissingUrl)
        .expect(400);
});

afterAll(() => {
    mongoose.connection.close();
});
