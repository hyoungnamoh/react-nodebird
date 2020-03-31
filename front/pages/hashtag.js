import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_HASHTAG_POSTS_REQUEST, LOAD_MAIN_POSTS_REQUEST} from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = ({tag}) => {
    const dispatch = useDispatch();
    const {mainPosts, hasMorePost} = useSelector(state => state.post);


    const onScroll = useCallback(() => {
        // console.log("현재 스크롤한 화면에 가장 윗부분에 위치: ", window.scrollY, " 제일 윗부분 부터 스크롤 제외한 부분까지의 높이:", document.documentElement.clientHeight, " 스크롤 가능한 제일 위에서 부터 제일 아래까지의 길이: ", document.documentElement.scrollHeight );
        console.log(window.scrollY + document.documentElement.clientHeight, document.documentElement.scrollHeight - 300);
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
            if(hasMorePost){ //더 불러올 게시글이 있으면
                console.log('infiniteScroll');
                dispatch({ //onscroll 이벤트는 적은 시간동안 많이 발생하기 때문에 이부분이 여러번 실행됨 saga 에서 처리 => takeLatest 를 throttle 로 변경
                    type: LOAD_HASHTAG_POSTS_REQUEST,
                    lastId: mainPosts[mainPosts.length - 1].id, //불러온 게시물 중 마지막 게시물의 아이디
                    data: tag,
                });
            }
        }
    }, [hasMorePost, mainPosts.length]);
    return (
        <div>
            {mainPosts.map( c => (
                <PostCard key = {+c.createdAt} post = {c}/>
            ))}
        </div>
    );
};
//사전작업 - _app.js 에서
// NodeBird.getInitialProps =async (constex) => {
//     const { ctx }  = constex;
//     await constex.Component.getInitialProps(ctx);
// }
//를 추가해줘야 함
// }

//server에서 보내준 tag, Next js 에서 제공하는 getInitialProps란 메서드를 사용해 값을 가져올 수 있음
Hashtag.getInitialProps = async (context) => {
    const tag = context.query.tag;
    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag,
    });
    return {
        tag
    }//여기서 context 가 _app.js 에서 보내준 {ctx}
}
/*
    getInitialProps
    Next 가 임의로 추가해준 라이프사이클
    가~~장 먼저 실행됨(ComponentDidMount 보다 더 빨리..!)
    프론트에서도 실행되고 서버에서도 실행됨
    얘가 서버쪽에서 미리 데이터를 불러와서 프론트를 렌더링 해줄 수 있게 됨
 */
export default Hashtag;