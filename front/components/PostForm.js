import {Button, Form, Input} from "antd";
import React, {useCallback, useEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST} from "../reducers/post";

const PostForm = () => {
    //redux
    const dispatch = useDispatch();
    const {imagePaths, isAddingPost, postAdded} = useSelector(state => state.post);

    //state
    const [text, setText] = useState('');
    const imageInput = useRef(''); //이미지 input ref
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, [text]);


    //이미지 업로드 버튼 클릭
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    //실제로 이미지 업로드 했을 때
    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })
    }, []);

    //전송 후 게시글 폼 초기화
    useEffect(() => {
        setText('');
    }, [postAdded === true]);

    //게시글 올리기 버튼
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if(!text || !text.trim()){
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        imagePaths.forEach((i) => {
            formData.append('image', i);
        });
        formData.append('content', text);
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        })
    }, [text, imagePaths]);

    //함수호출부에 괄호가 붙어있으면 괄호 하나 더 넣어줘야함, 패턴임, 고차함수, 기존 함수를 확장
    const onRemoveImage = useCallback(index => () => {
        dispatch({
            type: REMOVE_IMAGE,
            index,
        })
    }, []);

    return(
        <Form encType="multipart/form-data" loading={isAddingPost} onSubmit={onSubmitForm} style={{margin: '10px 0px 20px'}} encType={"multipart/form-data"}>
            <Input.TextArea maxLength={140} value={text} onChange={onChangeText} placeholder="어떤 신기한 일이 있었나요?"/>
            <div>
                <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float: 'right'}} htmlType="submit" >짹쨱</Button>
            </div>
            <div>
                {imagePaths.map((v, i) => (
                        <div key={v} style={{display: 'inline-block'}}>
                            <img src={`http://localhost:8088/${v}`} style={{width:'100px'}} alt={v}/>
                            <div>
                                <Button onClick={onRemoveImage(i)}>제거</Button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </Form>
    );
}

export default PostForm;