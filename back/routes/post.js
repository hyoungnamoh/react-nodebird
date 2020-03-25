const express = require('express');
const router = express.Router();
const db = require('../models');
const { isLoggedIn } = require('./middleware');
const multer = require('multer');
const path = require('path');
//업로드 설정
const upload = multer({
    storage: multer.diskStorage({ //저장 옵션 서버쪽 디스크에 저장
        destination(req, file, done){
            done(null, 'uploads'); //어떤 폴더에 저장할지
            //(서버에러, 성공했을때)
        },
        filename(req, file, done){ //파일이름 옵션
            const ext = path.extname(file.originalname); //확장자 추출
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, //파일크기 제한 옵션
});

//게시글 작성하기
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { //이미지 주소들만 올릴때, 파일이 아닌 텍스트만 올리기 때문에 none() 사용
    //formData 파일 => req.file(s)
    //formData 일반 값 => req.body
    try{
        //해시태그 찾는 정규표현식, 정규표현식에 걸리는애들 hashtags에 배열로 넣음
        console.log(req.body.content);
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
        if(req.body.image){ //프론트에서 넘겨줄때 담은 값
            if(Array.isArray(req.body.image)){ //배열인지 구분, 여러개 올렸을 경우와 하나만 올렸을 경우와 모양이 다름, 여러개 올리면 배열, 하나만 올리면 image: 주소1
                const images = await Promise.all(req.body.image.map((image) => { //동시에 여러가지 디비 쿼리, 배열을 맵으로 해서 원하는 db작업하고 Promise.all 하면 한번에 처리됨
                    return db.Image.create({ src: image });
                }));
                await newPost.addImage(images);
            }else{ //한장일 경우
                const image = await db.Image.create({ src: req.body.image }); //이미지 주소 저장
                await newPost.addImage(image); //이미지 주소를 따로 DB에 저장한 후 게시글과 연결
            }
        }
        // const User = await newPost.getUser(); newPost에 연결되어있는 유저정보를 가져옴
        // newPost.User = User; // 유저정보를 합침, user에 다른 데이터들을 넣어줘야함
        // res.json(newUser);
        const fullUser = await db.Post.findOne({ //다시하번 db를 조회
            where: { id: newPost.id },
            include: [{
                model: db.User,
            }, {
                model: db.Image,
            }],
        });
        res.json(fullUser);
    }catch (e) {
        console.error(e);
        next(e);
    }
});
//이미지 업로드하기
router.post('/images', upload.array('image'), (req, res) => { //array(프론트에서 append 한 이름), array = 여러장, single = 한장, fields = 이미지 여러개 올릴 때 이름을 각기 다르게 받을 수 있음, none = 파일을 하나도 안올릴 경우
    //파일이 넘어오는 위치, single 이면 req.file
    res.json(req.files.map(v => v.filename)); //파일명 전달
});

//댓글 쓰기
router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
    try{
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

//좋아요 누르기
router.post('/:id/like', isLoggedIn, async (req, res, next) => {
    try{
        const post = await db.Post.findOne({ where: { id: req.params.id }});
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        res.json({ userId: req.user.id});
    } catch(e){
        console.error(e);
        next(e);
    }
});

//좋아요 최소하기
router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
    try{
        const post = await db.Post.findOne({ where: { id: req.params.id }});
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({ userId: req.user.id});
    } catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router;