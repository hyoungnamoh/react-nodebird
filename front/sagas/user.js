import {all, takeLatest, fork, put, call, take, takeEvery, delay} from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE
} from "../reducers/user";
import axios from 'axios';

//서버에 요청보내는 API 함수들
function* loginAPI() {
    //서버에 요청을 보내는 부분
}

function* SignUpAPI() {
    //서버에 요청을 보내는 부분
}


//실제 실행 함수들
function* signUp() {
    try{
        yield delay(2000);
        yield call(SignUpAPI);//성공 시 다음 줄 실행
        throw new Error();
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

function* login() {
    try{
        // yield call(loginAPI);//성공 시 다음 줄 실행
        yield delay(3000);
        yield put({
            type: LOG_IN_SUCCESS //실행
        })
    } catch (e) { //실패 시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}

//watch 함수들
function* watchLogin() {
    //(호출되길 기다리는 액션, 호출되면 실행할 함수)
    //LOG_IN 액션이 호출되면 login 실행
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

//시작점
export default function* userSaga() {
    //watch = 이벤트 리스너
    //all = 이벤트 리스너를 여러개 사용하고 싶을 때 사용, 여러 이펙트를 동시에 실행할 수 있게 함
    yield all ([
        fork(watchLogin),
        fork(watchSignUp),
    ]);
}