module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //앞에 대문자로 만들면 테이블 만들어질 때 자동으로 앞에 소문자로 바뀌고 뒤에 s붙음
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false, //false 면 필수 true면 선택
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    User.associate = (db) => {
        db.User.hasMany(db.Post, {as: 'Post'}); //한사람이 여러개 쓸 수 있음
        db.User.hasMany(db.Comment);
        //belongsToMany 사용 시 웬만하면 as 붙여주는게 좋음
        db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked'}); //게시글에 좋아요 클릭, 다 : 다
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers'});
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings'});
    };

    return User;
}