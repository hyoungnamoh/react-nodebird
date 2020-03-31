import {all, fork, takeLatest, delay, put, call, throttle} from 'redux-saga/effects';
import {
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_FAILURE,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_COMMENTS_REQUEST,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILURE,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_FAILURE, LOAD_POST_SUCCESS
} from "../reducers/post";
import axios from 'axios';
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user"; //한번 불러온 모듈은 캐싱돼서 다른데에서 baseurl 사용하면 공유됨

//모든 게시물 가져오기
function loadMainPostsAPI(lastId = 0, limit = 10) { //lastId 가 0이면 lastId가 없는걸로 간주하고 처음부터 불러옴
    return axios.get(`/posts?lastId=${lastId}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadMainPosts(action) {
    try {
        const result = yield call(loadMainPostsAPI, action.lastId);
        yield put({
            type:LOAD_MAIN_POSTS_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        console.log(e);
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: e,
        });
    }
}
function* watchLoadPosts() {
    // 한번 호출되고 1초안에 같은 request 를 호출할 수 없게 막아줌
    yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

//유저 포스트 가져오기
function loadUserPostsAPI(id) {
    return axios.get(`/user/${id || 0}/posts`, {
        withCredentials: true,
    });
}

function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data);
        yield put({
            type:LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        console.log(e);
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: e,
        });
    }
}
function* watchLoadUserPosts() {
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

//해시태그 포스트 가져오기
function loadHashtagPostsAPI(tag, lastId) {
    return axios.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=10`, {
        withCredentials: true,
    });
}

function* loadHashtagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
        yield put({
            type:LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        console.log(e);
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: e,
        });
    }
}
function* watchLoadHashtagPosts() {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

//포스팅하는 함수
function addPostAPI(postData) {
    return axios.post('/post', postData, {
        withCredentials: true,
    });
}
function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type:ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id
        });

    }catch (e) {
        console.log(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

//댓글 쓰는 함수
function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, {content: data.content}, {
        withCredentials: true,
    });
}

function* addComment(action) {
    let result;
    try {
        result = yield call(addCommentAPI, action.data);
        console.log('result', result);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
                comment: result.data,
            },
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        });
    }
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

//포스트에 댓글 가져오는 함수
function loadCommentsAPI(postId) {
    return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action) { //action = watch함수에서 받은 req액션안에 값, dispatch할때 같이 있던 값
    try {
        const result = yield call(loadCommentsAPI, action.data);
        yield put({
            type:LOAD_COMMENTS_SUCCESS,
            data: {
                postId: action.data,
                comments: result.data,
            },
        });
    }catch (e) {
        yield put({
            type: LOAD_COMMENTS_FAILURE,
            error: e,
        });
    }
}
function* watchLoadComments() {
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

//이미지 업로드하는 함수
function uploadImagesAPI(formData) {
    return axios.post(`/post/images`, formData, {
        withCredentials: true,
    });
}

function* uploadImages(action) { //action = watch함수에서 받은 req액션안에 값, dispatch할때 같이 있던 값
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: e,
        });
    }
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

//좋아요 누르는 함수
function likePostAPI(postId) {
    return axios.post(`/post/${postId}/like`, {}, {
        withCredentials: true,
    });
}

function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId,
            }
        });
    }catch (e) {
        yield put({
            type: LIKE_POST_FAILURE,
            error: e,
        });
    }
}
function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

//좋아요 취소하는 함수
function unLikePostAPI(postId) {
    return axios.delete(`/post/${postId}/like`, {
        withCredentials: true,
    });
}

function* unLikePost(action) {
    try {
        const result = yield call(unLikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId,
            }
        });
    }catch (e) {
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: e,
        });
    }
}
function* watchUnLikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

//포스트 삭제하는 함수
function removePostAPI(postId) {
    return axios.delete(`/post/${postId}`, {
        withCredentials: true,
    });
}

function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: result.data,
        });
    }catch (e) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: e,
        });
    }
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

//개별 포스트 불러오는 함수
function loadPosttAPI(postId) {
    return axios.get(`/post/${postId}`, {
        withCredentials: true,
    });
}

function* loadPost(action) {
    try {
        const result = yield call(loadPosttAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        yield put({
            type: LOAD_POST_FAILURE,
            error: e,
        });
    }
}
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}




//시작점
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadUserPosts),
        fork(watchLoadComments),
        fork(watchAddComment),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnLikePost),
        fork(watchRemovePost),
        fork(watchLoadPost),
    ]);
}