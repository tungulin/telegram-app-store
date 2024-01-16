import React, { FC, useEffect, useState } from 'react'
import { Layout, Typography, Space, Avatar, MenuProps, Dropdown, theme } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ProfileOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { UserOutlined } from '@ant-design/icons';

import { ISlice } from 'store/slice/ISlice';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
const { Title, Text, Link } = Typography;
const { useToken } = theme

const navbarStyle: React.CSSProperties = {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const navbarItemsStyle: React.CSSProperties = {
    display: 'flex',
    margin: 0,
    alignItems: 'center',
    textAlign: 'center'
}

export const Navbar: FC = () => {
    const user = useSelector((state: ISlice) => state.user.info);
    const location = useLocation();
    const [countBackHistory, setCountBackHistory] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { token } = useToken();

    const items: MenuProps['items'] = [
        {
            icon: <ProfileOutlinedIcon style={{ fontSize: 20 }} />,
            key: 'profile',
            label: t('navbar.profile')
        },
        {
            icon: <SettingsOutlinedIcon style={{ fontSize: 20 }} />,
            key: 'settings',
            label: t('navbar.settings')
        }
    ]

    const onClickBackButton = () => {
        setCountBackHistory((prevCount) => prevCount + 1)

        if (countBackHistory <= 3) navigate(-1)
        else {
            setCountBackHistory(0)
            navigate('/')
        }
    }

    return (
        <Content style={{ maxHeight: 60, padding: "0 10px" }}>
            <Space align='center' style={navbarStyle}>
                {location.pathname !== '/' && <Title level={5} style={{ ...navbarItemsStyle, width: 80 }} onClick={onClickBackButton}>
                    <ArrowBackIcon />
                </Title>}
                {location.pathname === '/' && <Title level={5} style={{ ...navbarItemsStyle, width: 80 }}  >
                    Store
                </Title>}
                <Dropdown overlayStyle={{ width: '200px' }} menu={{ items, onClick: (info) => navigate(info.key) }}>
                    <Avatar src={<UserOutlined style={{ color: token.colorText, fontSize: 20 }} />} />
                </Dropdown>
            </Space>
        </Content>
    )
}