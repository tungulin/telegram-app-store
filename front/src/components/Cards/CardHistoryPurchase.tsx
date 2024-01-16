import { FC, useState } from 'react'
import { Typography, Card, Image, Space, Drawer, Alert } from 'antd';
import { ICardHistoryPurchase } from './ICards';
import { useTranslation } from 'react-i18next';

import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getPurchaseMeta } from 'API/user';

const { Title, Text } = Typography;
const { Meta } = Card;

export const CardHistoryPurchase: FC<ICardHistoryPurchase> = ({ id, images, price, metaType, name, status }) => {
    const { t } = useTranslation();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [metaData, setMetaData] = useState<{ login: string, password: string } | undefined>();

    const onToggleDrawer = () => setOpenDrawer(!openDrawer)

    const onClickMeta = () => {
        getPurchaseMeta({ id })
            .then(resp => {
                setMetaData(resp)
                setOpenDrawer(!openDrawer)
            })
    }

    const TitleCard: FC = () => {
        return <Space style={{ display: 'flex', textAlign: 'left', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 10 }}>{name}</Text>
            <ArrowRightIcon />
        </Space>
    }


    const DescriptionCard: FC = () => {
        return <Space style={{ display: 'flex', justifyContent: 'left', textAlign: 'left' }} direction='vertical'>
            <Text>Цена: {price}</Text>
            <Text>Тип продукта: {metaType}</Text>
        </Space>
    }

    console.log('metaData', metaData);

    const InfoDrawer: FC = () => {
        return <Drawer
            height={'50%'}
            onClose={onToggleDrawer}
            size='large'
            title='Данные продукта'
            open={openDrawer}
            placement='bottom'
        >
            {metaData && <Space direction='vertical' size='middle' style={{ width: '100%' }}>
                <Alert style={{ width: '100%' }} message="Ваши реквизиты для входа" type="info" showIcon />
                <Card bodyStyle={{ borderRadius: 10 }}>
                    <Title level={5}>Логин: {metaData.login}</Title>
                    <Title level={5}>Пароль: {metaData.password}</Title>
                </Card>
            </Space>}
        </Drawer>
    }

    return (
        <Card onClick={onClickMeta} bodyStyle={{ display: 'flex', padding: 10 }}>
            <Image preview={false} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 20 }} width={110} src={images[0]} />
            <Meta style={{ width: '100%', marginLeft: 20 }} title={<TitleCard />} description={<DescriptionCard />} />
            <InfoDrawer />
        </Card >
    )
}