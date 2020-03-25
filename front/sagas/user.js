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
    LOAD_USER_FAILURE
} from "../reducers/user";
import axios from 'axios';



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

//시작점
export default function* userSaga() {
    //watch = 이벤트 리스너
    //all = 이벤트 리스너를 여러개 사용하고 싶을 때 사용, 여러 이펙트를 동시에 실행할 수 있게 함
    yield all ([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLogOut),
        fork(watchLoadUser),
    ]);
}