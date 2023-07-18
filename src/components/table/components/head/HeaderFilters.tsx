import React from 'react'
import ConfigTableColumns from '../configTableColumns/ConfigTableColumns'
import EnrollmentFilters from '../filters/enrollment/EnrollmentFilters'

function HeaderFilters() {
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <EnrollmentFilters />
            <ConfigTableColumns
                headers={[{
                    id: 'id',
                    header: 'Id',
                    optionSets: []
                },
                {
                    id: 'id2',
                    header: 'Id2',
                    optionSets: []
                }]}
                updateVariables={() => { }}
            />
        </div>
    )
}

export default HeaderFilters
