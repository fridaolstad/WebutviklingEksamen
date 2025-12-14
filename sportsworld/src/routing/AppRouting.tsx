// Kobler FinancePage til riktig path, /finance

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FinancePage from '../pages/FinancePage';
import { AthleteAdminPage, HomePage } from "../pages";
import AthleteRegisterPage from "../pages/AthleteRegisterPage";
import PageNavigation from "../components/shared/PageNavigation";
import PageFooter from "../components/shared/PageFooter";
// trenger også AtheltePage her

const AppRoutes = () => { // Må sjekke om pathen til utøvere er riktig
    return(
        <BrowserRouter>

        <PageNavigation></PageNavigation>

        <Routes>
            <Route path="/" element={<HomePage/>}></Route> 

            <Route path="/athletes" element={<AthleteAdminPage/>}/> 

            <Route path="/finance" element={<FinancePage/>}/>
            
            <Route path="/registerAthlete" element={<AthleteRegisterPage/>}/>

            <Route path="*" element={<p>Side ikke funnet</p>}/> 

        </Routes>

            
        </BrowserRouter>
    )
}

export default AppRoutes;