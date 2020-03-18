import React from 'react';
import Link from 'next/link';
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from 'antd';
import LoginForm from "./LoginForm";
import UserProfiles from "../components/UserProfiles"
import {useSelector} from "react-redux";

const AppLayout = ({ children }) => {
    const {isLoggedIn} = useSelector(state => state.user);
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>

            {!isLoggedIn && <Link href="/signup"><a><Button>회원가입</Button></a></Link>}
            <Row gutter = {10}>
                <Col xs={24} md={6}>
                    {isLoggedIn
                        ? <UserProfiles/>
                        : <LoginForm/>
                    }
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href="https://www.zerocho.com"><a target="_blank">Made be Hyoungnam</a></Link>
                </Col>
            </Row>
        </div>
    );
};

export default AppLayout;