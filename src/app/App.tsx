import React from 'react'
import "./App.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";
import { Router } from "../components/routes"
import "../assets/style/globalStyle.css"
import { RecoilRoot } from 'recoil';
import { DataStoreProvider } from "@dhis2/app-service-datastore";
import { CircularLoader, CenteredContent } from "@dhis2/ui";
import AppWrapper from './AppWrapper';
import AppConfigurations from './AppConfigurations';

function App() {
    return (
        <DataStoreProvider
            namespace="emis-apps-configuration"
            loadingComponent={
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            }
        >
            <RecoilRoot>
                <AppWrapper>
                    <AppConfigurations>
                        <Router />
                    </AppConfigurations>
                </AppWrapper>
            </RecoilRoot>
        </DataStoreProvider>
    )
}
export default App
