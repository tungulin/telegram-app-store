import React, { FC } from 'react'
import { Layout, Typography, Input, Tabs } from 'antd';
import { useNavigate } from "react-router-dom";
import { FQA } from 'components/FQA/FQA';
import { Footer } from 'components/Footer/Footer';
import { Catalog } from './components/Catalog';
import { Hot } from './components/Hot';

import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

import type { TabsProps } from 'antd';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import GradeIcon from '@mui/icons-material/Grade';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { New } from './components/New';

const { Content } = Layout;
const { Title, Text } = Typography;

const contentStyle: React.CSSProperties = {
    padding: "0 10px",
    minHeight: "100vh"
};


export const Main: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <Text style={{ display: 'flex', alignItems: 'center' }}><DragIndicatorIcon style={{ fontSize: 18, marginRight: 5 }} />{t('main.catalog')}</Text>,
            children: <Catalog />,
        },
        {
            key: '2',
            label: <Text style={{ display: 'flex', alignItems: 'center' }}><WhatshotIcon style={{ fontSize: 18, marginRight: 5 }} />{t('main.hot')}</Text>,
            children: <Hot />,
        },
        {
            key: '3',
            label: <Text style={{ display: 'flex', alignItems: 'center' }}><GradeIcon style={{ fontSize: 18, marginRight: 5 }} />{t('main.new')}</Text>,
            children: <New />,
        }
    ];

    const onClickSearch = () => navigate('/search')

    return (
        <Content style={contentStyle}>
            <Input onClick={onClickSearch} prefix={<SearchIcon />} style={{ marginBottom: 30, borderRadius: 20 }} placeholder={t('search.find') + "..."} />
            <FQA />
            <Tabs defaultActiveKey="1" items={items} />
        </Content>
    )
}
