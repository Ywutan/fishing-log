"use client"
import Chart from 'chart.js/auto';
import NavList from "../components/navList/navList";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../components/store/store";

function Layout({children}) {
    return (
        <html lang="en">
            <body>  
                <Provider store={store}>
                    <NavList>{children}</NavList>
                </Provider>
            </body>
        </html>
    );
}

export default Layout;