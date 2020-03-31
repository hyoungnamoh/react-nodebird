import React, {useCallback} from 'react';
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {LOG_OUT_REQUEST} from "../reducers/user";
import Link from "next/link";

const UserProfiles = () => {
    const {me} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST,
        });
    }, []);
    return (
        <Card
            actions={[
                <Link href="/profile" key="twit"><a><div >짹짹<br/>{me.Posts && me.Posts.length}</div></a></Link> ,
                <Link href="/profile" key="followings"><a><div >팔로잉<br/>{me.Posts && me.Followings.length}</div></a></Link>,
                <Link href="/profile" key="followers"><a><div >팔로워<br/>{me.Posts && me.Followers.length}</div></a></Link>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
};

export default UserProfiles;
