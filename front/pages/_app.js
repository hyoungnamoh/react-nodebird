import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PropTypes from "prop-types";

const NodeBird = ({Component}) => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </>
    );
}

NodeBird.propTypes ={
    Component: PropTypes.node//node: jsx에 들어갈 수 있는 모든 것(문자열, 컴포넌트, 태그 등등)
}
export default NodeBird;