import {all, fork, takeLatest, delay, put} from 'redux-saga/effects';
import {ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_COMMENT_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_FAILURE} from "../reducers/post";

//서버에 요청하는 API 함수
function addCommentAPI() {

}

function addPostAPI() {

}

//포스팅하는 함수
function* addPost() {
    try {
        yield delay(2000);
        yield put({
            type:ADD_POST_SUCCESS,
        });
    }catch (e) {
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

//댓글 쓰는 함수
function* addComment(action) { //action = watch함수에서 받은 req액션안에 값, dispatch할때 같이 있던 값
    try {
        yield delay(2000);
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
            },
        });
    }catch (e) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

//시작점
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ]);
}