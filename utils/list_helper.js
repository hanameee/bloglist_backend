var _ = require("lodash");

const dummy = blogs => {
    return 1;
};

const totalLikes = blogs => {
    const reducer = (sum, blog) => {
        return sum + blog.likes;
    };
    return blogs.length == 0 ? 0 : blogs.reduce(reducer, 0) / blogs.length;
};

const favoriteBlog = blogs => {
    const reducer = (mostFavoriteBlog, currentBlog) => {
        return mostFavoriteBlog.likes > currentBlog.likes
            ? mostFavoriteBlog
            : currentBlog;
    };
    return blogs.reduce(reducer);
};

const mostBlogs = blogs => {
    const grouppedByAuthor = _.chain(blogs)
        .groupBy("author")
        .reduce(function(result, value) {
            return value.length > result.length ? value : result;
        }, [])
        .value();

    return {
        author: grouppedByAuthor[0].author,
        blogs: grouppedByAuthor.length
    };
};

const mostLikes = blogs => {
    const authorList = [];
    const authorsTotalLike = [];
    blogs.map(blog => {
        if (!authorList.includes(blog.author)) {
            authorList.push(blog.author);
            const newAuthor = {
                author: blog.author,
                likes: blog.likes
            };
            authorsTotalLike.push(newAuthor);
        } else {
            authorsTotalLike.map(author => {
                if (author.author === blog.author) {
                    author.likes += blog.likes;
                }
            });
        }
    });
    return authorsTotalLike.reduce((acc, cur) => {
        return cur.likes > acc.likes ? cur : acc;
    });
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};
