import React, { FC } from 'react'
import { Card, Layout, Space, Typography } from 'antd';

const { Text } = Typography;
const { Footer: FooterAntd } = Layout;

export const Footer: FC = () => {
    return (
        <FooterAntd style={{ height: 70, padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>@tungulin</Text>
        </FooterAntd >
    )
}
