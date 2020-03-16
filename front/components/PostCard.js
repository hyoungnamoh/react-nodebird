import {Button, Form, Input, Card, Icon, Avatar} from "antd";
import React from "react";
import PropTypes from 'prop-types';
const PostCard = ({post}) => {
    return (
        <Card
            key={+post.createdAt}
            cover={post.img && <img alt="example" src={post.img}/>}
            actions={[
                <Icon type="retweet" key= "retweet"/>,
                <Icon type="heart" key= "heart"/>,
                <Icon type="message" key= "message"/>,
                <Icon type="ellipsis" key= "ellipsis"/>,
            ]}
            extra={<Button>팔로우</Button>}
        >
            <Card.Meta
                avatar={<Avatar >{post.User.nickName[0]}</Avatar>}
                title={post.User.nickName}
                description={post.content}
            />
        </Card>
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
