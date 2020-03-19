const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

// 내 정보 가져오기
router.get('/', (req, res) => { //api = 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구

});

// 회원가입하기
router.post('/', async (req, res, next) => {
    try {
        const exUser = await db.User.findOne({
            where: { //조회
                userId: req.body.userId,
            },
        });
        if(exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);//salt 가 커질수록 해킹 위험은 낮아지지만 암호화하는데 시간이 오래걸림 10~13 사이로 ㄱㄱ

        //DB에 생성 저장
        const newUser = await db.User.create({
            nickname: req.body.nickname, //body 쓰려면 index.js 에 json, urlencoded 추가해야함
            userId: req.body.userId,
            password: hashedPassword,
        });
        console.log(newUser);
        return res.status(200).json(newUser);
    }catch (e) {
        console.error(e);
        //에러처리 후에 next로 넘겨야함
        return next(e); //알아서 프론트에 에러가 났다고 알려줌
    }
});

// :id 정보 가져오기
router.get('/:id', (req, res) => { //남의 정보 가져오기 :id 는 req.params.id 로 가져옴

});

// 로그인 기능
router.post('/login', (req, res, next) => {//(Strategy 명
    passport.authenticate('local', (err, user, info) => { //info = done 에 세번째 인자(로직상 에러)
        //서버 에러가 있을 경우
        if(err){
            console.error(err);
            next(err);
        }
        //로직상 에러가 있을 경우
        if(info){
            return res.status(401).send(info.reason);
        }
        //서버에러, 로직상 에러가 없을 경우
        return req.login(user, (loginErr) => {
            //로그인 에러 발생하면
            if(loginErr){
                return next(loginErr);
            }
            //비밀번호를 프론트에 보내는건 위험하므로 비밀번호는 지우고 보냄
            const filteredUser = Object.assign( {}, user.toJSON()); //시퀄라이즈가 이상하게 만든 데이터라 json으로 한번 파싱해줘야함
            delete filteredUser.password;

            return res.json(user);
        });
    })(req, res, next);
});

// 로그아웃 기능
router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

// :id 팔로우 정보 가져오기
router.get('/:id/follow', (req, res) => {

});

//:id 팔로우 하기
router.post('/:id/follow', (req, res) => {

});

//:id 팔로우 취소
router.delete('/:id/follow', (req, res) => {

});

//:id 팔로워 취소
router.delete('/:id/follower', (req, res) => {

});

//:id 게시물 모두 가져오기
router.get('/:id/posts', (req, res) => {

});

module.exports = router;