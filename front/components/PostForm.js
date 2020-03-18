import {Button, Form, Input} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {ADD_POST_REQUEST} from "../reducers/post";

const PostForm = () => {
    //state
    const [text, setText] = useState('');
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, [text]);


    //redux
    const dispatch = useDispatch();
    const {imagePaths, isAddingPost, postAdded} = useSelector(state => state.post);

    //전송 후 게시글 폼 초기화
    useEffect(() => {
        setText('');
    }, [postAdded === true]);

    //게시글 올리기 버튼
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: ADD_POST_REQUEST,
            data:{
                text,
            }
        })
    }, [text]);

    return(
        <Form encType="multipart/form-data" loading={isAddingPost} onSubmit={onSubmitForm} style={{margin: '10px 0px 20px'}} encType={"multipart/form-data"}>
            <Input.TextArea maxLength={140} value={text} onChange={onChangeText} placeholder="어떤 신기한 일이 있었나요?"/>
            <div>
                <input type="file" multiple hidden/>
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{float: 'right'}} htmlType="submit" >짹쨱</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                        <div key={v} style={{display: 'inline-block'}}>
                            <img src={`http://localhost:3000/${v}`} style={{width:'100px'}} alt={v}/>
                            <div>
                                <Button>제거</Button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </Form>
    );
}

export default PostForm;