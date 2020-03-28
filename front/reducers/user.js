//유저 정보 store
export const initialState = { //초기값
    isLoggingOut: false, //로구아웃 시도중
    isLoggingIn: false, //로그인 시도중
    logInErrorReason: '', //로그인 실패 사유
    isSignedUp: false, //회원가입 성공
    isSigningUp: false, //회원가입 시도중
    signUpErrorReason: '', //회원가입 실패 사유
    me: null,
    followerList: [], //팔로워 리스트
    followingList: [], //팔로잉 리스트
    userInfo: null, //남의 정보
    isEditingNickName: false,
};

//로그인하는 액션
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

//로그아웃하는 액션
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

//회원가입하는 액션
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

//사용자 정보 불러오는 액션
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

//팔로워 리스트 불러오는 액션
export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

//팔로잉 리스트 불러오는 액션
export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

//유저 팔로우하는 액션
export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

//유저 팔로우 취소하는 액션
export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

//내 팔로워 없애는 액션
export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

//
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';


//내 정보 수정
export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';





//setState
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST : {
            return{
                //스프레드 문법, 새로운 객체 생성, 불변성
                ...state,
                isLoggingIn: true,
                logInErrorReason: '',
            }
        }
        case LOG_IN_SUCCESS: {
            return {
                //스프레드 문법, 새로운 객체 생성, 불변성
                ...state,
                isLoggingIn: false,
                me: action.data,
                isLoading: false,
            };
        }

        case LOG_IN_FAILURE : {
            return{
                ...state,
                isLoggingIn: false,
                me: null,
                logInErrorReason: action.error,
            }
        }
        case SIGN_UP_REQUEST : {
            return{
                ...state,
                isSigningUp: true,
                signUpErrorReason:'',
            }
        }
        case SIGN_UP_SUCCESS : {
            return{
                ...state,
                isSigningUp: false,
                isSignedUp: true,
            }
        }
        case SIGN_UP_FAILURE : {
            return{
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error,
            }
        }
        case LOG_OUT_REQUEST : {
            return{
                ...state,
                isLoggingOut: true,
                logInErrorReason:'',
            }
        }
        case LOG_OUT_SUCCESS : {
            return{
                ...state,
                isLoggingOut: false,
                me: null
            }
        }
        case LOG_OUT_FAILURE : {
            return{
                ...state,
                isLoggingOut: false,
                logInErrorReason: action.error,
            }
        }
        case LOAD_USER_REQUEST : {
            return{
                ...state,
            }
        }
        case LOAD_USER_SUCCESS : {
            console.log('action.data', action.data);
            if(action.me){
                return{
                    ...state,
                    me: action.data,
                }
            }
            return{
                ...state,
                userInfo: action.data,
            }
        }
        case LOAD_USER_FAILURE : {
            return{
                ...state,
            }
        }
        case FOLLOW_USER_REQUEST : {
            return{
                ...state,
            }
        }
        case FOLLOW_USER_SUCCESS : {
            return{
                ...state,
                me: {
                    ...state.me,
                    Followings: [{id: action.data}, ...state.me.Followings] //팔로잉한 아이디들 배열
                }
            }
        }
        case FOLLOW_USER_FAILURE : {
            return{
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error,
            }
        }
        case UNFOLLOW_USER_REQUEST : {
            return{
                ...state,
            }
        }
        case UNFOLLOW_USER_SUCCESS : {
            return{
                ...state,
                me: {
                    ...state.me,
                    Followings: state.me.Followings.filter(v => v.id !== action.data),
                },
                followingList: state.followingList.filter(v => v.id !== action.data),
            }
        }
        case UNFOLLOW_USER_FAILURE : {
            return{
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error,
            }
        }
        case ADD_POST_TO_ME: {
            return {
                ...state,
                me: {
                    ...state.me,
                    Posts: [{ id: action.data }, ...state.me.Posts],
                },
            }
        }
        case LOAD_FOLLOWERS_REQUEST : {
            return{
                ...state,
            }
        }
        case LOAD_FOLLOWERS_SUCCESS : {
            return{
                ...state,
                //기존 팔로워리스트를 덮는게 아니라 추가하는 방식
                // followerList: state.followerList.concat(action.data),
                followerList: state.followerList.concat(action.data),
            }
        }
        case LOAD_FOLLOWERS_FAILURE : {
            return{
                ...state,
            }
        }
        case LOAD_FOLLOWINGS_REQUEST : {
            return{
                ...state,
            }
        }
        case LOAD_FOLLOWINGS_SUCCESS : {
            return{
                ...state,
                //기존 팔로워리스트를 덮는게 아니라 추가하는 방식
                // followingList: state.followingList.concat(action.data),
                followingList: state.followingList.concat(action.data),
            }
        }
        case LOAD_FOLLOWINGS_FAILURE : {
            return{
                ...state,
            }
        }
        case REMOVE_FOLLOWER_REQUEST : {
            return{
                ...state,
            }
        }
        case REMOVE_FOLLOWER_SUCCESS : {
            return{
                ...state,
                me: {
                    ...state.me,
                    Followers: state.me.Followers.filter(v => v.id !== action.data),
                },
                followerList: state.followerList.filter(v => v.id !== action.data),
            }
        }
        case REMOVE_FOLLOWER_FAILURE : {
            return{
                ...state,
            }
        }
        case EDIT_NICKNAME_REQUEST : {
            return{
                ...state,
                isEditingNickName: true,
            }
        }
        case EDIT_NICKNAME_SUCCESS : {
            return{
                ...state,
                isEditingNickName: false,
                me: {
                    ...state.me,
                    nickname: action.data,
                }
            }
        }
        case EDIT_NICKNAME_FAILURE : {
            return{
                ...state,
                isEditingNickName: false,
            }
        }
        case REMOVE_POST_OF_ME : {
            return{
                ...state,
                me: {
                    ...state.me,
                    Posts: state.me.Posts.filter(v => v.id !== action.data),
                }
            }
        }
        default : {
            return{
                ...state,
            }
        }
    }
};
//reducer와 initialState는 자주 쓰이므로 export 함
export default reducer;