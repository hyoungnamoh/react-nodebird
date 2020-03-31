import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Document, { Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/*
    검색봇이 돌아다니면서 데이터를 긁어갈 때 데이터가 들어있는 태그가 div 로 되어있으면
    div로 되어있는 태그가 너무 많기 때문에 검색봇이 잘 못긁어감
    이걸 helmet 을 통해 meta 태그로 넣어 줘 검색봇이 데이터를 잘 긁어가게끔 도와줌
 */
class MyDocument extends Document {
    static getInitialProps(context) {
        const page = context.renderPage((App) => (props) => <App {...props}/>);

        return { ...page,  helmet: Helmet.renderStatic()};
    }
    

    render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();

        return (
            <html {...htmlAttrs}>
            <head>
                {Object.values(helmet).map(el => el.toComponent())}
            </head>
            <body {...bodyAttrs}>
            <Main />
            <NextScript />
            </body>
            </html>
        );
    }
}

MyDocument.propTypes = {
    helmet: PropTypes.object.isRequired,
};

export default MyDocument;