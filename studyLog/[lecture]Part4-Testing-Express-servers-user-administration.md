# Part 4 - [Testing Express servers, user administration](https://fullstackopen.com/en/part4)

---

## [a) Structure of backend application, introduction to testing](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing)

### 🚧 Project structure

백엔드를 더 진행하기 전, Node.js의 폴더 구조를 정돈해보자.

`Node.js Best Practice Project Structure`

![image-20200305224042750](Part4-Testing-Express-servers-user-administration.assets/image-20200305224042750.png)



#### index.js

Application을 start 하는 데에 쓰이는 파일로, 아래와 같이 간단하게 작성한다.

```js
const app = require('./app') // 실제 express App을 import 해온 뒤 어플을 시작한다.
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
```



### app.js

```js
const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
```



#### /controllers/note.js

event handlers of routes 는 주로 controllers 라고 명명되므로 별개의 controllers 폴더에 저장한다.

```js
const notesRouter = require('express').Router() // 새로운 Router 객체 생성

//...

module.exports = notesRouter // Router 객체 export
```

Router 객체는 무엇일까? Express 매뉴얼에 따른 Router 객체의 정의는 아래와 같다.

>*A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.*

Router은 middleware이다.
특정 모듈 안에서의 "상대적 경로" 를 정의하기 위해 사용될 수 있다.

일례로 기존에 index.js에서 아래와 같이 경로를 정의했다면

```js
app.delete('/api/notes/:id', (request, response) => {
```

note.js 컨트롤러에서는 notesRouter을 import 해와서 아래와 같이 사용하고

```js
notesRouter.delete('/:id', (request, response) => {
```

note controller을 가져오는 app.js 에서는 아래와 같이 작성해준다.

```js
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter) // notesRouter은 api/notes 하위의 상대경로에서 작동하는 모든 경로들을 정의해 줄 수 있는 것
```



#### utils/config.js

dotenv 라이브러리를 통해 환경변수를 관리한다.

```js
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
```

어플의 다른 파트에서 환경변수가 필요할 때는 아래와 같이 config 모듈을 import 하여 사용한다.

```js
const config = require('./utils/config')

console.log(`Server running on port ${config.PORT}`)
```



#### utils/middleware.js

Logger, errorHandler 등의 middleware도 한 곳에서 작성한 뒤 export 해서 사용한다.

```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
```



### /models/note.js

기존에 mongoose와의 연결을 담당하던 부분을 app.js가 담당하게 되면서 models 폴더 안의 note.js는 오직 notes를 위한 noteSchema 만을 정의한다.

```js
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
```



### 🧪 Testing Node applications

Automated Testing 에 대해 알아보자.

#### 1. Jest 를 사용한 unit testing

`npm install --save-dev jest`
dev 단계에서만 쓰일 것이므로 --save-dev flag를 붙여준다.

`package.json` 

```js
{
  "scripts": {
    ...
    "test": "jest --verbose"  // test 명령어로 Jest 를 사용한 test 를 실행하고, verbose style 로 execution 결과를 report 할 것
  },
 ...
  "jest": {
   "testEnvironment": "node" // Jest의 최신 버전에선 testEnvironment를 명시할 것을 요구
 }
}
```

`tests/palindrome.test.js `

```js
// 테스트 할 Function을 import 해온 뒤 변수에 할당
const palindrome = require('../utils/for_testing').palindrome

// 개별 test cases 는 test function 안에 정의됨 
// 첫번째 파라미터는 test description (string)
// 두번째 파라미터는 test case의 functionality 를 정의하는 함수
test('palindrome of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})
```

Test case 의 Functionality 를 정의하는 함수를 조금 더 자세히 보면 다음과 같다.

```js
() => {
  // test 될 코드를 실행해 result 변수에 저장한다
  const result = palindrome('react')
  // expect 함수를 이용해 result 를 verify 한다
  // expect 함수는 다양한 matcher 함수들을 제공하는데, 우리는 두 string을 비교하므로 toBe 를 사용한 것
  expect(result).toBe('tcaer')
}
```

Test 를 돌려보면 아래와 같은 결과가 나옴을 알 수 있다.

![image-20200306162907642](Part4-Testing-Express-servers-user-administration.assets/image-20200306162907642.png)



+) Test cases 들을 describe block 으로 감쌀 수도 있는데, 이런 Describe blocks 들은 test 들을 logical collections 로 그룹핑 할 때 쓰인다.

```js
const average = require("../utils/for_testing").average;

describe("average", () => {
    test("of one value is the value itself", () => {
      	// result 라는 변수에 따로 할당하지 않고 바로 코드 식을 expect 안에 넣을 수도 있다.
        expect(average([1])).toBe(1);
    });

    test("of many is calculated right", () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
    });

    test("of empty array is zero", () => {
        expect(average([])).toBe(0);
    });
});
```



### ⏰ async / await

async/await 문법은 함수는 promise를 리턴하는 비동기적 함수를 마치 동기적 함수를 작성할 때와 유사하게 작성하게 해준다.

기존 DB에서 notes 를 fetch 해오는, promise 를 리턴하는 함수는 아래와 같이 생겼었다.

```js
Note.find({})
  .then(notes => {
  	console.log('opreration returned the following notes', notes)
})
	.then(response => {
  	console.log("the first note is removed")
})
// promise chaining을 통해 callback hell 탈출 가능
```

이런 promise chaining은 기존 비동기함수를 처리하던 방법인 콜백함수보다는 나은 방법이지만, 더 나은 방법이 있다!

ES6 에서 소개된 [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) 은 잘 쓰이지 않고, 대신 ES7에서 소개된 async/await 키워드가 generator과 같은 기능을 제공하며 훨씬 더 문법적으로 이해하기 쉽다.

```js
// 기존 .then chaining을 사용한 방법
Note.find({}).then(notes => {console.log('opreration returned the following notes', notes)})

// async/await 키워드를 사용한 방법
const notes = await Note.find({})
console.log('opreration returned the following notes', notes)
```

두번째 async/await 을 사용한 방법은 완벽하게 synchronous code 처럼 보인다!
코드 실행이 `const notes = await Note.find({})` 에서 멈추고, promise가 furfilled 될 때 까지 기다린다. promise가 furfilled 되면 그제서야 다음 코드가 실행된다.

다만, await 키워드는 아무데에서나 쓰일 수 있는게 아니다! 반드시 async 함수 안에서만 사용될 수 있다.

```js
// async 키워드를 통해 main 함수가 비동기적으로 작동한다는 것을 선언한다
const main = async () => {
  const notes = await Note.find({})
  console.log('opreration returned the following notes', notes)
  const response = await notes[0].remove()
  console.log('the first note is removed')
}
main()
```

##### async/await 에서의 error handling

try-catch 를 이용한다.

```js
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
  })
  // error handling
  try { 
    const savedNote = await note.save()
    response.json(savedNote.toJSON())
  } catch(exception) {
    // next 함수를 호출해 exception을 error handling middleware로 보낸다!
    next(exception)
  }
})
```

