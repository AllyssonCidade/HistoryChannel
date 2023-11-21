import Banner from "../../componentes/Banner";
import ScrollToTopButton from "../../componentes/ScrollToTopButton";
import { Outlet } from "react-router-dom";

export default function PaginaPadrao({children}){
    return (
        <main>
            <Banner />
            {children}
            <Outlet />
            <ScrollToTopButton />
        </main>
    )
}
