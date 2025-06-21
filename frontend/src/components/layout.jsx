import React from "react";
import { Outlet } from "react-router-dom";
import Head from "./Head";

function Layout(){
    return(
        <>
        <Head/>
        <Outlet/>
        </>
    )
}
export default Layout;