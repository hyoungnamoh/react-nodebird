const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try{
        const posts = await db.Post.findAll({
            //hashtag 테이블에서 찾을것이므로 include 안에서 where 조건 달아줌
            include: [{
                model: db.Hashtag,
                //주소를 통해 서버로 갈때 한글, 특문에 경우 uri component로 바뀌어버림 이걸 서버에서 다시 디코딩
                where: { name: decodeURIComponent(req.params.tag)},
            }, {
                model: db.User,
            }, {
                model: db.Image,
            }],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;