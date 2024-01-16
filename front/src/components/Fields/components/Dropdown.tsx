import React, { FC } from 'react'
import { IDropdown } from '../IFields'
import { Controller } from 'react-hook-form';
import { Button, Dropdown as DropdownAnt, Space, Typography } from 'antd';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const { Text, Title } = Typography;

const Dropdown: FC<IDropdown> = ({ control, menu, antd, children }) => {

    return (
        <Controller
            control={control}
            defaultValue={menu.defaultValue}
            name={menu.label}
            render={({ field }): any => {
                return <>
                    <Title level={5}>{menu.title}</Title >
                    <DropdownAnt
                        {...antd}
                        trigger={['click']}
                        menu={{
                            items: menu.items,
                            onClick: (info: any) => {
                                const item = menu.items.find(item => item?.key === info.key)
                                field.onChange(item)
                            }
                        }}
                    >
                        <Button style={{ width: '100%', height: 50 }}>
                            <Space direction='horizontal' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text>{field.value.label}</Text>
                                <KeyboardArrowDownIcon />
                            </Space>
                        </Button>
                    </DropdownAnt >
                </>
            }}
        />
    )
}

export default Dropdown