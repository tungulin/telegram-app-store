import React, { FC } from 'react'
import { Layout, Typography, Space, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import Fields from 'components/Fields';
import { useDispatch, useSelector } from 'react-redux';
import { ISlice } from 'store/slice/ISlice';
import { AppDispatch } from 'store';
import { setFilters } from 'store/slice/defaultSlice';
import { useTranslation } from 'react-i18next';
import { IFormFilter } from './IFilter';


const { Content } = Layout;
const { Title, Text } = Typography;

const contentStyle: React.CSSProperties = {
    padding: "0 10px",
    width: '100%',
    height: 'calc(100vh - 60px)'
};


export const Filters: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { categories } = useSelector((state: ISlice) => state.default);
    const { filters } = useSelector((state: ISlice) => state.default);
    const dispatch = useDispatch<AppDispatch>()

    const { setFocus, control, formState: { errors }, handleSubmit } = useForm<IFormFilter>({
        mode: "onSubmit",
        shouldUnregister: true,
        defaultValues: {
            category: filters.category?.map(item => item.value)
        }
    })



    const onSubmit = (data: any) => {
        let isEmptyFilters = false
        const category = categories.filter(category => data.category.includes(category.value))

        isEmptyFilters = category.length === 0

        if (!isEmptyFilters) dispatch(setFilters({ category }))
        else dispatch(setFilters({}))

        navigate('/search')
    }

    return (
        <Content style={contentStyle}>
            <Title style={{ marginBottom: 20 }} level={3}>{t('filters.filters')}</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Title style={{ marginBottom: 20 }} level={4}>{t('filters.categories')}</Title>
                <Space direction='vertical' style={{ width: '100%' }} >
                    <Fields.checkboxGroup label='category' control={control} options={categories} />
                </Space>
                <Button htmlType='submit' type='primary' style={{ padding: 0, position: 'absolute', bottom: 45, left: 20, right: 20 }}>
                    {t('filters.apply')}
                </Button>
            </form>
        </Content>
    )
}