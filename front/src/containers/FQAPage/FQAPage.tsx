import React, { FC, useEffect, useState } from 'react'
import { Typography, Layout, Card } from 'antd';
import { useParams } from 'react-router-dom';
import { getFQA } from 'API/main';

const { Content } = Layout;
const { Title, Text } = Typography;


const contentStyle: React.CSSProperties = {
    padding: "0  0 30px 0",
    minHeight: 'calc(100vh - 60px)',
    position: 'relative'
};


const imgStyle: React.CSSProperties = {
    objectFit: 'cover',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 220,
    width: '100%'
}

const cardStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    borderRadius: '25px 25px  0 0'
}

export const FQAPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [fqa, setFQA] = useState<{ image?: string, name: string, description: string } | undefined>()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => getFQA({ id }).then((data) => setFQA(data))

    return (
        <Content style={contentStyle}>
            {fqa && <>
                {fqa.image && <img style={imgStyle} src={fqa.image} />}
                <Card
                    style={cardStyle}
                    headStyle={{ fontSize: 25 }}
                    bodyStyle={{ lineHeight: 2 }}
                    title={fqa.name}
                >
                    <Text>{fqa.description}</Text>
                </Card>
            </>}
        </Content>
    )
}
