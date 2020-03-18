import React, {useCallback} from 'react';
import Link from 'next/link';
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAction} from "../reducers/user";

const UserProfiles = () => {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch(logoutAction);
    }, []);
    return (
        <Card
            actions={[
                <div key={"twit"}>짹짹<br/>{user.Post}</div>,
                <div key={"following"}>팔로잉<br/>{user.Following}</div>,
                <div key={"follower"}>팔로워<br/>{user.Follower}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{user.nickname[0]}</Avatar>}
                title={user.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
};

export default UserProfiles;
