import produce from 'immer'; //redux, setState 사용 시 불변성을 지켜야 할 때 사용

export const initialState = {
    mainPosts: [], //화면에 보일 포스트들
    imagePaths:[], //미리보기 이미지 경로
    addPostErrorReason: false, //포스트 업로드 실패 사유
    isAddingPost: false, //포스트 업로드 중
    postAdded: false, //포스트 업로드 성공
    isAddingComment: false,
    addCommentErrorReason: '',
    commentAdded: false,
    singlePost: null,
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
//
//개별 게시글 불러오는 액션
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';


//immer 추가
const reducer = (state = initialState, action) => {
    // return produce(state, (draft) => {
    //     switch (action.type) {
    //         case ADD_POST_REQUEST: {
    //             // return {
    //             //     ...state,
    //             //     isAddingPost: false,
    //             //     postAdded: false,
    //             //     isLogging: true,
    //             // };
    //             draft.isAddingPost = true;
    //             draft.potAdded = false;
    //             break;
    //         }
    //         case ADD_POST_SUCCESS: {
    //             // return {
    //             //     ...state,
    //             //     isAddingPost: true,
    //             //     mainPosts: [action.data, ...state.mainPosts],
    //             //     postAdded: true,
    //             //     isLogging: false,
    //             //     imagePaths: [],
    //             // };
    //             draft.isAddingPost = false;
    //             draft.mainPosts.unshift(action.data); //unshift 배열에 새로운 배열 요소를 맨앞에 추가하고 길이를 반환
    //             draft.postAdded = true;
    //             draft.imagePaths = [];
    //             break;
    //         }
    //         case ADD_POST_FAILURE: {
    //             // return {
    //             //     ...state,
    //             //     isAddingPost: true,
    //             //     addPostErrorReason: action.error,
    //             //     isLogging: false,
    //             // };
    //             draft.isAddingPost = true;
    //             draft.addPostErrorReason = action.error;
    //             draft.isLogging = false;
    //             break;
    //         }
    //         case LOAD_MAIN_POSTS_REQUEST:
    //         case LOAD_HASHTAG_POSTS_REQUEST:
    //         case LOAD_USER_POSTS_REQUEST: {
    //             return {
    //                 ...state,
    //                 mainPosts: action.lastId === 0 ? [] : state.mainPosts,
    //                 hasMorePost: action.lastId ? state.hasMorePost : true, //처음 볼 땐 스크롤을 활성화, 더 불러오는 중이면 기존 스크롤 유지
    //             };
    //         }
    //         case LOAD_MAIN_POSTS_SUCCESS:
    //         case LOAD_HASHTAG_POSTS_SUCCESS:
    //         case LOAD_USER_POSTS_SUCCESS: {
    //             return {
    //                 ...state,
    //                 mainPosts: state.mainPosts.concat(action.data),
    //                 hasMorePost: action.data.length === 10,
    //             };
    //         }
    //         case LOAD_MAIN_POSTS_FAILURE:
    //         case LOAD_HASHTAG_POSTS_FAILURE:
    //         case LOAD_USER_POSTS_FAILURE: {
    //             return {
    //                 ...state,
    //             };
    //         }
    //         case ADD_COMMENT_REQUEST: {
    //             return {
    //                 ...state,
    //                 isAddingComment: true,
    //                 addCommentErrorReason: '',
    //                 commentAdded: false,
    //
    //             };
    //         }
    //         case ADD_COMMENT_SUCCESS: {
    //             //불변성 유지
    //             // const postIndex = state.mainPosts.findIndex(v => v.id=== action.data.postId);
    //             // const post = state.mainPosts[postIndex];
    //             // const Comments = [...post.Comments, action.data.comment];
    //             // const mainPosts = [...state.mainPosts];
    //             // mainPosts[postIndex] = {...post, Comments};
    //             // return {
    //             //     ...state,
    //             //     isAddingComment: false,
    //             //     mainPosts,
    //             //     commentAdded: true,
    //             // };
    //
    //             //immer 적용
    //
    //             const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
    //             draft.mainPosts[postIndex].Comments.push(action.data.comment);
    //             draft.isAddingComment = false;
    //             draft.commentAdded = true;
    //             break;
    //         }
    //         case ADD_COMMENT_FAILURE: {
    //             return {
    //                 ...state,
    //                 isAddingComment: false,
    //                 addCommentErrorReason: action.error,
    //             };
    //         }
    //         case LOAD_COMMENTS_SUCCESS:{
    //             // const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
    //             // const post = state.mainPosts[postIndex];
    //             // const Comments = action.data.comments;
    //             // const mainPosts = [...state.mainPosts];
    //             // mainPosts[postIndex] = { ...post, Comments };
    //             // return {
    //             //     ...state,
    //             //     mainPosts,
    //             // };
    //             const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
    //             draft.mainPosts[postIndex].Comments = action.data.comments;
    //
    //         }
    //         case UPLOAD_IMAGES_REQUEST: {
    //             return {
    //                 ...state,
    //             };
    //         }
    //         case UPLOAD_IMAGES_SUCCESS: {
    //             return {
    //                 ...state,
    //                 imagePaths: [...state.imagePaths, ...action.data], //이미지 미리보기 경로
    //             };
    //         }
    //         case UPLOAD_IMAGES_FAILURE: {
    //             return {
    //                 ...state,
    //             };
    //         }
    //         case REMOVE_IMAGE: {
    //             return{
    //                 ...state,
    //                 imagePaths: state.imagePaths.filter((v, i) => i !== action.index),
    //             }
    //         }
    //         case LIKE_POST_REQUEST: {
    //             return {
    //                 ...state,
    //             };
    //         }
    //         case LIKE_POST_SUCCESS: {
    //             const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
    //             const post = state.mainPosts[postIndex];
    //             const Likers = [{id: action.data.userId}, ...post.Likers];
    //             const mainPosts = [...state.mainPosts];
    //             mainPosts[postIndex] = { ...post, Likers };
    //             return {
    //                 ...state,
    //                 mainPosts,
    //             };
    //         }
    //         case LIKE_POST_FAILURE: {
    //             return {
    //                 ...state,
    //             };
    //         }
    //         case UNLIKE_POST_REQUEST: {
    //             return {
    //                 ...state,
    //             };
    //         }
    //         case UNLIKE_POST_SUCCESS: {
    //             const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
    //             const post = state.mainPosts[postIndex];
    //             const Likers = post.Likers.filter(v => v.id !== action.data.userId);
    //             const mainPosts = [...state.mainPosts];
    //             mainPosts[postIndex] = { ...post, Likers };
    //             return {
    //                 ...state,
    //                 mainPosts,
    //             };
    //         }
    //         case UNLIKE_POST_FAILURE: {
    //             return {
    //                 ...state,
    //             };
    //         }
    //         case REMOVE_POST_REQUEST: {
    //             return {
    //                 ...state,
    //             };
    //         }
    //         case REMOVE_POST_SUCCESS: {
    //             return {
    //                 ...state,
    //                 mainPosts: state.mainPosts.filter(v => v.id !== action.data),
    //             };
    //         }
    //         case REMOVE_POST_FAILURE: {
    //             return {
    //                 ...state,
    //             };
    //         }
    //         default : {
    //             return{
    //                 ...state,
    //             }
    //         }
    //     };
    // });
    return produce(state, (draft) => {
        switch (action.type) {
            case UPLOAD_IMAGES_REQUEST: {
                break;
            }
            case UPLOAD_IMAGES_SUCCESS: {
                action.data.forEach((p) => {
                    draft.imagePaths.push(p);
                });
                break;
            }
            case UPLOAD_IMAGES_FAILURE: {
                break;
            }
            case REMOVE_IMAGE: {
                const index = draft.imagePaths.findIndex((v, i) => i === action.index);
                draft.imagePaths.splice(index, 1);
                break;
            }
            case ADD_POST_REQUEST: {
                draft.isAddingPost = true;
                draft.addingPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            case ADD_POST_SUCCESS: {
                draft.isAddingPost = false;
                draft.mainPosts.unshift(action.data);
                draft.postAdded = true;
                draft.imagePaths = [];
                break;
            }
            case ADD_POST_FAILURE: {
                draft.isAddingPost = false;
                draft.addPostErrorReason = action.error;
                break;
            }
            case ADD_COMMENT_REQUEST: {
                draft.isAddingComment = true;
                draft.addCommentErrorReason = '';
                draft.commentAdded = false;
                break;
            }
            case ADD_COMMENT_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Comments.push(action.data.comment);
                draft.isAddingComment = false;
                draft.commentAdded = true;
                break;
            }
            case ADD_COMMENT_FAILURE: {
                draft.isAddingComment = false;
                draft.addingPostErrorReason = action.error;
                break;
            }
            case LOAD_COMMENTS_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Comments = action.data.comments;
                break;
            }
            case LOAD_MAIN_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
            case LOAD_USER_POSTS_REQUEST: {
                draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
                draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
                break;
            }
            case LOAD_MAIN_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_USER_POSTS_SUCCESS: {
                action.data.forEach((d) => {
                    draft.mainPosts.push(d);
                });
                draft.hasMorePost = action.data.length === 10;
                break;
            }
            case LOAD_MAIN_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE: {
                break;
            }
            case LIKE_POST_REQUEST: {
                break;
            }
            case LIKE_POST_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
                break;
            }
            case LIKE_POST_FAILURE: {
                break;
            }
            case UNLIKE_POST_REQUEST: {
                break;
            }
            case UNLIKE_POST_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(v => v.id === action.data.userId);
                draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
                break;
            }
            case UNLIKE_POST_FAILURE: {
                break;
            }
            case RETWEET_REQUEST: {
                break;
            }
            case RETWEET_SUCCESS: {
                draft.mainPosts.unshift(action.data);
                break;
            }
            case RETWEET_FAILURE: {
                break;
            }
            case REMOVE_POST_REQUEST: {
                break;
            }
            case REMOVE_POST_SUCCESS: {
                const index = draft.mainPosts.findIndex(v => v.id === action.data);
                draft.mainPosts.splice(index, 1);
                break;
            }
            case REMOVE_POST_FAILURE: {
                break;
            }
            case LOAD_POST_SUCCESS: {
                draft.singlePost = action.data;
                break;
            }
            default: {
                break;
            }
        }
    });
};
//reducer와 initialState는 자주 쓰이므로 export 함
export default reducer;