import React from 'react';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import Head from 'next/head';
import {Button, Card, Checkbox, Form, Icon, Input, List} from 'antd';

const Profile = () => {
    return (
        <div>
            <NicknameEditForm/>
            <List
            style={{ marginBottom: '20px'}}
            grid={{gutter: 4, xs: 2, md: 3}}
            size="small"
            header={<div>팔로워 목록</div>}
            loadMore={<Button style={{width: '100%'}}>더보기</Button>}
            bordered
            dataSource = {['오형남', '바보', '노드버드오피셜']}
            renderItem={item => (
                <List.Item style={{marginTop: '20px'}}>
                    <Card actions={[<Icon key="stop" type="stop"/>]}><Card.Meta description={item}/></Card>
                </List.Item>
            )}
        >
        </List>
            <List
                style={{ marginBottom: '20px'}}
                grid={{gutter: 4, xs: 2, md: 3}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{width: '100%'}}>더보기</Button>}
                bordered
                dataSource = {['오형남', '바보', '노드버드오피셜']}
                renderItem={item => (
                    <List.Item style={{marginTop: '20px'}}>
                        <Card actions={[<Icon  key="stop" type="stop"/>]}><Card.Meta description={item}/></Card>
                    </List.Item>
                )}
            >
            </List>
        </div>
    );
};

export default Profile;