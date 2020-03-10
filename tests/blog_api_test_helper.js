const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "I am Groot",
        author: "hannah",
        url: "https://www.naver.com",
        likes: 13
    },
    {
        title: "Banana is yellow",
        author: "banana",
        url: "https://www.daum.net",
        likes: 7
    }
];

const nonExistingId = async () => {
    const blog = new Blog({ title: "willremovethissoon" });
    await blog.save();
    await blog.remove();
    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
};
