import React from 'react'
import style from "../Layout.module.css"
import { MainHeader, SideBar } from '../../components'
import { useGetInitialValues } from '../../hooks/initialValues/useGetInitialValues'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { useGetProgramConfig } from '../../hooks/programConfig/useGetprogramConfig';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';
import { LayoutProps } from '../../types/layout/LayoutProps';

export default function FullLayout(props: LayoutProps) {
    useGetInitialValues()
    const { children } = props;
    const { isSetSectionType } = useGetInitialValues()
    const { getDataStoreData } = getSelectedKey()
    const { loading } = useGetProgramConfig(getDataStoreData.program);

    if (!isSetSectionType) {
        return (
            <CenteredContent>
                Cant load the app without section type
            </CenteredContent>
        )
    }

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    return (
        <div className={style.LayoutContainer}>
            <SideBar />
            <div className={style.FullLayoutContainer}>
                <MainHeader />
                <main className={style.MainContentContainer}>{children}</main>
            </div>
        </div>
    )
}
