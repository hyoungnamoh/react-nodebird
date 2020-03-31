import React, {useState} from "react";
import PropTypes from "prop-types";
import Slick from 'react-slick';
import {CloseBtn, Header, ImageWrapper, Indicator, Overlay, SlickWrapper} from './ImageZoomStyle';



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