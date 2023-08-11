import { atom } from "recoil";

export const onSubmitClicked = atom<boolean>({
    key: "on-submit-clicked",
    default: false
})
