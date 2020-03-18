//유저 정보 store

const dummyUser = {
    nickname: '형남',
    Post: [],
    Following:[],
    Follower:[],
    signUpData:[],
}
export const initialState = { //초기값
    isLoggedIn: false, //로그인 여부
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

//팔로워, 팔로윙 리스트 불러오는 액션
export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

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

//실제 액션 부분, 액션의 이름, 같이 넣어줄 데이터
export const loginAction = {
    type: LOG_IN_REQUEST,
}

export const logoutAction = {
    type: LOG_OUT_REQUEST,
};
export const signUpAction = (data) => { //action에 넣을 데이터가 동적인 경우에는 함수로 action 구현
    return{
        type: SIGN_UP_REQUEST,
        data: data,
    };
};

//setState
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST : {
            return{
                //스프레드 문법, 새로운 객체 생성, 불변성
                ...state,
                loginData: action.data,
                isLoading: true,
            }
        }
        case LOG_IN_SUCCESS : {
            return{
                //스프레드 문법, 새로운 객체 생성, 불변성
                ...state,
                isLoggedIn: true,
                me: dummyUser,
                isLoading:false,
            }
        }
        case LOG_IN_FAILURE : {
            return{
                ...state,
                isLoggedIn: false,
                me: null,
            }
        }
        case SIGN_UP_REQUEST : {
            return{
                ...state,
                signUpData: action.data,
            }
        }
        case SIGN_UP_SUCCESS : {
            return{
                ...state,
                signUpData: action.data,
            }
        }
        case SIGN_UP_FAILURE : {
            return{
                ...state,
                signUpData: action.data,
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