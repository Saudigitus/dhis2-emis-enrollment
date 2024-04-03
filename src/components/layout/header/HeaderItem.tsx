import React, {useState} from 'react'
import classNames from 'classnames'
import {useRecoilState} from 'recoil'
import style from "./mainHeader.module.css"
import {SimpleSearch} from '../../search'
import {DropdownButton, FlyoutMenu} from "@dhis2/ui"
import HeaderResetItemValue from './HeaderResetItemValue'
import info from "../../../assets/images/headbar/info.svg"
import {type HeadBarTypes} from '../../../types/headBar/HeadBarTypes'
import {OuQueryString} from '../../../schema/headerSearchInputSchema'
import {componentMapping} from '../../../utils/commons/componentMapping'
import {useDataElementsParamMapping, useParams} from '../../../hooks'
import {getSelectedKey} from '../../../utils/commons/dataStore/getSelectedKey'

export default function HeaderItem(props: HeadBarTypes): React.ReactElement {
    const {
        label,
        value,
        placeholder,
        component,
        dataElementId,
        id,
        selected,
        disabled
    } = props;
    const {remove} = useParams()
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const Component = (component != null) ? componentMapping[component] : null;
    const paramsMapping = useDataElementsParamMapping()
    const [, setStringQuery] = useRecoilState(OuQueryString);
    const {getDataStoreData} = getSelectedKey()

    const onToggle = () => {
        setStringQuery(undefined)
        setOpenDropDown(!openDropDown)
    }

    const onReset = () => {
        if (dataElementId) {
            remove(paramsMapping[dataElementId as unknown as keyof typeof paramsMapping])
        } else if (id === "c540ac7c") {
            remove("school");
            remove("schoolName");
            remove("class");
            remove("grade");
        }
    }

    return (
        <DropdownButton
            disabled={disabled}
            open={openDropDown}
            onClick={onToggle}
            className={classNames(style.HeaderItemContainer, style[id])}
            component={
                < FlyoutMenu>
                    <SimpleSearch id={id} placeholder={placeholder}>
                        {(Component != null) && <Component dataElementId={dataElementId} onToggle={onToggle}/>}
                    </SimpleSearch>
                </FlyoutMenu>
            }
        >
            <h5>{label} <span>{value}</span></h5>
            {((selected === true) && dataElementId !== getDataStoreData?.registration?.academicYear) ?
                <HeaderResetItemValue onReset={onReset}/> : null}
            <img src={info}/>
        </DropdownButton>
    )
}
