import React, {useState} from "react";
import PropTypes from "prop-types";
import PostImages from "./PostImages";
import Slick from 'react-slick';
import {Icon} from "antd";
import styled from 'styled-components';

const Overlay = styled.div`
    position: 'fixed';
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

// & 자기 자신을 가리키는 태그
const Header = styled.header`
    height: 44px;
    background: white;
    position: 0;
    padding: 0;
    text-align: center;
    
    & h1{
        margin: 0;
        font-size: 17px;
        color: #333;
        line-height: 44px;
    }
`;

const H1 = styled.h1`

`;

const SlickWrapper = styled.div`
    height: calc(100% - 44px);
    background: #090909;
`;

const CloseBtn = styled(Icon)`
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
`

const Indicator = styled.div`
    text-align: center;
    & > div {
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #313131;
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 15px;
    }
`;

const ImageWrapper = styled.div`
    padding: 32px;
    text-align:center;
    & img{
        margin: 0 auto;
        max-height: 750px;
    }
`;

//Slick 안에 반복문을 풀어놓으면 얘네가 알아서 이미지 슬라이더가 됨
//React Slick 공홈에 cdn _app.js 에 넣어줘야함!
const ImagesZoom = ({images , onClose}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <div style={{ position: 'fixed', zIndex: 5000, top: 0, left: 0, right: 0, bottom: 0 }}>
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn type="close" onClick={onClose}/>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0}
                        afterChange={slide => setCurrentSlide(slide)}
                        infinite={false}
                        arrows
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => {
                            return (
                                <ImageWrapper >
                                    <img src={`http://localhost:8088/${v.src}`} />
                                </ImageWrapper>
                            );
                        })}
                    </Slick>
                    <Indicator style={{ textAlign: 'center' }}>
                        <div>
                            {currentSlide + 1} / {images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </div>
    );
};
ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;