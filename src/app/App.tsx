import React from 'react'
import "./App.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";
import { Router } from "../components/routes"
import "../assets/style/globalStyle.css"
import { RecoilRoot } from 'recoil';

function App() {
    return (
        <RecoilRoot>
            <Router />
        </RecoilRoot>
    )
}
export default App
