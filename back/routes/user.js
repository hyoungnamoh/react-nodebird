const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

// 내 정보 가져오기
router.get('/', (req, res) => { //api = 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
    if(!req.user){
        return res.status(401).send('로그인이 필요합니다.');
    }
    const user = Object.assign({}, req.user.toJSON()); //db에서 가져오 데이터를 다시 가공하는 경우 toJSON() 해줘야함
    delete user.password;
    console.log("useruseruseruseruseruseruseruser");
    console.log(user);
    return res.json(req.user);
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
        return res.status(200).json(newUser);
    }catch (e) {
        console.error(e);
        //에러처리 후에 next로 넘겨야함
        return next(e); //알아서 프론트에 에러가 났다고 알려줌
    }
});

// :id 다른사람 정보 가져오기
router.get('/:id', async (req, res, next) => { //남의 정보 가져오기 :id 는 req.params.id 로 가져옴
    try{
        const user = await db.User.findOne({
            where : { id: parseInt(req.params.id, 10)},
            include: [{
                model: db.Post,
                as: 'Posts',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname'],
        });
        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
        req.json(user);
    } catch (e) {
        console.error(e);
        next(e);
    }
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
        //에러가 없을 경우
        return req.login(user, async (loginErr) => {
            try {//login 중 에러
                if (loginErr) {
                    return next(loginErr);
                }
                console.log(user.id);
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    include: [{
                        model: db.Post,
                        as: 'Posts',
                        attributes: ['id'], //id만 보냄, 비밀번호 등 다른정보는 보내지 않음
                    }, {
                        model: db.User,
                        as: 'Followings',
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as: 'Followers',
                        attributes: ['id'],
                    }],
                    attributes: ['id', 'nickname', 'userId'], //비밀번호 제외하고 보냄
                });
                return res.json(fullUser);
            } catch (e) {
                next(e);
            }
        });
    })(req, res, next);
});

// 로그아웃 기능
router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

//다른 유저 포스트 가져오기
router.get('/:id/posts', async (req, res, next) => {
    try{
        const posts = await db.Post.findAll({
            where: {
                UserId: parseInt(req.params.id, 10),
                RetweetId: null,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        res.json(posts);
    }catch (e) {
        console.error(e);
        next(e);
    }
})

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