const listHelper = require("../utils/list_helper.js");

describe("dummy", () => {
    const blogs = [1, 2, 3, 4, 5];
    test("of any blogs is one", () => {
        expect(listHelper.dummy(blogs)).toBe(1);
    });
});

describe("favorite blog", () => {
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
            author: "Jeonhho",
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
            author: "Jeonhho",
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

    test("when list has only one blog equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });
    test("when list has three blog ", () => {
        const result = listHelper.totalLikes(listWithThreeBlog);
        expect(result).toBe(200);
    });
});
