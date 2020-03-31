import React, {useCallback, useEffect, useState} from 'react';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import Head from 'next/head';
import {Button, Card, Checkbox, Form, Icon, Input, List} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    REMOVE_FOLLOWER_REQUEST,
    UNFOLLOW_USER_REQUEST
} from "../reducers/user";
import {LOAD_USER_POSTS_REQUEST} from "../reducers/post";
import PostCard from "../components/PostCard";

const Profile = () => {
    const dispatch = useDispatch();
    const {me, followerList, followingList, hasMoreFollower, hasMoreFollowing} = useSelector(state => state.user);
    const {mainPosts} = useSelector(state => state.post);



    //팔로잉 취소
    const onUnFollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId,
        });
    }, [me && me.id]);

    //내 팔로워 차단
    const onRemoveFollower = useCallback(userId => () => {
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: userId,
        });
    }, [me && me.id]);

    //팔로잉 더 보기
    const loadMoreFollowings = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            offset: followingList.length,
        })
    }, [followingList.length]);
    //팔로워 더 보기
    const loadMoreFollowers = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            offset: followerList.length,
        })
    }, [followerList.length]);
    return (
        <div>
            <NicknameEditForm/>
            <List
            style={{ marginBottom: '20px'}}
            grid={{gutter: 4, xs: 2, md: 3}}
            size="small"
            header={<div>팔로잉 목록</div>}
            loadMore={hasMoreFollowing && <Button style={{width: '100%'}} onClick={loadMoreFollowings}>더보기</Button>}
            bordered
            dataSource = {followingList}
            renderItem={item => (
                <List.Item style={{marginTop: '20px'}}>
                    <Card actions={[<Icon key="stop" type="stop" onClick={onUnFollow(item.id)}/>]}><Card.Meta description={item.nickname}/></Card>
                </List.Item>
            )}
        >
        </List>
            <List
                style={{ marginBottom: '20px'}}
                grid={{gutter: 4, xs: 2, md: 3}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={hasMoreFollower && <Button style={{width: '100%'}} onClick={loadMoreFollowers}>더보기</Button>}
                bordered
                dataSource = {followerList}
                renderItem={item => (
                    <List.Item style={{marginTop: '20px'}}>
                        <Card actions={[<Icon  key="stop" type="stop" onClick={onRemoveFollower(item.id)}/>]}><Card.Meta description={item.nickname}/></Card>
                    </List.Item>
                )}
            >
            </List>
            <div>
                {mainPosts.map( c => (
                    <PostCard key = {+c.createdAt} post = {c}/>
                ))}
            </div>
        </div>

    );
};

Profile.getInitialProps = async (context) => {
    const state = context.store.getState();
    /*
        app.js 보면 얘 실행 직전에 LOAD_USERS_REQUEST 가 실행되는데
        얘가 SUCCESS 되어야 me 가 생김 그런데 SUCCESS 가 얘네가 호출 다 끝나고 나서 쯤에 실행됨
     */
        context.store.dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            data: state.user.me && state.user.me.id,
        });
        context.store.dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            data: state.user.me && state.user.me.id,
        });
        context.store.dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: state.user.me && state.user.me.id,
        });
};

export default Profile;