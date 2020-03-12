const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./blog_api_test_helper");
const api = supertest(app);

describe("when there is initially 2 notes at db", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        for (let blog of helper.initialBlogs) {
            let blogObject = new Blog(blog);
            await blogObject.save();
        }
    });

    describe("getting blog", () => {
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
    });

    describe("adding a new blog", () => {
        test("vaild post should be successfuly saved", async () => {
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
    });

    describe("deleting a blog", () => {
        test("deleting vaild blog should succeed", async () => {
            const blogsAtStart = await helper.blogsInDb();
            const blogToDelete = blogsAtStart[0];
            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

            const blogsAtEnd = await helper.blogsInDb();
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

            const contentsAtEnd = blogsAtEnd.map(blog => blog.title);
            expect(contentsAtEnd).not.toContain(blogToDelete.title);
        });
    });

    describe("updating a blog", () => {
        test("update likes property", async () => {
            const blogsAtStart = await helper.blogsInDb();
            const blogToUpdate = {
                ...blogsAtStart[0],
                likes: 100
            };
            const response = await api
                .put(`/api/blogs/${blogsAtStart[0].id}`)
                .send(blogToUpdate)
                .expect(200);
            expect(response.body.likes).toEqual(blogToUpdate.likes);
        });
    });
});

describe("when there is initially one user at db", () => {
    beforeEach(async () => {
        await User.deleteMany({});
        for (let user of helper.initialBlogs) {
            let userObject = new User(user);
            await userObject.save();
        }
    });

    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: "groot",
            name: "Kim Groot",
            password: "rmfnxm"
        };
        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);
    });
});
afterAll(() => {
    mongoose.connection.close();
});
