import { Navigate } from "react-router-dom";
import React from "react";
import { SideBarLayout, SimpleLayout, FullLayout } from "../../layout"
import { Cards, Buttons, Home, Modal } from "../../pages";
import TableComponent from "../../pages/table/Table";

export default function RouteList() {
    return [
        {
            path: "/",
            layout: SimpleLayout,
            component: () => <Navigate to="/enrollment" replace />
        },
        {
            path: "/home",
            layout: SideBarLayout,
            component: Home
        },
        {
            path: "/enrollment",
            layout: FullLayout,
            component: () => <TableComponent />
        },
        {
            path: "/buttons",
            layout: SideBarLayout,
            component: Buttons
        },
        {
            path: "/cards",
            layout: SideBarLayout,
            component: Cards
        },
        {
            path: "/modal",
            layout: SideBarLayout,
            component: Modal
        }
    ]
}
