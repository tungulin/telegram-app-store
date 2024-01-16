import React, { FC } from 'react'
import { ICheckbox, ICheckboxGroup } from '../IFields'
import { Controller } from 'react-hook-form';
import { Checkbox as CheckboxAntd } from 'antd';


const CheckboxGroup: FC<ICheckboxGroup> = ({ control, options, label }) => {
    return (
        <Controller
            control={control}
            name={label}
            render={({ field }): any => {
                return <CheckboxAntd.Group options={options} {...field} style={{ width: '100%' }} />
            }}
        />
    )
}

export default CheckboxGroup