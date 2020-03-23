import {Button, Form, Input, Card, Icon, Avatar, List, Comment} from "antd";
import React, {useCallback, useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch} from "react-redux";
import {ADD_COMMENT_REQUEST} from "../reducers/post";
import Link from "next/link";

const PostCard = ({post}) => {
    //redux
    const {me} = useSelector(state => state.user);
    const {isCommentAdded, isAddingComment} = useSelector(state => state.post);
    const dispatch = useDispatch();
    //state
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');

    //댓글 달기 버튼 클릭
    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if(!me){
            alert("로그인이 필요합니다");
            return;
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data:{
                postId: post.id,
            },
        });
    }, [me && me.id]);

    //댓글 onChange
    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, [commentText]);

    //댓글창 열고 닫기
    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
    }, [commentFormOpened ]);

    //댓글 작성 후 작성 성공하면 댓글 폼 초기화
    useEffect(() => {
        setCommentText('');
    },[isCommentAdded === true]);



    return (
        <div>
            <Card
                key={+post.createdAt}
                cover={post.img && <img alt="example" src={post.img}/>}
                actions={[
                    <Icon type="retweet" key= "retweets"/>,
                    <Icon type="heart" key= "heart"/>,
                    <Icon type="message" key= "message" onClick={onToggleComment}/>,
                    <Icon type="ellipsis" key= "ellipsis"/>,
                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta
                    avatar={<Link href={{ pathname: '/user', query: { id: post.User.id}}} as={`/user/${post.User.id}`} ><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                    title={post.User.nickname}
                    description={(
                        <div>
                            {post.content.split(/(#[^\s]+)/g).map((v) => {
                                if(v.match(/#[^\s]+/)){
                                    return (
                                        <Link href={{ pathname: '/hashtag', query: {tag: v.slice(1)}}} as={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                                    );
                                }
                                return v;
                            })}
                        </div>
                    )}
                />
            </Card>
            {commentFormOpened &&
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List
                        header={`${post.Comments ? post.Comments.length : 0}댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author = {item.User.nickname}
                                    avatar={<Link href={{ pathname: '/user', query: {id: post.User.id}}} as={`/user/${item.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            }
        </div>
    );
}

PostCard.PropTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard;
