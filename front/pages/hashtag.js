import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_HASHTAG_POSTS_REQUEST} from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = ({tag}) => {
    const {mainPosts} = useSelector(state => state.post);
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