import React, {useEffect} from 'react';
import Link from 'next/link';
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from 'antd';
import LoginForm from "./LoginForm";
import UserProfiles from "../components/UserProfiles"
import {useDispatch, useSelector} from "react-redux";
import {LOAD_USER_REQUEST} from "../reducers/user";
import Router from 'next/router';
const AppLayout = ({ children }) => {
    //사용자가 어느 페이지에서 접속할지 모르기 때문에 공통 레이아웃으로 뺌
    const { me } = useSelector(state => state.user);

    const onSearch = (value) => {
        Router.push({ pathname: '/hashtag', query:{tag: value} }, `hashtag/${value}`); //내부적 주소, 눈으로 보이는 주소
    }

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile" prefetch><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{verticalAlign: 'middle'}} onSearch={onSearch} />
                </Menu.Item>
            </Menu>

            {!me && <Link href="/signup"><a><Button>회원가입</Button></a></Link>}
            <Row gutter = {10}>
                <Col xs={24} md={6}>
                    {me
                        ? <UserProfiles/>
                        : <LoginForm/>
                    }
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href="https://www.zerocho.com" ><a target="_blank">Made by HyoungNam</a></Link>
                </Col>
            </Row>
        </div>
    );
};

export default AppLayout;