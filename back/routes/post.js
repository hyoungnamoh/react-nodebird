const express = require('express');
const router = express.Router();
const db = require('../models');

//게시글 작성하기
router.post('/', async (req, res, next) => {
    try{
        //해시태그 찾는 정규표현식, 정규표현식에 걸리는애들 hashtags에 배열로 넣음
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id, //글쓴이(나)
        });
        if(hashtags){ //해시태그가 있으면
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({ //찾아서 있으면 찾고 없으면 생성
                where: { name: tag.slice(1).toLowerCase() },//# 자르고 소문자로 통일
            })));
            await newPost.addHashtags(result.map(r => r[0])); //시퀄라이즈가 만들어주는 함수 Post와 Hashtag 의 관계를 추가해주는 역할, add 외에도 get,set,remove 등 있음
        }
        // const User = await newPost.getUser(); newPost에 연결되어있는 유저정보를 가져옴
        // newPost.User = User; // 유저정보를 합침, user에 다른 데이터들을 넣어줘야함
        // res.json(newUser);
        const fullUser = await db.Post.findOne({ //다시하번 db를 조회
            where: { id: newPost.id },
            include: [{
                model: db.User,
            }],
        });
        res.json(fullUser);
    }catch (e) {
        console.error(e);
        next(e);
    }
});
//게시글 이미지 가져오기
router.post('/image', (req, res) => {

});

//댓글 쓰기
router.post('/:id/comment', async (req, res, next) => {
    try{
        if(!req.user){
            return res.status(401).send('로그인이 필요합니다.');
        }
        const post = await db.Post.findOne({where: { id: req.params.id }});
        //부모격인 post가 있는지 먼저 확인
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        //댓글 생성
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        //post와 댓글 이어주기, 시퀄라이즈가 제공해줌
        await post.addComment(newComment.id);
        //완성된 게시물 다시 조회, include 쓰기위해
        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        return res.json(comment);
    }catch (e) {
        console.error(e);
        return next(e);
    }
});
//댓글 가져오기
router.get('/:id/comments', async (req, res, next) => {
    try{
        const post = await db.Post.findOne({where: { id: req.params.id }});
        //부모격인 post가 있는지 먼저 확인
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where: {
                postId: req.params.id,
            },
            order: [['createdAt', 'ASC']],
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        res.json(comments);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;