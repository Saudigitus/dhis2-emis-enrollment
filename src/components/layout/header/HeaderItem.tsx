import React, { useState } from 'react'
import style from "./mainHeader.module.css"
import { DropdownButton, FlyoutMenu } from "@dhis2/ui"
import info from "../../../assets/images/headbar/info.svg"
import { SimpleSearch } from '../../search'
import { componentMapping } from '../../../utils/commons/componentMapping'
import classNames from 'classnames'
import { HeadBarTypes } from '../../../types/headBar/HeadBarTypes'
import { useRecoilState, useRecoilValue } from 'recoil'
import { OuQueryString } from '../../../schema/headerSearchInputSchema'
import { useDataElementsParamMapping, useParams } from '../../../hooks'
import HeaderResetItemValue from './HeaderResetItemValue'
import { getSelectedKey } from '../../../utils/commons/dataStore/getSelectedKey'
import { getDisplayName } from '../../../utils/table/rows/getDisplayNameByOption'
import { ProgramConfigState } from '../../../schema/programSchema'

export default function HeaderItem(props: HeadBarTypes): React.ReactElement {
    const { label, value, placeholder, component, dataElementId, id, selected } = props;
    const { remove } = useParams()
    const Component = (component != null) ? componentMapping[component] : null;
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const [, setStringQuery] = useRecoilState(OuQueryString);
    const { getDataStoreData } = getSelectedKey()
    const programConfigState = useRecoilValue(ProgramConfigState);


    const onToggle = () => {
        setStringQuery(undefined)
        setOpenDropDown(!openDropDown)
    }

    const paramsMapping = useDataElementsParamMapping()

    const onReset = () => {
        if (dataElementId)
            remove(paramsMapping[dataElementId as unknown as keyof typeof paramsMapping])
        else
            if (id === "c540ac7c") {
                remove("school");
                remove("schoolName");
            }
    }

    return (
        <DropdownButton
            open={openDropDown}
            onClick={onToggle}
            className={classNames(style.HeaderItemContainer, style[id])}
            component={
                < FlyoutMenu >
                    <SimpleSearch id={id} placeholder={placeholder}>
                        {(Component != null) && <Component dataElementId={dataElementId} onToggle={onToggle} />}
                    </SimpleSearch>
                </FlyoutMenu >
            }
        >
            <h5>{label} <span>{(dataElementId && programConfigState) ? getDisplayName({ metaData: dataElementId, value: value, program: programConfigState }) : value}</span></h5>
            {(selected && dataElementId !== getDataStoreData?.registration?.academicYear) ? <HeaderResetItemValue onReset={onReset} /> : null}
            <img src={info} />
        </DropdownButton >
    )
}
