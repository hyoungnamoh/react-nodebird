import React, {useEffect} from 'react';
import {Button, Card, Form, Input, Icon, Avatar } from "antd";
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from "react-redux";
import {LOG_IN, loginAction, logoutAction} from '../reducers/user';


const Home = () => {
    //setState 같은 친구
    const dispatch = useDispatch();
    //useState 같은 친구
    const user = useSelector(state => state.user); //전체 state에서 user를 가져옴,
    const isLoggedIn = useSelector(state => state.user.isLoggedIn); //전체 state에서 user를 가져옴,

    const {mainPosts} = useSelector(state => state.post); //잘게 쪼개서 쓰는게 좋음
    useEffect(() => {
        // dispatch(loginAction);
    }, []);
    return (
        <div>
            {
                user ? <div>로그인 했습니다. {user.nickname}</div> : <div>로그아웃 했습니다.</div>
            }
            {isLoggedIn && <PostForm/>}
            {mainPosts.map((c) => {
                return (
                    <PostCard key={c} post={c}/>
                )
            })}
        </div>
    );
};

export default Home;