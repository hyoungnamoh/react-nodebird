import React, { useState, useCallback, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {SIGN_UP_REQUEST} from "../reducers/user";
import Router from "next/router";

const Signup = () => {
    //redux
    const dispatch = useDispatch();
    const {isSigningUp, me} = useSelector(state => state.user);

    //custom hook
    const useInput = useCallback((initValue = null) => {
        const [value, setter] = useState(initValue);
        const handler = (e) => {
            setter(e.target.value);
        };
        return [value, handler];
    }, []);

    //사용할 state들
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');

    //로그인 시 회원가입 폼 초기화
    useEffect(() => {
        if(me){
            alert('로그인했으니 메인페이지로 이동합니다.')
            Router.push('/');
        }
    }, [me && me.id]);

    //비밀번호, 비밀번호 확인 일치 여부 확인
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [passwordCheck]);

    //체크박스 눌렀을때
    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, [term, termError]);


    //회원가입 버튼
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                userId: id,
                password,
                nickname: nick,
            }
        });
    }, [id, nick, password,passwordCheck, termError]);

    if(me) {
        return null;
    }
    return (
        <>
            <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value={nick} required onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>제로초 말을 잘 들을 것을 동의합니다.</Checkbox>
                    {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
                </div>
            </Form>
        </>
    );
};

export default Signup;