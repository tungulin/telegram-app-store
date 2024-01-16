import { FC } from "react";
import { Layout, Typography } from 'antd';
import { AlertOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: "calc(100vh - 140px)",
    lineHeight: '120px',
};

export const PageNotFound: FC = () => {
    return (
        <Layout style={contentStyle}>
            <Title>
                <AlertOutlined style={{ marginRight: 20 }} />
                Page not found
            </Title>
        </Layout>
    );
}
