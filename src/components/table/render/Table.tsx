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
import { useRecoilValue } from 'recoil';
import { HeaderFieldsState } from '../../../schema/headersSchema';

const usetStyles = makeStyles({
    tableContainer: {
        overflowX: 'auto'
    }
});

type Order = 'asc' | 'desc';

let order: Order = 'asc';
let orderBy: string = 'createdAt';

function Table() {
    const classes = usetStyles()
    const { columns } = useHeader()
    const { getData, loading, tableData } = useTableData()
    const { useQuery, urlParamiters } = useParams()
    const school = urlParamiters().school as unknown as string
    const headerFieldsState = useRecoilValue(HeaderFieldsState)
    const [page, setpage] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const [Order, setOrder] = useState<Order>('asc')
    const [OrderBy, setOrderBy] = useState<string>("createdAt")

    useEffect(() => {
        if (school !== null) {
            void getData(page, pageSize, order, orderBy)
        }
    }, [columns, useQuery(), headerFieldsState, page, pageSize, order, orderBy])

    const onPageChange = (newPage: number) => {
        setpage(newPage)
    }

    const onRowsPerPageChange = (event: any) => {
        setpageSize(parseInt(event.value, 10))
        setpage(1)
    }

    const handleRequestSort = (event: any, property: any) => {
        // TODO: Must resolve this bug
        const isAsc = orderBy === property && order === 'asc';
        order = (isAsc ? 'desc' : 'asc');
        orderBy = (property);
        setOrder(order)
        setOrderBy(orderBy)
    };

    const createSortHandler = (property: any) => (event: any) => {
        handleRequestSort(event, property);
    };

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
                                    createSortHandler={createSortHandler}
                                    order={Order}
                                    orderBy={OrderBy}
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
