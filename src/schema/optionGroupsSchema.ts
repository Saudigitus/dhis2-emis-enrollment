import { atom } from "recoil"

export interface OptionGroupsConfig {
    id: string
    options: Array<{
        value: string
        label: string
    }>
}

export const OptionGroupsConfigState = atom<OptionGroupsConfig[]>({
    key: "optionGroupsConfig-get-state",
    default: []
})
