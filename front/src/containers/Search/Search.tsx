import React, { FC, useEffect, useState } from 'react'
import { Layout, Typography, Space, List, Badge } from 'antd';

import { useTranslation } from 'react-i18next';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Fields from 'components/Fields';
import Emoji from 'components/Emoji/Emoji';
import { CardL } from 'components/Cards/CardL';
import { useGetProductsQuery } from 'store/api/productApi';
import { useSelector } from 'react-redux';

import { ICardL } from 'components/Cards/ICards';
import { ISlice } from 'store/slice/ISlice';

import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';

const { Content } = Layout;
const { Title, Text } = Typography;

const contentStyle: React.CSSProperties = {
    padding: "0 10px",
    minHeight: 'calc(100vh - 60px)'
}

export const Search: FC = () => {
    const { t } = useTranslation();
    const [offset, setOffset] = useState(0);
    const { filters } = useSelector((state: ISlice) => state.default);

    const { setFocus, control, formState: { errors } } = useForm({
        mode: "onSubmit",
        shouldUnregister: true,
    });
    const search = useWatch({ control, name: "search" })
    const { data: products = [], refetch } = useGetProductsQuery({ offset, filters: { search, ...filters } })

    const fetchMoreData = () => setOffset(offset + 10)

    useEffect(() => {
        setFocus('search')
    }, [])

    useEffect(() => {
        refetch()
    }, [search])

    return (
        <Content style={contentStyle}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Fields.input
                    label='search'
                    style={{ borderRadius: 20 }}
                    control={control}
                    placeholder={t('search.find') + '...'}
                    antdProps={{
                        prefix: <SearchIcon />
                    }}
                    error={errors.search}
                />
                <Space style={{ display: 'flex', justifyContent: 'right', padding: '0 14px' }}>
                    <Badge count={filters ? Object.keys(filters).length : 0} size='small'>
                        <Link to={'/filters'}><TuneIcon /></Link>
                    </Badge>
                </Space>
                {products.length === 0 && <div style={{ textAlign: 'center' }}>
                    <Emoji style={{ fontSize: 55, marginRight: 5 }} symbol='🥺' />
                    <Title level={2}>{t('search.noItems')}...</Title>
                </div>}
                {products.length !== 0 && <InfiniteScroll
                    dataLength={products.length}
                    loader={<></>}
                    next={fetchMoreData}
                    hasMore={products.length < 50}
                >
                    <List
                        dataSource={products}
                        grid={{ gutter: 10, xs: 2, sm: 3, md: 3, lg: 4, xl: 6 }}
                        renderItem={(item: ICardL) => (
                            <List.Item>
                                <CardL id={item.id} images={item.images} name={item.name} price={item.price} />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll >}
            </Space>
        </Content >
    )
}
