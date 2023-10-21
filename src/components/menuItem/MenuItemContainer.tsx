import React from 'react'
import Item from './Item';
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatResponse } from '../../utils/table/header/formatResponse';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';

function MenuItemContainer({ dataElementId, onToggle }: { dataElementId: string, onToggle: () => void }): React.ReactElement {
    const programConfigState = useRecoilValue(ProgramConfigState);
    const { getDataStoreData } = getSelectedKey()
    const registrationProgramStage = getDataStoreData.registration.programStage
    const options = formatResponse(programConfigState, registrationProgramStage)?.find(element => element.id === dataElementId)?.options.optionSet.options ?? [];

    return (
        <Item onToggle={onToggle} dataElementId={dataElementId} menuItems={options} />
    )
}
export default MenuItemContainer
