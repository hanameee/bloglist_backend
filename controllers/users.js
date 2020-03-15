const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", {
        url: 1,
        title: 1,
        author: 1
    });
    response.json(users.map(u => u.toJSON()));
});

userRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body;
        if (body.password.length < 3) {
            return response.status(400).json({
                error:
                    "User validation failed: : Password is shorter than the minimum allowed length (3)."
            });
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);
        const user = new User({
            username: body.username,
            name: body.name,
            password: passwordHash
        });
        const savedUser = await user.save();
        response.json(savedUser);
    } catch (exception) {
        next(exception);
    }
});

module.exports = userRouter;
