import { ThemeConfig } from "antd";
// const tg = window.Telegram.WebApp

export const config: (appearance: string) => ThemeConfig = (appearance) => {

    return {
        token: {
            // colorPrimary: tg.themeParams.button_color,
            // colorBgBase: tg.themeParams.secondary_bg_color,
            // colorBgContainer: tg.themeParams.bg_color,
            // colorText: tg.themeParams.text_color,
            // colorLink: tg.themeParams.link_color,
            fontSize: 14
        },
        components: {
            Input: {
                controlHeight: 50,
                colorTextPlaceholder: '#bbb',
            },
            Card: {
                borderRadiusLG: 20,
                paddingLG: 20,
                lineType: 'none',
                // colorTextDescription: tg.themeParams.text_color
            },
            Collapse: {
                borderRadiusLG: 20,
                lineType: 'none',
                // headerBg: tg.themeParams.secondary_bg_color,
                lineHeight: 1.8,
            },
            Checkbox: {
                lineType: 'none'
            },
            Dropdown: {
                controlHeight: 50,
                borderRadiusLG: 15
            },
            Button: {
                controlHeight: 50,
                borderRadius: 15,
                // colorBgContainer: tg.themeParams.button_color,
                // colorText: tg.themeParams.button_text_color,
                primaryShadow: '',
            },
            Divider: {
                // colorText: tg.themeParams.text_color,
                // colorSplit: tg.themeParams.text_color
            },
            Rate: {
                // starColor: tg.themeParams.button_color,
            },
            Alert: {
                borderRadiusLG: 10,
                // colorInfoBg: tg.themeParams.button_color,
                // colorInfoBorder: tg.themeParams.button_color,
            },
        }
    }
}