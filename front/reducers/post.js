export const initialState = {
    mainPosts: [], //화면에 보일 포스트들
    imagePaths:[], //미리보기 이미지 경로
    addPostErrorReason: false, //포스트 업로드 실패 사유
    isAddingPost: false, //포스트 업로드 중
    postAdded: false, //포스트 업로드 성공
    isAddingComment: false,
    addCommentErrorReason: '',
    commentAdded: false,
};

//추가할 더미 댓글
const dummyComment = {
    id:1,
    User: {
        id: 1,
        nickName: '형남',
    },
    createdAt: new Date(),
    content: '더미 댓글입니디.'
}

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


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST: {
            return {
                ...state,
                isAddingPost: false,
                postAdded: false,
                isLogging: true,
            };
        }
        case ADD_POST_SUCCESS: {
            return {
                ...state,
                isAddingPost: true,
                mainPosts: [action.data, ...state.mainPosts],
                postAdded: true,
                isLogging: false,
                imagePaths: [],
            };
        }
        case ADD_POST_FAILURE: {
            return {
                ...state,
                isAddingPost: true,
                addPostErrorReason: action.error,
                isLogging: false,
            };
        }
        case LOAD_MAIN_POSTS_REQUEST:
        case LOAD_HASHTAG_POSTS_REQUEST:
        case LOAD_USER_POSTS_REQUEST: {
            return {
                ...state,
                mainPosts: [],
            };
        }
        case LOAD_MAIN_POSTS_SUCCESS:
        case LOAD_HASHTAG_POSTS_SUCCESS:
        case LOAD_USER_POSTS_SUCCESS: {
            return {
                ...state,
                mainPosts: action.data,
            };
        }
        case LOAD_MAIN_POSTS_FAILURE:
        case LOAD_HASHTAG_POSTS_FAILURE:
        case LOAD_USER_POSTS_FAILURE: {
            return {
                ...state,
            };
        }
        case ADD_COMMENT_REQUEST: {
            return {
                ...state,
                isAddingComment: true,
                addCommentErrorReason: '',
                commentAdded: false,

            };
        }
        case ADD_COMMENT_SUCCESS: {
            //불변성 유지
            const postIndex = state.mainPosts.findIndex(v => v.id=== action.data.postId);
            const post = state.mainPosts[postIndex];
            const Comments = [...post.Comments, action.data.comment];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Comments};
            return {
                ...state,
                isAddingComment: false,
                mainPosts,
                commentAdded: true,
            };
        }
        case ADD_COMMENT_FAILURE: {
            return {
                ...state,
                isAddingComment: false,
                addCommentErrorReason: action.error,
            };
        }
        case LOAD_COMMENTS_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Comments = action.data.comments;
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Comments };
            return {
                ...state,
                mainPosts,
            };
        }
        case UPLOAD_IMAGES_REQUEST: {
            return {
                ...state,
            };
        }
        case UPLOAD_IMAGES_SUCCESS: {
            return {
                ...state,
                imagePaths: [...state.imagePaths, ...action.data], //이미지 미리보기 경로
            };
        }
        case UPLOAD_IMAGES_FAILURE: {
            return {
                ...state,
            };
        }
        case REMOVE_IMAGE: {
            return{
                ...state,
                imagePaths: state.imagePaths.filter((v, i) => i !== action.index),
            }
        }
        case LIKE_POST_REQUEST: {
            return {
                ...state,
            };
        }
        case LIKE_POST_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = [{id: action.data.userId}, ...post.Likers];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Likers };
            return {
                ...state,
                mainPosts,
            };
        }
        case LIKE_POST_FAILURE: {
            return {
                ...state,
            };
        }
        case UNLIKE_POST_REQUEST: {
            return {
                ...state,
            };
        }
        case UNLIKE_POST_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = post.Likers.filter(v => v.id !== action.data.userId);
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Likers };
            return {
                ...state,
                mainPosts,
            };
        }
        case UNLIKE_POST_FAILURE: {
            return {
                ...state,
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