export const initialState = {
    mainPosts: [{
        User: {
            id:1,
            nickName: "오형남",
        },
        content: "첫번째 게시물",
        img: "",
    }], //화면에 보일 포스트들
    imagePaths:[], //미리보기 이미지 경로
    addPostError: false, //포스트 업로드 실패 사유
    isAddingPost: false, //포스트 업로드 중
};
//포스트 업로드하는 액션
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

//메인포스트 로딩하는 액션
export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

//해쉬태그로 검색했을때 결과 로딩하는 액션
export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

//사용자가 어떤 게시글썼는지 로딩하는 액션
export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

//이미지 업로드하는 액션
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

//이미지 업로드 취소하는 액션(얘는 동기로해도 상관없음)
export const REMOVE_IMAGE = 'REMOVE_IMAGE';

//포스트에 좋아요 누르는 액션
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

//포스트에 좋아요 취소하는 액션
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

//댓글남기는 액션
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

//게시글 댓글 불러오는 액션
export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

//리트윗하는 액션
export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

//포스트 제거하는 액션
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

//게시글 수정하는 액션


export const addPost = {
    type: ADD_POST,
};

export const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        UserId: 1,
        User: {
            nickname: '형남',
        },
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
            };
        }
        case ADD_DUMMY:{
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts]
            };
        }
        default : {
            return{
                ...state,
            }
        }
    };
}
//reducer와 initialState는 자주 쓰이므로 export 함
export default reducer;