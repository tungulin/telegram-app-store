import React, { FC, useEffect, useState } from 'react'
import { Layout, Typography, Tabs, Card, Avatar, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// import bridge from "@vkontakte/vk-bridge";

import type { TabsProps } from 'antd';
import { History } from './components/History';

import { ISlice } from 'store/slice/ISlice';

const { Content } = Layout;
const { Title, Text, Link } = Typography;
const { Meta } = Card;

const contentStyle: React.CSSProperties = {
    minHeight: 'calc(100vh - 60px)',
    textAlign: 'center',
    padding: "0 10px"
}


export const Profile: FC = () => {
    const user = useSelector((state: ISlice) => state.user.info);
    const { brandInfo } = useSelector((state: ISlice) => state.default);
    const { t } = useTranslation();
    const [vkCall, setVkCall] = useState<string | undefined>()

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'История покупок',
            children: <History />,
        }
    ];

    useEffect(() => {
    }, [])


    if (!user && !brandInfo) return <></>

    return (
        user && brandInfo && <Content style={contentStyle}>
            <Space direction='vertical' style={{ width: '100%' }}>
                <Card bodyStyle={{ display: 'flex' }}>
                    {user.avatar && <Avatar src={user.avatar} style={{ marginRight: 10 }} />}
                    <Title style={{ margin: 0 }} level={4}>{user.firstName} {user.lastName} </Title>
                </Card>
            </Space>
            <Tabs defaultActiveKey="1" items={items} />
        </Content >
    )
}
