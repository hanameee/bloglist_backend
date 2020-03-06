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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
};
