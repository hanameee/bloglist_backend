const Blog = require("../models/blog");
const User = require("../models/user");

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

const initialUsers = [
    {
        username: "hannah",
        name: "Lee Hae Na",
        password: "gosk"
    },
    {
        username: "rainwaltz",
        name: "Nam Jeong Ho",
        password: "wjdgh"
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

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

module.exports = {
    initialBlogs,
    initialUsers,
    nonExistingId,
    blogsInDb,
    usersInDb
};
