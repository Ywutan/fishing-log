import "./globals.css";
import { Roboto } from "next/font/google";

function Layout({children}) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    );
}

export default Layout;