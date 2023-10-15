import NavList from "../components/navList/navList";
import "./globals.css";
import { Roboto } from "next/font/google";

function Layout({children}) {
    return (
        <html>
            <body>
                <NavList children={children} />
            </body>
        </html>
    );
}

export default Layout;