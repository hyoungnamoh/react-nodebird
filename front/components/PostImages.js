import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import ImagesZoom from "./ImagesZoom";

const PostImages = ({images}) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);
    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, [showImagesZoom]);
    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, [showImagesZoom]);

    //1개일때
    if(images.length === 1){
        return (
            <>
                <img src={`http://localhost:8088/${images[0].src}`} onClick={onZoom}/>
                {showImagesZoom && <ImagesZoom images={images} onClose ={onClose}/>}
            </>
        );
    }
    //2개일때
    if(images.length === 2){
        return (
            <div>
                <img src={`http://localhost:8088/${images[0].src}`} width="50%" onClick={onZoom}/>
                <img src={`http://localhost:8088/${images[1].src}`} width="50%" onClick={onZoom}/>
                {showImagesZoom && <ImagesZoom images={images} onClose ={onClose}/>}
            </div>
        );
    }

    //3개일때 더보기
    return (
        <div>
            <img src={`http://localhost:8088/${images[0].src}`} width="50%" onClick={onZoom}/>
            <div style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle'}}>
                <Icon type="plus"/>
                <br/>
                {images.length -1 }
                개의 사진 더보기
            </div>
            {showImagesZoom && <ImagesZoom images={images} onClose ={onClose}/>}
        </div>
    );
};
ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PostImages;