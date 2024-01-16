import React, { FC } from 'react'
import { ICheckbox } from '../IFields'
import { Controller } from 'react-hook-form';
import { Checkbox as CheckboxAntd } from 'antd';


const Checkbox: FC<ICheckbox> = ({ control, value, label }) => {
    return (
        <Controller
            control={control}
            name={value}
            render={({ field }): any => {
                return <CheckboxAntd style={{ fontSize: 18 }} value={value} onChange={field.onChange}>{label}</CheckboxAntd>
            }}
        />
    )
}

export default Checkbox