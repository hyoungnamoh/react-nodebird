const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
    try{
        const posts = await db.Post.findAll({
            include: [{
                model: db.User, //게시글 작성자 include
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model: db.User, //게시글 좋아요 누른사람 include
                through: 'Like',
                as: 'Likers',
                attributes: ['id'],
            }],
            order: [['createdAt', 'DESC']] //내림차순
        });
        res.json(posts); //변형이 필요없으면 toJSON 하지 않아도 됨
    }catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;