import { FC } from "react";
import Input from "./components/Input";
import Dropdown from "./components/Dropdown";

import { ICheckbox, ICheckboxGroup, IDropdown, IInput } from './IFields'
import Checkbox from "./components/Сheckbox";
import CheckboxGroup from "./components/CheckboxGroup";

interface IFields {
    input: FC<IInput>,
    dropdown: FC<IDropdown>,
    checkbox: FC<ICheckbox>,
    checkboxGroup: FC<ICheckboxGroup>
}

const Fields: IFields = {
    input: Input,
    dropdown: Dropdown,
    checkbox: Checkbox,
    checkboxGroup: CheckboxGroup
}

export default Fields