module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nickname: {
            type: DataTypes.STRING(20),
            aloowNull: false,
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
        db.User.hasMany(db.Post); //한사람이 여러개 쓸 수 있음
        db.User.hasMany(db.Comment);
    };

    return User;
}