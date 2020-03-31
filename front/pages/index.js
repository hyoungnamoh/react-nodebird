import React, {useCallback, useEffect, useRef} from 'react';
import {Button, Card, Form, Input, Icon, Avatar } from "antd";
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from "react-redux";
import {LOG_IN, loginAction, logoutAction} from '../reducers/user';
import {LOAD_MAIN_POSTS_REQUEST} from "../reducers/post";


const Home = () => {
    //useState 같은 친구
    const {me} = useSelector(state => state.user); //전체 state에서 user를 가져옴,
    const {mainPosts, hasMorePost} = useSelector(state => state.post); //잘게 쪼개서 쓰는게 좋음
    const dispatch = useDispatch();
    const countRef = useRef([]);

    const onScroll = useCallback(() => {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 300){
            if(hasMorePost){ //더 불러올 게시글이 있으면
                const lastId = mainPosts[mainPosts.length - 1].id;
                //saga 에서 throttle 로 막아도 redux action 자체를 막을 순 없음 request 는 어쩔수없이 실행 됨
                if(!countRef.current.includes(lastId)){ //배열에 담아둔 lastId가 있는건 제외하고
                    dispatch({ //onscroll 이벤트는 적은 시간동안 많이 발생하기 때문에 이부분이 여러번 실행됨 saga 에서 처리 => takeLatest 를 throttle 로 변경
                        type: LOAD_MAIN_POSTS_REQUEST,
                        lastId, //불러온 게시물 중 마지막 게시물의 아이디
                    });
                }
                //한번 요청한 lastId를 배열에 담아 둠
                countRef.current.push(lastId);
            }
        }
    }, [hasMorePost, mainPosts.length]);
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length]); //onScroll 을 사용하는데 onScroll 안에선 mainPosts state 를 사용하기 때문에 dep s에 넣어줘야 함
    return (
        <div>
            {me && <PostForm/>}
            {mainPosts.map((c) => {
                return (
                    <PostCard key={c} post={c}/>
                )
            })}
        </div>
    );
};

Home.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
};

export default Home;