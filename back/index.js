const express = require('express');
const morgan = require('morgan'); //로깅
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSessin = require('express-session');
const dotenv = require('dotenv');

const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

db.sequelize.sync(); //자동으로 테이블 만들어줌
dotenv.config(); //.env 실행 password 읽어옴

const app = express();

//로깅 관련 middleware
app.use(morgan('dev')); //로깅 남겨 줌

//cors 에러 middleware
app.use(cors({//cors 오류 잡아줌 도메인이 다른데 요청을 할 경우 서버에서 거절함. 이걸 해결 해 줌
    origin: true,
    credentials: true,
}));

//request.body 관련 middleware
app.use(express.json()); //json으로 변환해줌
app.use(express.urlencoded({ extended: true})); //body로 넣어줌

//login 관련 middleware
app.use(cookieParser(process.env.COOKIE_SECRET)); //cookie를 알아서 parsing
app.use(expressSessin({ //session 사용하게 해 줌
    //얘네 둘은 무조건 넣어줘야함 보통 false로 함
    resave:false, //매번 세션 강제저장
    saveUninitialized: false, //빈 값도 저장
    secret: process.env.COOKIE_SECRET, //암호화 키
    cookie: {
        httpOnly: true, //쿠키를 자바스크립트에서 접근 못하게 함
        secure: false, //https 사용 시 true로 해야함
    }
}));

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

app.listen(8088, () => {
    console.log(`server is running on localhost:8088`);
});