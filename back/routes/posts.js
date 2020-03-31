const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
    try{
        let where = {};
        if(parseInt(req.query.lastId, 10)){
            where = {
                id: { //id가 db.Sequelize.Op.lt 이 아이디 보다 작은걸 가져옴
                    [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), //lt: less than, lte: less than equal, gt: greater than
                }
            }
        }
        //lastId 가 0일 경우 where 조건 없이
        const posts = await db.Post.findAll({
            where, //lastId 조건
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
            order: [['createdAt', 'DESC']], //내림차순
            limit: parseInt(req.query.limit, 10),
        });
        res.json(posts); //변형이 필요없으면 toJSON 하지 않아도 됨
    }catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;