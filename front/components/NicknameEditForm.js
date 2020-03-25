import {Button, Form, Input} from "antd";
import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {EDIT_NICKNAME_REQUEST} from "../reducers/user";

const NicknameEditForm = () => {
    const dispatch = useDispatch();
    const {isEditingNickName, me} = useSelector(state => state.user);
    const [editedName, setEditedName] = useState('');

    const onChangeNickname = useCallback((e) => {
        setEditedName(e.target.value);
    }, []);

    const onEditNickname = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName,
        })
    }, [editedName]);
    return (
        <Form style={{marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}}>
            <Input addonBefore="닉네임" onChange={onChangeNickname} value={editedName || me && me.nickname}/>
            <Button type="primary" onClick={onEditNickname} loading={isEditingNickName}>수정</Button>
        </Form>
    )
}

export default NicknameEditForm;