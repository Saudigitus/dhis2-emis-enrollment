import { Navigate } from "react-router-dom";
import React from "react";
import { SimpleLayout, FullLayout } from "../../layout"
import { GenericForm, TableComponent } from "../../pages";

export default function RouteList() {
    return [
        {
            path: "/",
            layout: SimpleLayout,
            component: () => <Navigate to="/enrollment" replace />
        },
        {
            path: "/enrollment",
            layout: FullLayout,
            component: () => <TableComponent />
        },
        {
            path: "/form",
            layout: FullLayout,
            component: GenericForm
        }
    ]
}
