
import { Link } from "react-router-dom";

const PageNavigation = () => {
    return(
        <header className="bg-blue-400 mb-4 flex justify-between items-center text-white">
            <Link className="p-2 font-bold" to={"/"}> SportsWorld</Link>
        <nav >
            <ul className="flex gap-5 pr-2">
                <li><Link to={"/"}>Hjem</Link></li>
                <li><Link to={"/athletes"}>Administrasjonsside</Link> </li>
                <li><Link to={"/registerAthlete"}>Registrer spiller</Link></li>
                <li><Link to={"/finance"}>Økonomiside</Link></li>
            </ul>
        </nav>
        </header>
    )
}

export default PageNavigation;