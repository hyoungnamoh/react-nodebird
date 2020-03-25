module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { //앞에 대문자로 만들면 테이블 만들어질 때 자동으로 앞에 소문자로 바뀌고 뒤에 s붙음
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', //한글에 이모티콘까지 가능
        collate: 'utf8mb4_general_ci',
    });

    Comment.associate = (db) => {
        db.Comment.belongsTo(db.Post); //한사람이 여러개 쓸 수 있음
        db.Comment.belongsTo(db.User); //포스트는 유저에게 속해있다, belongsTo가 있는 테이블에 다른 테이블의 id를 저장 (Post 테이블에 UserId 저장)
    };

    return Comment;
}