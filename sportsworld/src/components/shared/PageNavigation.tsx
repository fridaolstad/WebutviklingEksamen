
import { Link } from "react-router-dom";

const PageNavigation = () => {
    return(
        <nav>
            <ul>
                <li><Link to={"/"}>Hjem</Link></li>
                <li><Link to={"/athletes"}>Administrasjonsside for fotballspillere</Link> </li>
                <li><Link to={"/registerAthlete"}>Registrering av ny spiller</Link></li>
                <li><Link to={"/finance"}>Økonomiside</Link></li>
            </ul>
        </nav>
    )
}

export default PageNavigation;