import React, { FC, useState } from 'react'
import { Card, Space, Layout, Typography, Rate, Button, Drawer, QRCode, Avatar, Watermark } from 'antd';
import { useParams } from 'react-router-dom';

import { IItemPage } from '../IItemPage';
import { useTranslation } from 'react-i18next';

import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { setRating } from 'API/product';


const { Content } = Layout;
const { Title, Text } = Typography;


const supportButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: '100%'
};

const Information: FC<{ product: IItemPage }> = ({ product }) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const onToggleQR = () => {
        setOpenDrawer(!openDrawer)
    }

    const onSetRating = (score: number) => setRating({ productId: product.id, score })

    const QRDrawer = () => {
        return <Drawer
            height={'70%'}
            onClose={onToggleQR}
            size='large'
            title='QR-code  данного продукта'
            open={openDrawer}
            placement='bottom'
        >
            <Space direction='vertical' align='center' style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                <>
                    <Avatar size={80} src={product.images[0]} />
                    <Title level={2}>{product.name}</Title>
                </>
                <QRCode size={250} value={'http://localhost:3000/item/2'} />
            </Space>
        </Drawer>
    }

    return (<Space direction="vertical" style={{ display: 'flex' }}>
        <Card>
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title style={{ marginBottom: 0 }} level={4}>{t('itemPage.price')}: {product.price}₽</Title>
            </Space>
        </Card>
        <Card bodyStyle={{ padding: 0 }}>
            <Watermark zIndex={0} font={{ fontSize: 30, color: 'rgba(0, 0, 0, 0.5)', }} style={{ padding: 20, height: '100%' }} gap={[0, 0]} content='Soon'>
                <Space>
                    <Title style={{ marginBottom: 0 }} level={4}>{t('itemPage.rating')}: </Title>
                    <Rate disabled={true} value={3} style={{ display: 'flex', alignItems: 'end' }} />  <Text>3/5</Text>
                </Space>
            </Watermark>
        </Card>
        <Card bodyStyle={{ padding: 0 }}>
            <Watermark zIndex={0} font={{ fontSize: 30, color: 'rgba(0, 0, 0, 0.5)', }} style={{ padding: 20, height: '100%' }} gap={[0, 0]} content='Soon'>
                <Space>
                    <Button type='primary' style={supportButtonStyle}><SmartDisplayIcon /></Button>
                    <Button type='primary' style={supportButtonStyle}><QrCodeIcon /></Button>
                </Space>
            </Watermark>
        </Card>
        <QRDrawer />
    </Space >)
}

export default Information