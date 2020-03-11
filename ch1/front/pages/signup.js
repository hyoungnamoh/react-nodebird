import React,{useState} from 'react';
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import {Form, Input, Checkbox, Button} from 'antd';


const Signup = () => {

    const [id,setId] = useState('');
    const [nick,setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submit!');
    }
    const onChangeId = (e) => {
        setId(e.target.value);
    }
    const onChangeNick = (e) => {
        setNick(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
    }
    const onChangeTerm = (e) => {
        setTerm(e.target.checked);
    }

    return(
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout>
                <Form onSubmit={onSubmit} style={{padding: 10}}>
                    <div>
                        <label htmlFor="user-id">아이디</label>
                        <br/>
                        <Input name="user-id" value={id} required onChange={onChangeId}/>
                    </div>
                    <div>
                        <label htmlFor="user-nick">닉네임</label>
                        <br/>
                        <Input name="user-nick" value={nick} required onChange={onChangeNick}/>
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br/>
                        <Input name="user-password" value={password} required onChange={onChangePassword}/>
                    </div>
                    <div>
                        <label htmlFor="user-password-check">비밀번호 체크</label>
                        <br/>
                        <Input name="user-password-check" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                    </div>
                    <div>
                        <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
                            제로초 말을 잘 들을 것을 동의합니다.
                        </Checkbox>
                    </div>
                    <div>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
       </>
    );
};

export default Signup;