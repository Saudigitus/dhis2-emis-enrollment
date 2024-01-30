import { type Attribute, type OptionSet } from '../generated/models';

//Buttons Actions Interface
interface ButtonActionProps {
    label: string
    primary?: boolean
    destructive?: boolean
    secondary?: boolean
    disabled: boolean
    loading?: boolean
    onClick: () => void
}

//Flyout Options Interface 
interface FlyoutOptionsProps {
    label: string
    divider: boolean
    onClick: () => void
}

//Simple Buttons interface
interface SimpleButtonsProps {
    id: string
    label: string
    type: string
}

//Dashboard Cards interface
interface DashboardCardProps {
    title: string
    subItem: CardSubItemProps[]
}

//Card SubItem Props interface
interface CardSubItemProps {
    icon: string
    title: string
    leftLabel: string
    program: string
    formLink: string
    listLink: string
}

//Section Fields interface
interface SectionFieldsProps {
    label: string
    attribute: string
    valueType: string
    placeholder: string
    disabled: boolean
    visible: boolean
}

//Form Section interface
interface FormSectionProps {
    section: string
    description: string
    fields: SectionFieldsProps[]
}

//GenericFields interface
interface GenericFieldsProps {
    disabled: boolean
    required: string | boolean
    type?: string
    optionSet?: CustomAttributeProps["options"]
}

interface formType {
    attributes: any[]
    events: any[]
}

//Head Bar Types interface
interface HeadBarTypes {
    id: string
    label: string
    value: string
    placeholder: string
    component?: string
    dataElementId?: string
}

//Selected Options interface
interface SelectedOptionsTypes {
    academicYear: string | null
    class: string | null
    grade: string | null
    school: string | null
    schoolName: string | null
}

interface MenuItemTypes {
    label: string
    value: string
}

type ComponentMapping = Record<string, React.ComponentType<any>>;

type ParamsMapping = Record<string, string>;


interface ProgramConfig {
    displayName: string
    id: string
    description: string
    access?: any
    programType: string
    programStages: [
        {
            autoGenerateEvent: boolean
            displayName: string
            id: string
            programStageDataElements: [
                {
                    displayInReports: boolean
                    compulsory: boolean
                    dataElement: {
                        displayName: string
                        id: string
                        valueType: string
                        optionSet: {
                            id: string
                            options: [{
                                value: string
                                label: string
                            }]
                        }
                    }
                }
            ]
        }
    ]
    programTrackedEntityAttributes: [
        {
            trackedEntityAttribute: {
                generated: boolean
                pattern?: string
                displayName: string
                id: string
                valueType: string
                optionSet: { id: string, options: [{ value: string, label: string }] }
            }
            searchable: boolean
            displayInList: boolean
            mandatory: boolean
        }
    ]
    trackedEntityType: {
        trackedEntityTypeAttributes: [
            {
                trackedEntityAttribute: {
                    id: string
                }
            }
        ]
        id: string
    }
}

interface ProgramStageConfig {
    autoGenerateEvent: boolean
    displayName: string
    id: string
    executionDateLabel?: string
    programStageDataElements: [
        {
            displayInReports: boolean
            compulsory: boolean
            dataElement: {
                displayInReports: boolean | undefined
                displayName: string
                id: string
                valueType: string
                optionSet: {
                    id: string
                    options: {
                        [x: string]: any
                        value: string
                        label: string
                    }
                }
            }
        }
    ]
}

interface SideBarItemProps {
    title: string
    subItems: SideBarSubItemProps[]
}

interface SideBarItemTitleProps {
    title: string
}

interface SideBarSubItemProps {
    label: string
    showBadge: boolean
    icon: string
    disabled: boolean
    route: string
    appName: string
    pathName?: string
}

interface SideBarCollapseProps {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

export enum VariablesTypes {
    DataElement = "dataElement",
    Attribute = "attribute"
}

interface CustomAttributeProps {
    id: string
    displayName: string
    header: string
    required: boolean
    name: string
    programStage?: string
    assignedValue?: string
    labelName: string
    valueType: typeof Attribute.valueType
    disabled: boolean
    visible: boolean
    options: {
        optionSet: {
            id: string
            options: [{
                value: string
                label: string
            }]
        }
    }
    pattern?: string
    searchable?: boolean
    error?: boolean
    content?: string
    key?: any
    description?: string
    type: VariablesTypes
}

interface AppConfigurationsProps {
    children: React.ReactNode
}

interface BadgeProps {
    value: string
}

interface ButtonProps {
    items: SimpleButtonsProps[]
    selectedTerm: any
    setSelectedTerm: (arg: object) => void
}

interface DropdownButtonComponentProps {
    name: string
    icon?: React.ReactNode
    options: FlyoutOptionsProps[]
    disabled: boolean
}

interface CardProps {
    value: string
    label: string
    color: string
}

interface DragDropItemsProps {
    id: string
    visible: boolean
    text: string
    classes?: {
        checkbox: string
    }
    handleToggle: (id: string) => void
}

interface DragDropListProps {
    listItems: any[]
    handleUpdateListOrder: (list: any[]) => void
    handleToggle: (id: string) => void
}

interface EventFormProps {
    programStageId: string
}

interface FormProps {
    name: string
    description: string
    fields: CustomAttributeProps[]
    disabled: boolean
}

interface GenericFieldsProps {
    attribute: CustomAttributeProps
    disabled: boolean
    valueType: CustomAttributeProps["valueType"]
}

interface CheckFieldProps {
    disabled: boolean
    required: string | boolean
}


interface OptionsProps {
    value: string
    label: string
}

interface MutlipleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}

