import React from 'react'
import { useGetOptionSets } from '../../hooks/optionSets/useGetOptionSets';
import { CenteredContent, CircularLoader, Help } from "@dhis2/ui"
import Item from './Item';
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatResponse } from '../../utils/table/header/formatResponse';
import { type ProgramConfig } from '../../types/programConfig/ProgramConfig';

function MenuItemContainer({ dataElementId, onToggle }: { dataElementId: string, onToggle: () => void }): React.ReactElement {
    const programConfigState = useRecoilValue(ProgramConfigState) as ProgramConfig;
    const optionSetId = formatResponse(programConfigState)?.find(element => element.id === dataElementId)?.options.optionSet.id ?? "";
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
        <Item onToggle={onToggle} dataElementId={dataElementId} menuItems={data?.result?.options} />
    )
}
export default MenuItemContainer
