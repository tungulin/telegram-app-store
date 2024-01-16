import React, { FC, useEffect, useState } from 'react'
import { Layout, Typography, Empty, Space, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from 'API/user';

import { ISlice } from 'store/slice/ISlice';
import { CardHistoryPurchase } from 'components/Cards/CardHistoryPurchase';


const { Content } = Layout;
const { Title, Text } = Typography;

export const History: FC = () => {
    const user = useSelector((state: ISlice) => state.user.info);
    const [purchaseItems, setPurchaseItems] = useState<{ id: number, name: string, status: string, metaType: string, price: number, images: string[] }[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (user)
            fetchData()
    }, [user])

    const fetchData = () => {
        getPurchaseHistory({ brandId: process.env.REACT_APP_BRAND_ID })
            .then((resp) => setPurchaseItems(resp))
    }

    return (
        <Content>
            {purchaseItems.length === 0 && <Empty
                imageStyle={{ marginTop: 40, height: 60 }}
                description={
                    <span>
                        Нет покупок.<p />
                        <Link to={'/search'}>
                            Купите прямо сейчас
                        </Link>
                    </span>
                }
            />}
            {purchaseItems.length !== 0 && <Space direction='vertical' style={{ width: '100%' }}>
                {purchaseItems.map((purchaseItem, key) => {
                    return <CardHistoryPurchase key={key} {...purchaseItem} />
                })}
            </Space>}
        </Content >
    )
}
