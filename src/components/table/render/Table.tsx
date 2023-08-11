import React, { useEffect, useState } from 'react'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { HeaderFilters, Pagination, TableComponent } from '../components'
import RenderHeader from './RenderHeader'
import RenderRows from './RenderRows'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import WithBorder from '../../template/WithBorder';
import WithPadding from '../../template/WithPadding';
import WorkingLits from '../components/filters/workingList/WorkingLits';
import { useHeader } from '../../../hooks/tableHeader/useHeader';
import { useTableData } from '../../../hooks/tableData/useTableData';
import { useParams } from '../../../hooks/commons/useQueryParams';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HeaderFieldsState } from '../../../schema/headersSchema';
import { teiRefetch } from '../../../hooks/tei/usePostTei';

const usetStyles = makeStyles({
    tableContainer: {
        overflowX: 'auto'
    }
});

function Table() {
    const classes = usetStyles()
    const { columns } = useHeader()
    const { getData, loading, tableData } = useTableData()
    const { useQuery } = useParams()
    const headerFieldsState = useRecoilValue(HeaderFieldsState)
    const [page, setpage] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const [refetch] = useRecoilState(teiRefetch)

    useEffect(() => {
        void getData(page, pageSize)
    }, [columns, useQuery(), headerFieldsState, page, pageSize, refetch])

    const onPageChange = (newPage: number) => {
        setpage(newPage)
    }

    const onRowsPerPageChange = (event: any) => {
        setpageSize(parseInt(event.value, 10))
        setpage(1)
    }

    return (
        <Paper>
            {loading &&
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            }
            <WorkingLits />
            <WithBorder type='bottom' />
            <WithPadding >
                <WithBorder type='all' >
                    <HeaderFilters />
                    <div
                        className={classes.tableContainer}
                    >
                        <TableComponent>
                            <>
                                <RenderHeader
                                    createSortHandler={() => { }}
                                    order='asc'
                                    orderBy='desc'
                                    rowsHeader={columns}
                                />
                                <RenderRows
                                    headerData={columns}
                                    rowsData={tableData}
                                />
                            </>
                        </TableComponent>
                    </div>
                    <Pagination
                        loading={loading}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                        page={page}
                        rowsPerPage={pageSize}
                        totalPerPage={tableData?.length}
                    />
                </WithBorder>
            </WithPadding>
        </Paper>
    )
}

export default Table
