import React, { FC } from 'react'
import { Typography, Card, Button } from 'antd';
import { ICardL } from './ICards';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const { Text } = Typography;
const { Meta } = Card;

const imgCardStyle: React.CSSProperties = {
    objectFit: 'cover',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    position: 'absolute'
}


const imgNotFoundStyle: React.CSSProperties = {
    width: '100%',
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30
}


export const CardL: FC<ICardL> = ({ id, images, name, price, isHot }) => {
    const { t } = useTranslation();

    const ImageNotFound: FC = () => {
        return <div style={imgNotFoundStyle}>
            <InsertPhotoIcon />
        </div>
    }

    return (
        <Link to={'/item/' + id}>
            <Card
                cover={<div style={{ height: 120, position: 'relative' }}>{images.length ? <img style={imgCardStyle} src={images[0]} alt={name} /> : <ImageNotFound />}</div>}
                bodyStyle={{ padding: 10 }}
            >
                <Meta
                    title={name}
                    description={<Text>{price}₽</Text>}
                />
                <Button style={{ marginTop: 20, width: '100%' }}>{t('cardL.buy')}</Button>
            </Card >
        </Link >

    )
}