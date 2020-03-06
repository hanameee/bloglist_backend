const listHelper = require("../utils/list_helper.js");

const listWithOneBlog = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
];
const listWithTwoSameLikeBlog = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f9",
        title: "Am I the favorite?",
        author: "Hannah",
        url:
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
];
const listWithThreeBlog = [
    {
        _id: "5e61de4247c1a712ab663876",
        title: "My very first blog",
        author: "Hannah",
        url: "https://github.com/hanameee",
        likes: 100,
        __v: 0
    },
    {
        _id: "5e61dea347c1a712ab663877",
        title: "Jeongho is cute",
        author: "Jeongho",
        url: "https://github.com/njh7799",
        likes: 200,
        __v: 0
    },
    {
        _id: "5e61e32e8c3bc219eb962476",
        title: "some title",
        author: "some author",
        url: "http://www.someurl.com",
        likes: 300,
        __v: 0
    }
];
const listWithMostBlogsJeongho = [
    {
        _id: "5e61de4247c1a712ab663876",
        title: "My very first blog",
        author: "Hannah",
        url: "https://github.com/hanameee",
        likes: 100,
        __v: 0
    },
    {
        _id: "5e61de4247c1a712ab663876",
        title: "My very first blog",
        author: "Hannah",
        url: "https://github.com/hanameee",
        likes: 100,
        __v: 0
    },
    {
        _id: "5e61de4247c1a712ab663876",
        title: "My very first blog",
        author: "Hannah",
        url: "https://github.com/hanameee",
        likes: 100,
        __v: 0
    },
    {
        _id: "5e61dea347c1a712ab663877",
        title: "Jeongho is cute",
        author: "Jeongho",
        url: "https://github.com/njh7799",
        likes: 200,
        __v: 0
    },
    {
        _id: "5e61dea347c1a712ab663877",
        title: "Jeongho is cute",
        author: "Jeongho",
        url: "https://github.com/njh7799",
        likes: 200,
        __v: 0
    },
    {
        _id: "5e61dea347c1a712ab663877",
        title: "Jeongho is cute",
        author: "Jeongho",
        url: "https://github.com/njh7799",
        likes: 200,
        __v: 0
    },
    {
        _id: "5e61dea347c1a712ab663877",
        title: "Jeongho is cute",
        author: "Jeongho",
        url: "https://github.com/njh7799",
        likes: 200,
        __v: 0
    },
    {
        _id: "5e61dea347c1a712ab663877",
        title: "Jeongho is cute",
        author: "Jeongho",
        url: "https://github.com/njh7799",
        likes: 200,
        __v: 0
    },
    {
        _id: "5e61e32e8c3bc219eb962476",
        title: "some title",
        author: "some author",
        url: "http://www.someurl.com",
        likes: 1234,
        __v: 0
    }
];
const listWithMostBlogsHannah = [
    {
        _id: "5e61de4247c1a712ab663876",
        title: "My very first blog",
        author: "Hannah",
        url: "https://github.com/hanameee",
        likes: 100,
        __v: 0
    },
    {
        _id: "5e61de4247c1a712ab663876",
        title: "My very first blog",
        author: "Hannah",
        url: "https://github.com/hanameee",
        likes: 100,
        __v: 0
    },
    {
        _id: "5e61de4247c1a712ab663876",
        title: "My very first blog",
        author: "Hannah",
        url: "https://github.com/hanameee",
        likes: 100,
        __v: 0
    },
    {
        _id: "5e61dea347c1a712ab663877",
        title: "Jeongho is cute",
        author: "Jeongho",
        url: "https://github.com/njh7799",
        likes: 200,
        __v: 0
    },
    {
        _id: "5e61e32e8c3bc219eb962476",
        title: "some title",
        author: "some author",
        url: "http://www.someurl.com",
        likes: 1234,
        __v: 0
    }
];
const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url:
            "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url:
            "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
];

describe("dummy", () => {
    const blogs = [1, 2, 3, 4, 5];
    test("of any blogs is one", () => {
        expect(listHelper.dummy(blogs)).toBe(1);
    });
});

describe("favorite blog", () => {
    test("only one blog", () => {
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url:
                "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        });
    });
    test("two same likes blogs", () => {
        expect(listHelper.favoriteBlog(listWithTwoSameLikeBlog)).toEqual({
            _id: "5a422aa71b54a676234d17f9",
            title: "Am I the favorite?",
            author: "Hannah",
            url:
                "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        });
    });
    test("favorite blog is 300", () => {
        expect(listHelper.favoriteBlog(listWithThreeBlog)).toEqual({
            _id: "5e61e32e8c3bc219eb962476",
            title: "some title",
            author: "some author",
            url: "http://www.someurl.com",
            likes: 300,
            __v: 0
        });
    });
});

describe("total likes", () => {
    test("when list has only one blog equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });
    test("when list has three blog ", () => {
        const result = listHelper.totalLikes(listWithThreeBlog);
        expect(result).toBe(200);
    });
});

describe("most blogs", () => {
    test("list with most blogs Hannah", () => {
        const result = listHelper.mostBlogs(listWithMostBlogsHannah);
        expect(result).toEqual({ author: "Hannah", blogs: 3 });
    });
    test("when list has three blog ", () => {
        const result = listHelper.mostBlogs(listWithMostBlogsJeongho);
        expect(result).toEqual({ author: "Jeongho", blogs: 5 });
    });
});

describe("most likes", () => {
    test("list with most likes", () => {
        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        });
    });
});
