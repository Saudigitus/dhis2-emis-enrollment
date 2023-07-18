import React from 'react'
import ContentFilter from './ContentFilter';
import { type CustomAttributeProps } from '../../../../../types/table/attributeColumns';
import { Attribute } from '../../../../../types/generated/models';

const headers: CustomAttributeProps[] =
    [
        {
            id: 'id1',
            displayName: 'Enrollment Date',
            header: 'Enrollment Date',
            required: false,
            name: 'Enrollment Date',
            labelName: 'Id',
            valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
            options: { optionSet: [{ value: '1', label: '1' }] },
            visible: false,
            disabled: false,
            pattern: '',
            searchable: false,
            error: false,
            content: '',
            key: 'id1'
        },
        {
            id: 'id2',
            displayName: 'Student Nation',
            header: 'Student Nation',
            required: false,
            name: 'Student Nation',
            labelName: 'Id',
            valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
            options: { optionSet: [{ value: '1', label: '1' }] },
            visible: false,
            disabled: false,
            pattern: '',
            searchable: false,
            error: false,
            content: '',
            key: 'id2'
        },
        {
            id: 'id3',
            displayName: 'Frist Name',
            header: 'Frist Name',
            required: false,
            name: 'Frist Name',
            labelName: 'Id',
            valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
            options: { optionSet: [{ value: '1', label: '1' }] },
            visible: false,
            disabled: false,
            pattern: '',
            searchable: false,
            error: false,
            content: '',
            key: 'id3'
        },
        {
            id: 'id4',
            displayName: 'Surname',
            header: 'Surname',
            required: false,
            name: 'Surname',
            labelName: 'Id',
            valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
            options: { optionSet: [{ value: '1', label: '1' }] },
            visible: false,
            disabled: false,
            pattern: '',
            searchable: false,
            error: false,
            content: '',
            key: 'id4'
        },
        {
            id: 'id5',
            displayName: 'Date of Birthday',
            header: 'Date of Birthday',
            required: false,
            name: 'Date of Birthday',
            labelName: 'Id',
            valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
            options: { optionSet: [{ value: '1', label: '1' }] },
            visible: false,
            disabled: false,
            pattern: '',
            searchable: false,
            error: false,
            content: '',
            key: 'id5'
        }
    ]

function EnrollmentFilters(): React.ReactElement {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
            <ContentFilter headers={headers} />
        </div>
    )
}

export default EnrollmentFilters
