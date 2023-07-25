import React from 'react'
import { useGetOptionSets } from '../../hooks/optionSets/useGetOptionSets';
import { CenteredContent, CircularLoader, Help } from "@dhis2/ui"
import Item from './Item';

function MenuItemContainer({ optionSetId }: { optionSetId: string }): React.ReactElement {
    const { data, loading, error } = useGetOptionSets({ optionSetId })

    if (error != null) {
        return <Help error>
            {error.message}
        </Help>
    }

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader small />
            </CenteredContent>
        )
    }
    return (
        <Item menuItems={data?.result?.options} />
    )
}
export default MenuItemContainer
