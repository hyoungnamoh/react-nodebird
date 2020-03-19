import React, {useCallback} from 'react';
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {LOG_OUT_REQUEST} from "../reducers/user";

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