interface AutoCompleteProps {
    disabled?: boolean
    options?: CustomAttributeProps["options"]
    name: string
}

interface SingleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}


interface SwitchFieldProps {
    disabled: boolean
    required: string | boolean
}

interface ContentProps {
    setOpen: (value: boolean) => void
}

interface ModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    title: string
    children: React.ReactNode
}

interface ConfigTableColumnsProps {
    headers: any[]
    updateVariables: (list: any[]) => void
}

interface DialogSelectColumnsProps {
    open: boolean
    onClose: () => void
    headers: any[]
    updateVariables: (list: any[]) => void
}

interface ContentFilterProps {
    headers: CustomAttributeProps[]
}

interface MenuFiltersProps {
    anchorEl: any
    setAnchorEl: (value: any) => void
    addSearchableHeaders: (value: any) => void
    options: CustomAttributeProps[]
}

interface SelectorContentsProps {
    onClose: () => void
    disabledReset: boolean
    colum: CustomAttributeProps
    onChange: () => void
    value: any
    onQuerySubmit: () => void
    disabled: boolean
}

interface FilterComponentProps {
    type: CustomAttributeProps['valueType']
    column: CustomAttributeProps
    onChange: () => void
    value: any
    id: string
    options: { optionSet: { options: [{ value: string, label: string }] } }
}

interface ValueProps {
    endDate: string
    startDate: string
}

interface DateFilterManagerProps {
    onChange: (e: any, id: string, type: string, position: string) => void
    value: ValueProps
    id: string
}

interface OptionSetProps {
    onCommitValue: (value: string) => void
    options: any[]
    value: string
    singleSelect: boolean
}

interface SelectBoxesProps {
    options: { optionSet: { options: [{ label: string, value: string }] } }
    value: any
    id: string
    onChange: (value: any, id?: string, type?: string) => void
    valueType?: string
    orientation?: string
    singleSelect?: boolean
}

interface TextFilterProps {
    value: string
    onChange: (value: string, id: string) => void
    id: string
}


interface ActiveFilterButtonProps {
    onChange: () => void
    iconClass: any
    title: string
    arrowIconElement: React.ReactElement
    buttonText: string
    onClear: () => void
    innerRef: (instance: HTMLDivElement | null) => void
}

interface RenderWithAppliedFilterProps {
    selectorVisible: boolean
    classes: any
    title: string
    disabled: boolean
    tooltipContent: string
    refActiveFilterInstance: (instance: HTMLDivElement | null) => void
    openFilterSelector: () => void
    onClose: () => void
    filled: string
}

interface RenderWithoutAppliedFilterProps {
    selectorVisible: boolean
    classes: any
    title: string
    disabled: boolean
    tooltipContent: string
    openFilterSelector: () => void
}

interface TooltipProps {
    onMouseOver: () => void
    onMouseOut: () => void
    ref: any
}

interface tableProps {
    head: any
    footer: any
}

interface SelectButtonProps {
    colum: any
    value: any
    onChange: any
    filled: string
    onQuerySubmit: any
    disabled: any
    disabledReset: any
    onResetFilters: any
    title: string
    tooltipContent: string
}

interface HeaderCellProps {
    children?: React.ReactNode
    className?: string
    passOnProps?: object
    table?: tableProps
    colspan?: number
    onClick?: () => void
}

interface PaginationProps {
    page: number
    rowsPerPage: number
    onPageChange: (page: number) => void
    onRowsPerPageChange: (rowsPerPage: number) => void
    loading: boolean
    totalPerPage: number
}

interface RowProps {
    children?: React.ReactNode
    className?: string
    passOnProps?: object
    table?: tableProps
}

interface IconButtonPaginationProps {
    onPageChange: (page: number) => void
    ariaLabel: string
    disabled: boolean
    Icon: React.ReactNode
}

