import React, {useEffect, useState} from "react";
import {
    TabBar,
    Tab
} from '@dhis2/ui'
import {
    BulkImportResponseStats,
    BulkImportResponseStatsState,
    type ProcessingRecords,
    ProcessingRecordsState,
    ProcessingStage
} from "../../schema/bulkImportSchema";
import {useRecoilValue} from "recoil";
import {SummaryTable} from "./SummaryContent";
import {PaginationState} from "../../types/bulkImport/Interfaces";
import {ImportSummaryTable} from "./DryRunAndImportSummary";
import Pagination from "../table/components/pagination/Pagination";

const SummaryDetails = (): React.ReactElement => {
    const processedRecords: ProcessingRecords = useRecoilValue<ProcessingRecords>(ProcessingRecordsState)
    const processingStage: string = useRecoilValue<string>(ProcessingStage)
    const bulkImportResponseStats: BulkImportResponseStats = useRecoilValue<BulkImportResponseStats>(BulkImportResponseStatsState)
    const [activeTab, setActiveTab] = useState("invalids")
    const [pagination, setPagination] = useState<PaginationState>({
        new: {page: 1, pageSize: 10},
        updates: {page: 1, pageSize: 10},
        conflicts: {page: 1, pageSize: 10},
        invalids: {page: 1, pageSize: 10}
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
    // const tabPageCount = Math.ceil(total / tabPageSize)
    const displayData = students.slice((currentPage - 1) * tabPageSize, currentPage * tabPageSize);
    const [showErrorsOrConflicts, setShowErrorsOrConflicts] = useState<boolean>(true)

    const tabClick = (tab: string) => {
        if (["invalids", "conflicts"].includes(tab)){
            setShowErrorsOrConflicts(true)
        } else {
            setShowErrorsOrConflicts(false)
        }
        setActiveTab(tab);
    };
    const onPageSizeChange = (pageSize: number) => {
        setPagination((prev) => ({
         ...prev,
            [activeTab]: {...prev[activeTab], pageSize: pageSize, page: 1}
        }));
    }
    // Calculate the slice of data to display for the current page
    // const displayData = students.slice((page - 1) * pageSize, page * pageSize);
    return (<>
        { (processingStage === 'template-processing') &&
            <>
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
                    onRowsPerPageChange={onPageSizeChange}
                    rowsPerPage={tabPageSize}
                    loading={false}
                    totalPerPage={displayData?.length}
                />}
            </>
        }
        {
            (["dry-run", "import", "completed"].includes(processingStage)) &&
            <>
                <ImportSummaryTable
                    status={bulkImportResponseStats.status}
                    validationReport={bulkImportResponseStats.validationReport}
                    stats={bulkImportResponseStats.stats}
                    bundleReport={bulkImportResponseStats.bundleReport}
                />
            </>
        }
    </>)
}

export default SummaryDetails;
