import React, {useEffect} from 'react';
import {Button, Card, Form, Input, Icon, Avatar } from "antd";
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from "react-redux";
import {LOG_IN, loginAction, logoutAction} from '../reducers/user';
import {LOAD_MAIN_POSTS_REQUEST} from "../reducers/post";


const Home = () => {
    //setState 같은 친구

    //useState 같은 친구
    const {me} = useSelector(state => state.user); //전체 state에서 user를 가져옴,
    const {mainPosts} = useSelector(state => state.post); //잘게 쪼개서 쓰는게 좋음
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
    console.log(Object.keys(context)); //store 등 여러 키값이 들어있음
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
};

export default Home;