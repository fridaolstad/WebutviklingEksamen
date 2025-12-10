import { useContext, useState } from "react";
import { type IAthleteContext } from "../../../interfaces/IAthleteContext";
import { AthleteContext } from "../../../context/AthleteContext";
import type { IAthlete } from "../../../interfaces/IAthlete";


export const useAthleteAdmin = () => {

// States for hva som skal slettes og endres (side 1)
const [athlteToEdit, setAthleteToEdit] = useState<IAthlete | null> (null);
const [athlteToDelete, setAthleteToDelete] = useState<IAthlete | null> (null);

// Henter crud funksjoner og data fra Context
const {updateAthlete, removeAthlete, athletes} = useContext(AthleteContext) as IAthleteContext;

// ---- Funksjoner for edit ----
const startEdit = (athlete: IAthlete) => {
    setAthleteToEdit(athlete);
};

const handleUpdate = async (updatedAthlete: IAthlete) => {
    const response = await updateAthlete(updatedAthlete);

    if(response.success){
        console.log(`Spilleren ${updatedAthlete.name} ble oppdatert `)
        setAthleteToEdit(null);
    }else {
        console.error("Feil ved oppdatering av spiller")
    }
};

// Lukker redigering
const cancelEdit = () => {
    setAthleteToEdit(null);
};

// ---- Funksjoner for sletting ----
const startDelete = (id: number) => {
    const athlete = athletes.find(a => a.id === id); // kan endre til bare a inni find(a => a.id === id)
    if(athlete){
        setAthleteToDelete(athlete);
    }
};

const handleDelete = async () => {
    // Sjekker om athlete er null, hvis ja så avluttes funksjonen, om nei fortsetter den
    if(!athlteToDelete) // Bruker ! istedenfor =! null eller === null fordi ! sekker både null og undefined 
        return;

    // Kaller context funksjonen for sletting 
    const response = await removeAthlete(athlteToDelete.id);

    if(response.success){
        console.log (`Spilleren med id ${athlteToDelete.id} ble slettet`);
    }else {
        console.log(`Feil ved sletting av spiller`)
    }
    // Lukker sletting
    setAthleteToDelete(null); 
}

// Lukker bekreftelsen for sletting
const cancelDelete = () => {
    setAthleteToDelete(null);
};

return { athlteToEdit, athlteToDelete, startEdit, startDelete, handleUpdate, cancelEdit, handleDelete ,cancelDelete
};

};