interface TableSortProps {
    children?: React.ReactNode
    active: boolean
    direction?: 'asc' | 'desc'
    createSortHandler: (rowsPerPage: string) => void
}

interface TableComponentProps {
    children?: React.ReactNode
    className?: string
}


interface renderHeaderProps {
    rowsHeader: CustomAttributeProps[]
    orderBy: string
    order: "asc" | "desc"
    // TODO resolve this bug.👇
    createSortHandler: (property: string) => any
    rowsData?: any[]
    headerData?: CustomAttributeProps[]
}

interface TitleProps {
    label: string
}

interface GeTDataElementsProps {
    programStageId: string
    type?: keyof typeof fieldsType
}

interface EventQueryProps {
    page: number
    pageSize: number
    ouMode: string
    program: string
    order: string
    programStatus: string
    programStage: string
    orgUnit: string
    filter?: string[]
    filterAttributes?: string[]
}

interface TeiQueryProps {
    program: string
    pageSize: number
    ouMode: string
    trackedEntity: string
    orgUnit: string
    order: string
}

interface dataValuesProps {
    dataElement: string
    value: string
}

interface attributesProps {
    attribute: string
    value: string
}

interface EventQueryResults {
    results: {
        instances: [{
            trackedEntity: string
            dataValues: dataValuesProps[]
        }]
    }
}

interface TeiQueryResults {
    results: {
        instances: [{
            trackedEntity: string
            attributes: attributesProps[]
            enrollments: [{
                enrollment: string
                orgUnit: string
                program: string
            }]
        }]
    }
}

interface QueryResults {
    results: {
        value: string
    }
}

interface attendance {
    absenceReason: string
    programStage: string
    status: string
    statusOptions: [{
        code: string
        icon: string
    }]
}

interface programStages {
    programStage: string
}

interface performance {
    programStages: programStages[]
}

interface registration {
    academicYear: string
    grade: string
    programStage: string
    section: string
}

interface transfer {
    destinySchool: string
    programStage: string
    status: string
}

interface dataStoreRecord {
    attendance: attendance
    key: string
    trackedEntityType: string
    lastUpdate: string
    performance: performance
    program: string
    registration: registration
    ["socio-economics"]: programStages
    transfer: transfer
    ["final-result"]: programStages

}

interface getTypesOfButtonProps {
    type: string
}

interface formatResponseRowsProps {
    eventsInstances: [{
        trackedEntity: string
        dataValues: dataValuesProps[]
    }]
    teiInstances: [{
        trackedEntity: string
        attributes: attributesProps[]
        enrollments: [{
            enrollment: string
            orgUnit: string
            program: string
        }]
    }]
}

interface defaultProps {
    attribute: string
    value: string
    headers: Array<{
        id: string
        optionSets?: OptionSet[]
    }>
}
export const fieldsType = {
    programStage: "executionDateLabel,programStageDataElements[displayInReports,compulsory,dataElement[id,displayName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]],programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]",
    programStageSection: "executionDateLabel,programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]"
}

export type {
    ButtonActionProps, FlyoutOptionsProps, SimpleButtonsProps, DashboardCardProps, CardSubItemProps, SectionFieldsProps, FormSectionProps,
    formType, HeadBarTypes, SelectedOptionsTypes, MenuItemTypes, ComponentMapping, ParamsMapping, ProgramConfig, ProgramStageConfig, BadgeProps,
    SideBarItemProps, SideBarItemTitleProps, SideBarSubItemProps, SideBarCollapseProps, CustomAttributeProps, AppConfigurationsProps, ButtonProps,
    DropdownButtonComponentProps, CardProps, DragDropItemsProps, DragDropListProps, EventFormProps, FormProps, GenericFieldsProps, CheckFieldProps,
    MutlipleSelectProps, AutoCompleteProps, SingleSelectProps, SwitchFieldProps, ContentProps, ModalProps, ConfigTableColumnsProps, DialogSelectColumnsProps,
    ContentFilterProps, MenuFiltersProps, SelectorContentsProps, FilterComponentProps, DateFilterManagerProps, OptionSetProps, SelectBoxesProps, TextFilterProps,
    ActiveFilterButtonProps, RenderWithAppliedFilterProps, RenderWithoutAppliedFilterProps, TooltipProps, SelectButtonProps, HeaderCellProps, PaginationProps, IconButtonPaginationProps,
    RowProps, TableSortProps, TableComponentProps, renderHeaderProps, TitleProps, GeTDataElementsProps, EventQueryProps, TeiQueryProps, EventQueryResults, TeiQueryResults, QueryResults,
    dataStoreRecord, getTypesOfButtonProps, formatResponseRowsProps, dataValuesProps, attributesProps, defaultProps
}
