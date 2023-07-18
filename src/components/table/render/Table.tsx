import React from 'react'
import { HeaderFilters, Pagination, TableComponent } from '../components'
import RenderHeader from './RenderHeader'
import RenderRows from './RenderRows'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import WithBorder from '../../template/WithBorder';
import WithPadding from '../../template/WithPadding';
import WorkingLits from '../components/filters/workingList/WorkingLits';

const usetStyles = makeStyles({
    tableContainer: {
        overflowX: 'auto'
    }
});

const headers = [
    {
        id: 'StudentNationalID',
        header: 'Student National ID',
        optionSets: []
    },
    {
        id: 'ClassOrder',
        header: 'Class Order',
        optionSets: []
    },
    {
        id: 'Firstname',
        header: 'First name',
        optionSets: []
    },
    {
        id: 'Surname',
        header: 'Surname',
        optionSets: []
    },
    {
        id: 'Dateofbirth',
        header: 'Date of birth',
        optionSets: []
    },
    {
        id: 'EnrolmentStatus',
        header: 'Enrolment Status',
        optionSets: []
    }
]

function Table() {
    const classes = usetStyles()
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
                                    rowsHeader={headers}
                                />
                                <RenderRows
                                    headerData={headers}
                                    rowsData={[
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" },
                                        { StudentNationalID: "2023000234-01", ClassOrder: "01", Firstname: "Abayomi Baageshree", Surname: "Baageshree", Dateofbirth: "2023-03-01", EnrolmentStatus: "Active" }
                                    ]}
                                />
                            </>
                        </TableComponent>
                        <Pagination
                            loading={false}
                            page={1}
                            rowsPerPage={10}
                            onRowsPerPageChange={() => { }}
                            onPageChange={() => { }}
                            totalPerPage={10}
                            totalPages={10}
                        />
                    </div>
                </WithBorder>
            </WithPadding>
        </Paper>
    )
}

export default Table
