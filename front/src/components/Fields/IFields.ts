import { DropDownProps, InputProps, DropdownProps, MenuProps, CheckboxProps } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import {
    FieldValues,
    FieldError,
    FieldErrors,
    UseFormRegister,
    Control,
} from "react-hook-form";


export interface IField {
    error: FieldError | FieldErrors | undefined
    defaultValue?: { value: string | number, name: string }
    label: string,
    placeholder: string
    title?: string,
    subTitle?: string,
    style?: React.CSSProperties,
    required?: boolean,
}

export interface IDropdownField {
    items: ItemType[]
    label: string,
    error: FieldError | FieldErrors | undefined
    style?: React.CSSProperties,
    defaultValue?: ItemType,
    title?: string,
    required?: boolean,
}


export interface ICheckboxField {
    value: string,
    label: string,
}


export interface IInput extends IField {
    control: Control<FieldValues>,
    antdProps?: InputProps
}

export interface IDropdown {
    control: Control<FieldValues>,
    menu: IDropdownField,
    antd?: DropDownProps,
    children?: React.ReactNode
}

export interface ICheckbox extends ICheckboxField {
    control: Control<FieldValues>,
    antdProps?: CheckboxProps
}


export interface ICheckboxGroup {
    label: string,
    options: ICheckboxField[],
    control: Control<FieldValues>,
    antdProps?: CheckboxProps
}