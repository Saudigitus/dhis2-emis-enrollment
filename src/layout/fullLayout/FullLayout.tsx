import React, { useEffect } from 'react'
import style from "../Layout.module.css"
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { LayoutProps } from '../../types/layout/LayoutProps';
import { InfoPage, MainHeader, SideBar } from '../../components'
import { useGetInitialValues, useGetProgramConfig, useParams } from '../../hooks';
import { getDataStoreKeys } from '../../utils/commons/dataStore/getDataStoreKeys';

export default function FullLayout(props: LayoutProps) {
    useGetInitialValues()
    const { children } = props;
    const { urlParamiters, add } = useParams()
    const { academicYear, school } = urlParamiters()
    const { isSetSectionType } = useGetInitialValues()
    const { loading } = useGetProgramConfig();
    const { currentAcademicYear } = getDataStoreKeys()

    useEffect(() => {
        if ((academicYear === null || academicYear === undefined) || (typeof academicYear === "string" && academicYear?.length === 0)) {
            add("academicYear", currentAcademicYear)
        }
    }, [academicYear])


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
                <main className={style.MainContentContainer}>
                    {
                        (school === null || school === undefined) ? <InfoPage /> : children
                    }
                </main>
            </div>
        </div>
    )
}
