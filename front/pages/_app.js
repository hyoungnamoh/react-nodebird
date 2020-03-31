import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import {LOAD_USER_REQUEST} from "../reducers/user";
import axios from 'axios';
import Helmet from 'react-helmet';
import {Container} from "next/app";

//리액트 컴포넌트들의 중앙통제실, 리덕스 스테이트들을 제공

//_app.js -> layout
//store = redux state, action, reducer 가 합쳐진 것
//store 를 자식 컴포넌트들한테 store 를 물려줌으로 써 모든 컴포넌트들이 state에 접근할 수 있게됨
const NodeBird = ({Component, store, pageProps }) => { //pageProps 받은걸
    return (
        <Container>
            <Provider store={store}>
                <Helmet
                    title="NodeBird"
                    htmlAttributes={{ lang: 'ko' }}
                    meta={[{
                        charset: 'UTF-8',
                    }, {
                        name: 'viewport',
                        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
                    }, {
                        'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
                    }, {
                        name: 'description', content: '제로초의 NodeBird SNS',
                    }, {
                        name: 'og:title', content: 'NodeBird',
                    }, {
                        name: 'og:description', content: '제로초의 NodeBird SNS',
                    }, {
                        property: 'og:type', content: 'website',
                    }]}
                    link={[{
                        rel: 'shortcut icon', href: '/favicon.ico',
                    }, {
                        rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
                    }, {
                        rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
                    }, {
                        rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
                    }]}
                />
                <AppLayout>
                    <Component{...pageProps}/> {/*페이지들, 여기로 pageProps 넘겨줌*/}
                </AppLayout>
            </Provider>
        </Container>
    );
}

NodeBird.PropTypes ={
    Component: PropTypes.node,//node: jsx에 들어갈 수 있는 모든 것(문자열, 컴포넌트, 태그 등등)
    store: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
    //필요에 따라 여기서 store 커스터마이징
}
/*
Hashtag.getInitialProps = async (constex) => {
여기서 Hashtag 가 context에 Component가 됨
그리고 그 안에 있는 getInitialProps를 실행하면 Hashtag에  getInitialProps가 실행 됨
 */
//동적 주소 데이터 받기
NodeBird.getInitialProps =async (context) => { //app(Next) 에서 context를 내려줌
    const { ctx, Component } = context;
    let pageProps = {};
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : ''; //server가 아닐 때 ctx.req.headers.cookie 얘가 undefined 임
    if(ctx.isServer && cookie){ //server일 경우만 실행 프론트일 경우 필요없음
        axios.defaults.headers.Cookie = cookie;
    }


    if(!state.user.me){
        ctx.store.dispatch({
            type: LOAD_USER_REQUEST,
        });
    }
    if(context.Component.getInitialProps){
        pageProps = await context.Component.getInitialProps(ctx) || {};
    }
    return {pageProps}; //Component 에 props로 넘겨줌 그 넘겨준걸
}

const configureStore = (initialState, options) => {
    //사가 미들웨어 생성
    const sagaMiddleware = createSagaMiddleware();

    //redux에 사가미들웨어를 연결 + 로깅하는 커스텀 미들웨어
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
        next(action);
    }]; //store에서 action state reducer 과정 사이에서 과정을 변경하거나 기능을 추가, 변경할 수 있음

    //redux의 기능을 향상시킴
    const enhancer = process.env.NODE_ENV === 'production' //실제 서비스면
        ? compose(applyMiddleware(...middlewares))
        : compose(applyMiddleware(...middlewares),
            //확장 프로그램을 깔게되면 window.__REDUX_DEVTOOLS_EXTENSION__() 생김, 기존 미들웨어들에 사용할 미들웨어를 추가해서 합성
            //배포할 땐 빼야함, 데이터가 어떻게 돌아가는지 전부 노출됨
            !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        );

    const store = createStore(reducer, initialState, enhancer); //

    //미들웨어에 root사가 연결
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}
export default withRedux(configureStore)(withReduxSaga(NodeBird));