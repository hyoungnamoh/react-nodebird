import {Button, Form, Input} from "antd";
import React, {useState, useCallback} from "react";
import Link from "next/link";
import {useDispatch} from 'react-redux';
import {loginAction} from '../reducers/user';

const LoginForm = () => {
    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue);
        const handler = useCallback((e) => {
            setter(e.target.value);
        }, []);
        return [value, handler];
    }
    const dispatch = useDispatch();
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');


    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        //로그인 버튼 누르는 순간 로그인 액션 실행, dummyuser 실행
        dispatch(loginAction);
        console.log({
            id,password,
        });
    },[id, password]);

    return (
        <Form onSubmit={onSubmitForm} style={{padding: '10px'}}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} onChange={onChangeId} required/>
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="user-password" value={password} onChange={onChangePassword} type="password"/>
            </div>
            <div style={{marginTop: '10px'}}>
                <Button type="primary" onClick={onSubmitForm} htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    );
}

export default LoginForm;