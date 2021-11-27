import {Row, Col} from 'luban-view';
import * as React from "react";
import './style.less'

const GridDemo = () => {
    return (
        <>
            <Row justify='between'>
                <Col span={6}>grid-6</Col>
                <Col span={6}>grid-6</Col>
                <Col span={6}>grid-6</Col>
            </Row>

            <Row justify='between' gutter={8}>
                <Col span={14}>grid-6</Col>
                <Col span={6}>grid-6</Col>
                <Col span={6}>grid-6</Col>
            </Row>

            <Row justify='between'>
                <Col md={6}>grid-6</Col>
                <Col md={6}>grid-6</Col>
                <Col md={6}>grid-6</Col>
            </Row>
        </>

    )
}


export default GridDemo;
