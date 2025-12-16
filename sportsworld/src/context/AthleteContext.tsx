import { useState, useEffect, createContext, type ReactNode,  } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import { type IAthleteContext } from "../interfaces/IAthleteContext";
import AthleteService from "../services/AthleteService";
import type { IAthleteResponse, IAthletesResponse } from "../interfaces/ResponseInterfaces";

export const AthleteContext = createContext<IAthleteContext | null>(null);

interface Props { children: ReactNode}

export const AthleteProvider = ({children} : Props) => {

    
    const [athletes, setAthletes] = useState<IAthlete[]>([])

    // Bruker React hooken useEffect for å hente data fra serveren
    useEffect(() => {
        setAthletesFromService();
    },[]); // [] sørger for at funkjsonen bare kjøres en gang - og hindrer en potensiel evig løkke/loop

    // skal gjøre bruk av getAllAthletes i AthleteService 
    const setAthletesFromService = async () : Promise<IAthletesResponse> => {

        const response = await AthleteService.getAllAthletes();

        if(response.success === true && response.data != null){
            setAthletes(response.data)
        } else{
            console.error("klarte ikke hente alle utøvere");
        }
        // legger med return for å returere riktig ifh til IAthleteResponse, useEffect ignorerer return, så derfor går dette bra,
        // hvis ikke måte vi ha laget en ny funksjon, men den ville innhold mye duplisert kode fra denne funksjonen... derfor valgte 
        // vi å ha en return med og : Promise<IAthletesResponse> 
        return response;

    };

    const getAthleteById = async (id: number) : Promise<IAthleteResponse> => {
        const response = await AthleteService.getAthleteById(id);
        return response;

    }

    const getAthleteByName = async (name: string) : Promise<IAthletesResponse> => {
        const response = await AthleteService.getAthleteByName(name);
        if(response.success && response.data != null){
            setAthletes(response.data);
        }
        return response;
    }



    // side 1
    const updateAthlete = async (editedAthlete: IAthlete) : Promise<IAthleteResponse> => {
        const response = await AthleteService.updateAthlete(editedAthlete)

        if(response.success){
           setAthletes(prevAthletes => {
        
            const nextAthletes = prevAthletes.map(athlete =>{

                if( athlete.id === editedAthlete.id){
                    return editedAthlete;
                }else{
                    return athlete;
                }
            });
            return nextAthletes;
           });
        }
        return response;
    }

    const deleteAthlete = async (id: number) : Promise<IAthleteResponse> => {
        const response = await AthleteService.deleteAthlete(id);

        if(response.success){
            await setAthletesFromService();
        }
        return response;
    }

        // side 2 
    const registerAthlete = async (newAthlete: IAthlete, image: File) : Promise<IAthleteResponse> => {
        const response = await AthleteService.postAthlete(newAthlete, image);

        if(response.success) {
            // Henter hele den oppdaterte listen fra serveren
            await setAthletesFromService();
        }
        return response;
    }


    return(
        <AthleteContext.Provider value ={{athletes, showAllAthletes : setAthletesFromService , showAthleteById: getAthleteById, searchAthleteByName : getAthleteByName, registerAthlete, updateAthlete, removeAthlete : deleteAthlete}}>
            {children}
        </AthleteContext.Provider>
    )
        
}









