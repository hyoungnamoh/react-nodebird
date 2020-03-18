module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.STRING(500),
            aloowNull: false,
        },
    }, {
        charset: 'utf8mb4', //한글에 이모티콘까지 가능
        collate: 'utf8_general_ci',
    });

    Post.associate = (db) => {
        db.Post.hasMany(db.Post); //한사람이 여러개 쓸 수 있음
        db.Post.hasMany(db.Comment);
        db.Post.belongsTo(db.User); //포스트는 유저에게 속해있다, belongsTo가 있는 테이블에 다른 테이블의 id를 저장 (Post 테이블에 UserId 저장)
    };

    return Post;
}