import {Button, Form, Input, Card, Icon, Avatar, List, Comment, Popover} from "antd";
import React, {useCallback, useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch} from "react-redux";
import {
    ADD_COMMENT_REQUEST,
    LIKE_POST_REQUEST,
    LOAD_COMMENTS_REQUEST,
    REMOVE_POST_REQUEST,
    UNLIKE_POST_REQUEST
} from "../reducers/post";
import Link from "next/link";
import PostImages from "./PostImages";
import {FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST} from "../reducers/user";

const PostCard = ({post}) => {
    //redux
    const {me} = useSelector(state => state.user);
    const { isCommentAdded, isAddingComment} = useSelector(state => state.post);
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
                content: commentText,
            },
        });
    }, [me && me.id, commentText]);

    //댓글 onChange
    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, [commentText]);

    //댓글창 열고 닫기
    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
        if(!commentFormOpened){
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: post.id,
            });
        }
    }, [commentFormOpened ]);

    //댓글 작성 후 작성 성공하면 댓글 폼 초기화
    useEffect(() => {
        setCommentText('');
    },[isCommentAdded === true]);

    const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

    const onToggleLike = useCallback(() => {
        if(!me) {
            return alert('로그인이 필요합니다.');
        }
        //Likers = 좋아요 누른사람들의 id가 들어있는 배열
        if(liked){ //좋아요를 누른 상태
            dispatch({
                type: UNLIKE_POST_REQUEST,
                data: post.id,
            })
        } else{ //좋아요를 누르지 않은 상태
            dispatch({
                type: LIKE_POST_REQUEST,
                data: post.id,
            });
        }
    }, [me && me.id, post && post.id, liked]);

    //팔로우 버튼 클릭
    const onFollow = useCallback(userId => () => {
        dispatch({
            type: FOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    //팔로우 취소 버튼 클릭
    const onUnfollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    //게시글 삭제
    const onRemovePost = useCallback(userId => () => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: userId,
        });
    }, []);

    return (
        <div>
            <Card
                key={+post.createdAt}
                cover={post.Images[0] && <PostImages images={post.Images}/>}
                actions={[
                    <Icon type="retweet" key= "retweets"/>,
                    <Icon type="heart" key= "heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor={'#eb2f96'} onClick={onToggleLike}/>,
                    <Icon type="message" key= "message" onClick={onToggleComment}/>,
                    <Popover
                        key = "ellipsis"
                        content={(
                            <Button.Group>
                                {me && post.UserId === me.id
                                ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger" onClick={onRemovePost(post.id)}>삭제</Button>

                                    </>
                                )
                                : <Button>신고</Button>}
                            </Button.Group>
                        )}
                        >
                        <Icon type="ellipsis"/>
                    </Popover>,
                ]}
                extra={ !me || post.User.id === me.id
                    ? null //로그인을 안했거나 내 게시글을 보고있을 경우
                    : me.Followings && me.Followings.find(v => v.id === post.User.id)
                        ? <Button onClick={onUnfollow(post.User.id)}>팔로우 취소</Button> //내 팔로잉 목록에 있을경우
                        : <Button onClick={onFollow(post.User.id)}>팔로우</Button> //팔로잉 하지않았을 경우
                }
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
