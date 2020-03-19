module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { //앞에 대문자로 만들면 테이블 만들어질 때 자동으로 앞에 소문자로 바뀌고 뒤에 s붙음
        content: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', //한글에 이모티콘까지 가능
        collate: 'utf8mb4_general_ci',
    });

    Post.associate = (db) => {
        db.Post.hasMany(db.Image); //한사람이 여러개 쓸 수 있음
        db.Post.hasMany(db.Comment);
        db.Post.belongsTo(db.User); //포스트는 유저에게 속해있다, belongsTo가 있는 테이블에 다른 테이블의 id를 저장 (Post 테이블에 UserId 저장)
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'}); //다 : 다 관계에서 필요한 PK 테이블을 through
        db.Post.belongsTo(db.Post, {as: 'Retweet'}); //자기참조, 리트윗, 이름이 같을 때 as로 구분지어줌
        db.Post.belongsToMany(db.User, {through: 'Like'}); //게시글에 좋아요 클릭
    };

    return Post;
}