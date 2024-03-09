import { atom } from "recoil"

export interface OrgUnitsGroupsConfig {
    value: string,
    label: string,
    organisationUnits: Array<{
        value: string
        label: string
    }>
}

export const OrgUnitsGroupsConfigState = atom<OrgUnitsGroupsConfig[]>({
    key: "orgUnitGroupsConfig-get-state",
    default: []
})
