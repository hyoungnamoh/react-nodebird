//공통부분

//로그인 필요 체크
exports.isLoggedIn = (req, res, next) => {
    //로그인을 했으면 next
    if(req.isAuthenticated()){
        //괄호안에 e를 넣으면 에러처리하는 곳으로 넘어가지만 아무것도 안넣으면 다음 미들웨어로 넘어감
        next();
    } else{
        res.status(401).send('로그인이 필요합니다.');
    };
}

//로그아웃 필요 체크
exports.isNotLoggedIn = (req, res, next) => {
    //로그인 안했으면 next
    if(!req.isAuthenticated()){
        //괄호안에 e를 넣으면 에러처리하는 곳으로 넘어가지만 아무것도 안넣으면 다음 미들웨어로 넘어감
        next();
    } else{
        res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
    };
}