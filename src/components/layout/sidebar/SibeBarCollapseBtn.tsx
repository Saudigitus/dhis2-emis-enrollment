import React from 'react'
import style from "./SideBar.module.css"

export default function SibeBarCollapseBtn({ setCollapsed, collapsed }: { setCollapsed: (collapsed: boolean) => void, collapsed: boolean }) {
    return (
        <div onClick={() => { setCollapsed(!collapsed); }} className={style.ExpandCollapseSideBar}>
            <div className={style.IconContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="56" viewBox="0 0 24 56" fill="none">
                    <path d="M0 0L19.6825 10.2058C22.335 11.5811 24 14.32 24 17.3078V38.6922C24 41.68 22.335 44.4189 19.6825 45.7942L0 56V0Z" fill="#1E6194" />
                </svg>

                <svg className={collapsed ? style.ArrowIConRight : style.ArrowIConLeft} xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                    <path d="M7.66741 10.9062C7.8125 11.0625 8.04464 11.0625 8.16071 10.9062L8.74107 10.2812C8.88616 10.1562 8.88616 9.90625 8.74107 9.75L5.92634 6.8125H13.1518C13.3259 6.8125 13.5 6.65625 13.5 6.4375V5.5625C13.5 5.375 13.3259 5.1875 13.1518 5.1875H5.92634L8.74107 2.28125C8.88616 2.125 8.88616 1.875 8.74107 1.75L8.16071 1.125C8.04464 0.96875 7.8125 0.96875 7.66741 1.125L3.37277 5.75C3.22768 5.90625 3.22768 6.125 3.37277 6.28125L7.66741 10.9062ZM2.00893 11.625V0.375C2.00893 0.1875 1.83482 0 1.66071 0H0.848214C0.645089 0 0.5 0.1875 0.5 0.375V11.625C0.5 11.8438 0.645089 12 0.848214 12H1.66071C1.83482 12 2.00893 11.8438 2.00893 11.625Z" fill="#ECECEC" />
                </svg>
            </div>
        </div>
    )
}
