const express = require('express');
const morgan = require('morgan');
const next = require('next');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const dev = process.env.NODE_ENV !== 'develoment'; //개발모드
const prod = process.env.NODE_ENV === 'production'; //배포모드

//express와 next 연결
const app = next({ dev }); //true
const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
   const server = express(); //next

   server.use(morgan('dev'));
   server.use(express.json());
   server.use(express.urlencoded({extended:true}));
   server.use(cookieParser(process.env.COOKIE_SECRET)) //백엔드와 똑같이 설정 해줘야 함, 서버가 두갠데 쿠키 시크릿이 달라지면 서로의 쿠키를 해독 못함
   server.use(expressSession({
       resave: false,
       saveUninitialized: false,
       secret: '',
       cookie: {
           hasOwnProperty: true,
           secure: false,
       },
    }));

   //next로는 동적인 주소를 받는걸 할수가 없기때문에 express를 사용해 express 주소와 next 주소 연결
    //주소는 hashtag/:tag 지만 실제로 보여줄 페이지는 /hashtag
    server.get('/hashtag/:tag', (req, res) => {
        return app.render(req, res, '/hashtag', {tag: req.params.tag}); //태그를 전달, 이걸 전달해줘야 프론트에서 동적인 아이디를 캐치할 수 있음, 이렇게하면 tag가 hashtag page로 같이 딸려감
    });

    server.get('/user/:id', (req, res) => {
        return app.render(req, res, '/user', {id: req.params.id});
    });

   server.get('*', (req, res) => { //* 모든 get 요청 처리
       return handle(req, res);
   });

   server.listen(3000, () => {
       console.log('next+express running on port 3000')
   })
});