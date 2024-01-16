import React, { FC, useState } from 'react'
import { List, Space, Typography, theme } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IItemCatalog } from './IMain';
import { CardL } from 'components/Cards/CardL';

import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { ICardL } from '@/components/Cards/ICards';
import { useGetProductsQuery } from 'store/api/productApi';

const { Title, Text } = Typography;
const { useToken } = theme;

export const New: FC = () => {
    const { t } = useTranslation();
    const { token } = useToken();
    const [offset, setOffset] = useState(0);
    const { data: products = [], isLoading } = useGetProductsQuery({ offset })

    const fetchMoreData = () => setOffset(offset + 10)

    return (<>
        <Space align='center' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
            <Title style={{ margin: 0 }} level={3}>{t('main.new')}</Title>
            <Space>
                <Link style={{ color: token.colorText }} to={'/search'}><SearchIcon /></Link>
                <Link style={{ color: token.colorText }} to={'/filters'}><TuneIcon /></Link>
            </Space>
        </Space>
    </>
    )
}
