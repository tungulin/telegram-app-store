import React, { FC, useRef } from 'react'
import { Card, Grid } from 'antd';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

require('swiper/css');
require('swiper/css/pagination');

const sliderStyle: React.CSSProperties = {
    padding: '0 5px'
}

const imgCardStyle: React.CSSProperties = {
    objectFit: 'cover',
    position: 'absolute',
    zIndex: 0,
    borderRadius: 20,
    height: '100%'
}

const Images: FC<{ images: string[], reviewVideo: string | undefined }> = ({ images, reviewVideo }) => {
    const windowWidth = useRef(window.innerWidth);

    return (
        <Swiper
            style={{ position: 'relative' }}
            slidesPerView={windowWidth.current < 700 ? 1 : 3}
            pagination={{ dynamicBullets: true }}
            modules={[Pagination]}
        >
            {images.map((image: string, key) => {
                return <SwiperSlide key={key} style={sliderStyle}>
                    <Card style={{ height: 250 }} cover={<img style={imgCardStyle} src={image} />} />
                </SwiperSlide>
            })}
            {/* todo: add */}
            {/* {reviewVideo && <SwiperSlide>
                <Card
                    style={{ height: 250 }}
                    cover={<iframe
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={imgCardStyle}
                        src={reviewVideo} />
                    } />
            </SwiperSlide>} */}
        </Swiper>
    )
}

export default Images
