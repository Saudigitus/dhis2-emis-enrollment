import React, { useEffect } from 'react'
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

const usetStyles = makeStyles({
    tableContainer: {
        overflowX: 'auto'
    }
});

function Table() {
    const classes = usetStyles()
    const { columns } = useHeader()
    const { getData, loading, tableData } = useTableData()
    const { useQuery, urlParamiters } = useParams()
    const school = urlParamiters().school as unknown as string

    useEffect(() => {
        if (school !== null) {
            void getData()
        }
    }, [columns, useQuery()])

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
                        loading={false}
                        page={1}
                        rowsPerPage={10}
                        onRowsPerPageChange={() => { }}
                        onPageChange={() => { }}
                        totalPerPage={10}
                        totalPages={10}
                    />
                </WithBorder>
            </WithPadding>
        </Paper>
    )
}

export default Table
