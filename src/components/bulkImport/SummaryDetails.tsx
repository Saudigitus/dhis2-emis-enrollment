import React, {useEffect, useState} from "react";
import {
    TabBar,
    Tab,
    Pagination
} from '@dhis2/ui'
import {type ProcessingRecords, ProcessingRecordsState} from "../../schema/bulkImportSchema";
import {useRecoilValue} from "recoil";
import {SummaryTable} from "./SummaryContent";
import {PaginationState} from "../../types/bulkImport/Interfaces";

const SummaryDetails = (): React.ReactElement => {
    const processedRecords: ProcessingRecords = useRecoilValue<ProcessingRecords>(ProcessingRecordsState)
    const [activeTab, setActiveTab] = useState("invalids")
    // const [page, setPage] = useState<number>(1)
    // const pageSize = 5
    const [pagination, setPagination] = useState<PaginationState>({
        new: {page: 1, pageSize: 5},
        updates: {page: 1, pageSize: 5},
        conflicts: {page: 1, pageSize: 5},
        invalids: {page: 1, pageSize: 5}
    });
    useEffect(() => {
        if (activeTab === "new") {
            setShowErrorsOrConflicts(false)
        }
    }, [activeTab]);

    const handlePageChange = (newPage: number) => {
        setPagination((prev) => ({
            ...prev,
            [activeTab]: {...prev[activeTab], page: newPage}
        }));
    };
    const getCurrentStudents = () => {
        switch (activeTab) {
            case 'new':
                return processedRecords.newRecords;
            case 'updates':
                return processedRecords.recordsToUpdate;
            case 'conflicts':
                return [];
            case 'invalids':
                return processedRecords.invalidRecords;
            default:
                return [];
        }
    };
    const students = getCurrentStudents();
    const total = students.length; // Total number of records for the current tab
    const currentPage = pagination[activeTab].page;
    const tabPageSize = pagination[activeTab].pageSize;
    const tabPageCount = Math.ceil(total / tabPageSize)
    const displayData = students.slice((currentPage - 1) * tabPageSize, currentPage * tabPageSize);
    const [showErrorsOrConflicts, setShowErrorsOrConflicts] = useState<boolean>(true)

    const tabClick = (tab: string) => {
        if (["invalids", "conflicts"].includes(tab)){
            setShowErrorsOrConflicts(true)
        } else {
            setShowErrorsOrConflicts(false)
        }
        setActiveTab(tab);
        console.log('>>>', tab, showErrorsOrConflicts)
    };
    const onPageSizeChange = (pageSize: number) => {
        setPagination((prev) => ({
         ...prev,
            [activeTab]: {...prev[activeTab], pageSize: pageSize}
        }));
    }
    // Calculate the slice of data to display for the current page
    // const displayData = students.slice((page - 1) * pageSize, page * pageSize);
    return (<>
        <TabBar>
            <Tab onClick={() => {
                tabClick("new")
            }} selected={activeTab === 'new'}>
                {processedRecords.newRecords.length}<br/>
                New Students
            </Tab>
            <Tab onClick={() => {
                tabClick("updates")
            }} selected={activeTab === 'updates'}>
                {processedRecords.recordsToUpdate.length}
                <br/>
                Potential Duplicates
            </Tab>
            <Tab onClick={() => {
                tabClick("invalids")
            }} selected={activeTab === 'invalids'}>
                {processedRecords.invalidRecords.length}<br/> Invalid Records
            </Tab>
        </TabBar>
        <br/>
        <SummaryTable
            displayData={displayData}
            mandatoryFields={processedRecords.mandatoryFields}
            showErrorsOrConflicts={showErrorsOrConflicts}
            activeTab={activeTab}
        />

        <br/>
        {total > 0 && <Pagination
            page={currentPage}
            onPageChange={handlePageChange}
            onPageSizeChange={onPageSizeChange}
            pageSize={tabPageSize}
            pageCount={tabPageCount}
            total={total}
        />}
    </>)
}

export default SummaryDetails;
