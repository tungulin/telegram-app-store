import React, { FC, useEffect } from 'react'
import { Layout, Typography, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { gettingFQAs } from 'store/slice/defaultSlice';
import { AppDispatch } from 'store';
import { ISlice } from 'store/slice/ISlice';

require('swiper/css');


const { Content } = Layout;
const { Title, Text } = Typography;

export const FQA: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { FQAItems } = useSelector((state: ISlice) => state.default);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => dispatch(gettingFQAs({ brandId: process.env.REACT_APP_BRAND_ID }))

    //todo
    // if (FQAItems.length !== 0) return <></>

    return (
        <Content style={{ margin: "10px 0" }}>
            <Swiper slidesPerView={'auto'} spaceBetween={10}>
                {FQAItems.map((item, key) => {
                    return <SwiperSlide key={key} style={{ width: 100 }}>
                        <Link to={{ pathname: `/fqa/${item.id}` }}>
                            <Card style={{ height: 100, width: 100, }} bodyStyle={{ padding: 10 }} bordered={false}>
                                <Text style={{ fontSize: 10 }}>{item.name}</Text>
                            </Card>
                        </Link>
                    </SwiperSlide>
                })}
            </Swiper>
        </Content >
    )
}
