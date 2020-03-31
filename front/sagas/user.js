import {all, takeLatest, fork, put, call, take, takeEvery, delay} from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    LOAD_FOLLOW_SUCCESS,
    LOAD_FOLLOW_FAILURE,
    LOAD_FOLLOW_REQUEST,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    REMOVE_FOLLOWER_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS, EDIT_NICKNAME_REQUEST, EDIT_NICKNAME_FAILURE, EDIT_NICKNAME_SUCCESS
} from "../reducers/user";
import axios from 'axios';
import {LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS} from "../reducers/post";



/*
    로그아웃
 */
function logOutAPI() {
    //서버에 요청을 보내는 부분
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}

function* logOut(action) {
    try{
        const result = yield call(logOutAPI, action.data);//성공 시 다음 줄 실행
        yield put({
            type: LOG_OUT_SUCCESS, //실행
            data: result.data,
        })
    } catch (e) { //실패 시
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE
        })
    }
}

function* watchLogOut() {
    //(호출되길 기다리는 액션, 호출되면 실행할 함수)
    //LOG_IN 액션이 호출되면 login 실행
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

/*
    유저 정보가져오기, 다른유저 정보가져오기
 */
function loadUserAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.get(userId ? `/user/${userId}` : '/user/', {
        withCredentials: true,
    });
}
function* loadUser(action) {
    try {
        // yield call(loadUserAPI);
        const result = yield call(loadUserAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}
function* watchLoadUser() {
    //(호출되길 기다리는 액션, 호출되면 실행할 함수)
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

/*
    회원가입
 */
function signUpAPI(signUpdata) {
    return axios.post('/user/', signUpdata);
}
function* signUp(action) {
    try{
        yield call(signUpAPI, action.data);// (함수, 인자)
        yield put({
            type: SIGN_UP_SUCCESS //실행
        })
    } catch (e) { //실패 시
        yield put({
            type: SIGN_UP_FAILURE,
            error: e
        })
    }
}
function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

/*
    로그인
 */
function loginAPI(loginData) {
    //서버에 요청을 보내는 부분
    return axios.post('/user/login', loginData, {
        withCredentials: true, //다른 도메인과 쿠키 주고받을 수 있게 함, 추가로 서버쪽에 cors 설정 해줘야 함
    });
}
function* login(action) {
    try{
       const result = yield call(loginAPI, action.data);//성공 시 다음 줄 실행
        yield put({
            type: LOG_IN_SUCCESS, //실행
            data: result.data,
        })
    } catch (e) { //실패 시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}
function* watchLogin() {
    //(호출되길 기다리는 액션, 호출되면 실행할 함수)
    //LOG_IN 액션이 호출되면 login 실행
    yield takeLatest(LOG_IN_REQUEST, login);
}

/*
    팔로우
 */
function followAPI(userId) {
    return axios.post(`/user/${userId}/follow`, {}, {
        withCredentials: true,
    });
}

function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);
        yield put({
            type: FOLLOW_USER_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        yield put({
            type: FOLLOW_USER_FAILURE,
            error: e,
        });
    }
}
function* watchFollow() {
    yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

/*
    팔로우 취소
 */
function unFollowAPI(userId) {
    return axios.delete(`/user/${userId}/follow`, {
        withCredentials: true,
    });
}

function* unFollow(action) {
    try {
        const result = yield call(unFollowAPI, action.data);
        yield put({
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error: e,
        });
    }
}
function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_USER_REQUEST, unFollow);
}

/*
    내 팔로워 목록 삭제하기
 */
function removeFollowerAPI(userId) {
    return axios.delete(`/user/${userId}/follower`, {
        withCredentials: true,
    });
}

function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        console.error(e);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: e,
        });
    }
}
function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

/*
    내 팔로윙 목록 가져오기
 */
function loadFollowingsAPI(userId, offset = 0, limit = 3) {
    return axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data, action.offset);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: e,
        });
    }
}
function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

/*
    내 팔로워 목록 가져오기
 */
function loadFollowersAPI(userId, offset = 0, limit = 3) {
    return axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data, action.offset);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: e,
        });
    }
}
function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

/*
    내 정보 수정
 */
function editNicknameAPI(nickname) {
    return axios.patch(`/user/nickname`, {nickname},{ //부분수정 petch, 전부수정 put
        withCredentials: true,
    });
}

function* editNickname(action) {
    try {
        const result = yield call(editNicknameAPI, action.data);
        yield put({
            type: EDIT_NICKNAME_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        console.error(e);
        yield put({
            type: EDIT_NICKNAME_FAILURE,
            error: e,
        });
    }
}
function* watchEditNickname() {
    yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}


//시작점
export default function* userSaga() {
    //watch = 이벤트 리스너
    //all = 이벤트 리스너를 여러개 사용하고 싶을 때 사용, 여러 이펙트를 동시에 실행할 수 있게 함
    yield all ([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
    ]);
}