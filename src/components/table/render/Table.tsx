import React from 'react'
import { HeaderFilters, Pagination, TableComponent } from '../components'
import RenderHeader from './RenderHeader'
import RenderRows from './RenderRows'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import WithBorder from '../../template/WithBorder';
import WithPadding from '../../template/WithPadding';
import WorkingLits from '../components/filters/workingList/WorkingLits';
import { useHeader } from '../../../hooks/tableHeader/useHeader';

const usetStyles = makeStyles({
    tableContainer: {
        overflowX: 'auto'
    }
});

function Table() {
    const classes = usetStyles()
    const { columns } = useHeader()

    return (
        <Paper>
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
                                    rowsData={[
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree ", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                    ]}
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
