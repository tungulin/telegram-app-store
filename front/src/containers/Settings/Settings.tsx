import React, { FC } from 'react'
import { Layout, Typography, MenuProps, Space, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Fields from 'components/Fields';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import i18 from 'libs/localization'


const { Content } = Layout;
const { Title, Text } = Typography;

const contentStyle: React.CSSProperties = {
    height: 'calc(100vh - 60px)',
    padding: "0 20px",
    position: 'relative'
}

const items: MenuProps['items'] = [
    {
        key: 'en',
        label: 'English',
    },
    {
        key: 'ru',
        label: 'Russia',
    }
]

export const Settings: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { setFocus, control, formState: { errors }, handleSubmit } = useForm<FieldValues>({
        mode: "onSubmit",
        shouldUnregister: true,
        defaultValues: {
            language: items.find(item => item?.key === localStorage.getItem('language')) || items[0]
        }
    });

    const onSubmit = (data: any) => {
        i18.changeLanguage(data.language.key)
        localStorage.setItem('language', data.language.key)
    }

    return (
        <Content style={contentStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Space direction='vertical' style={{ display: 'flex', marginBottom: 20 }}>
                    <Title level={3}>{t('settings.settings')}</Title>
                    <Fields.dropdown
                        control={control}
                        menu={{
                            items,
                            title: t('settings.language'),
                            label: 'language',
                            error: errors.language
                        }}
                    />
                    <Button htmlType="submit" style={{ position: 'absolute', bottom: 45, left: 20, right: 20 }} type='primary'>{t('settings.save')}</Button>
                </Space>
            </form>
            <Text style={{ marginTop: 50 }}>Version: {process.env.REACT_APP_VERSION}</Text>
        </Content >
    )
}
