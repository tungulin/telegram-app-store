import React, { FC } from 'react'
import { IInput } from '../IFields'
import { Input as InputAnt } from 'antd';
import { Controller } from 'react-hook-form';


const Input: FC<IInput> = ({ defaultValue, title, label, placeholder, control, style, required, error, antdProps }) => {
    return (
        <Controller
            defaultValue={defaultValue}
            control={control}
            name={label}
            render={({ field }): any => {
                return <InputAnt
                    {...field}
                    style={style}
                    status={error && 'error'}
                    placeholder={placeholder}
                    {...antdProps}
                />
            }}
        />
    )
}

export default Input