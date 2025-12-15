import { useState, useEffect } from "react";

// Lar AthleteRegisterForm, AthleteForm og FinanceLoan bruke denne, sånn at vi ikke må skrive det samme i hver av filene

export const useClearStatusMessage = (message: string = "" ) => {
    const [statusMessage, setStatusMessage] = useState<string>(message);
    const [isOk, setIsOk] = useState<boolean | null> (null);

    const updateStatusMessage = (message: string, ok : boolean | null) => {
        setStatusMessage(message);
        setIsOk(ok);
    };

    useEffect(() => {
        if(statusMessage){
            // Nullstiller statusmeldnig etter 8 sekunder 
            const timer = setTimeout(() => {
                setStatusMessage("");
                setIsOk(null);
            },8000);

            // Rydder opp den gamle timeren
            return () => clearTimeout(timer);
        }
    }, [statusMessage]) // kjøres når statusMessage endres

    return {statusMessage, setStatusMessage, isOk, updateStatusMessage};

}