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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};
