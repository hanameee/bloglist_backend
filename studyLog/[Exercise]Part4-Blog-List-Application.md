# [Exrcises] Part 4 - [Blog List Application](https://fullstackopen.com/en/part4)

---

Part4 의 Exercise인 Blog List 를 만드는 과정을 단계별로 기술하며 Part 3 Backend 내용을 전반적으로 복습한다.

## 0. Application 시작하기

- `npm init` 으로 Application의 template을 만든다.
- `npm install` 로 dependencies, devdependencies를 설치한다. [npm install에서 -S, -D flag의 역할](https://stackoverflow.com/questions/36022926/what-do-the-save-flags-do-with-npm-install)
-  `package.json` 의 script를 수정한다. (start, watch, test 등)
-  `.gitignore` , `.env` 파일 등을 작성한다.

## 1. Express 도입하기

`index.js`

Application의 entry point인 index.js 에선 app을 import 해온 후 서버를 켠다.

```js
const app = require("./app"); // 실제 express App을 import 해온 뒤
const http = require("http"); 
const server = http.createServer(app); // 서버를 켠다.

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
```

`app.js`

실제 Express Application 을 만들고, Controller, Middleware 등을 불러온다.

```js
const express = require("express");
const middleware = require("./utils/middleware");
const bodyParser = require("body-parser");
const notesRouter = require("./controllers/notes");

const app = express();

// 미들웨어는 순서가 중요하다
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});
app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
```

`controllers/blogs.js`

각 모듈별 상대경로 **라우터**들을 정의한다. 아래와 같이 특정 경로/메소드로 들어온 요청을 받아 핸들링하는 **event handler function** 을 정의한다.

```js
const notesRouter = require("express").Router();

let blogs = [{ writer: "hannah", content: "very first blog" }];

// '/' 경로의 요청을 핸들링하는 이벤트 핸들러
notesRouter.get("/", (request, response) => {
    res.json(blogs);
});

module.exports = notesRouter;
```

2개의 파라미터 request, response 는 아래와 같은 역할을 한다.

- request : contains all of the information of the HTTP request
- response : used to define how the request is responded to