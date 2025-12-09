// Kobler FinancePage til riktig path, /finance

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FinancePage from '../pages/FinancePage';
// trenger også AtheltePage her

const AppRoutes = () => { // Må sjekke om pathen til utøvere er riktig
    return(
        <BrowserRouter>
            <Route path="/finance" element={<FinancePage/>}/>
            
            <Route path="/athletes" element={<AthletePage/>}/> 

            <Route path="*" element={<p>Side ikke funnet</p>}/> 
        </BrowserRouter>
    );
};

export default AppRoutes;