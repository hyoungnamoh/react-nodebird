import React from 'react';
import Link from 'next/link';
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from 'antd';

const dummy= {
    nickname: "오형남",
    Post:[],
    Following:[],
    Follower:[],
    isLoggedIn: false,

}
const UserProfiles = () => {
    return (
        <Card
            actions={[
                <div key={"twit"}>짹짹<br/>{dummy.Post.length}</div>,
                <div key={"twit"}>팔로잉<br/>{dummy.Following.length}</div>,
                <div key={"twit"}>팔로워<br/>{dummy.Follower.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                title={dummy.nickname}
            />
        </Card>
    );
};

export default UserProfiles;
