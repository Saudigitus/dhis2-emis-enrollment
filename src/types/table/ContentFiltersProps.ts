import { CustomAttributeProps } from "../variables/AttributeColumns"

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
    id?: string
    options: CustomAttributeProps['options']
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
    options: CustomAttributeProps['options']
    value: string
    singleSelect: boolean
}

interface SelectBoxesProps {
    options?: CustomAttributeProps['options']
    value: any
    id?: string
    onChange: (value: any, id?: string, type?: CustomAttributeProps['valueType']) => void
    valueType?: CustomAttributeProps['valueType']
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

export type { ContentFilterProps, MenuFiltersProps, SelectorContentsProps, FilterComponentProps, DateFilterManagerProps, OptionSetProps, SelectBoxesProps, TextFilterProps, ActiveFilterButtonProps, SelectButtonProps, RenderWithAppliedFilterProps, RenderWithoutAppliedFilterProps, TooltipProps }
