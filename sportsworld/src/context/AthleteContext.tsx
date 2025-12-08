import { useState, useEffect, createContext, type ReactNode,  } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import { type IAthleteContext } from "../interfaces/IAthleteContext";
import AthleteService from "../services/AthleteService";
import type { IDefaultResponse, IAthletesResponse } from "../interfaces/ResponseInterfaces";

export const AthleteContext = createContext<IAthleteContext | null>(null);

interface Props { children: ReactNode}

export const AthleteProvider = ({children} : Props) => {

    const [athletes, setAthletes] = useState<IAthlete[]>([
        {id: 99, name: "test athlete", gender: "male", price: 1000, image: "haaland.jpg", purchaseStatus: true }
    ])

    // Denne et veldig VIKTIG og spesielt ,[] !!!
    useEffect(() => {
        setAthletesFromService();
    },[]);

    // skal gjøre bruk av getAllAthletes i AthleteService - skal skape/hente utøver med engang = bruke useEffect for dette
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

    const getAthleteById = async (id: number) : Promise<IDefaultResponse> => {
        const response = await AthleteService.getAthleteById(id);
        return response;

    }

    const getAthleteByName = async (name: string) : Promise<IAthletesResponse> => {
        const response = await AthleteService.getAthleteByName(name);
        return response;
    }



    // side 1
    const updateAthlete = async (editedAthlete: IAthlete) : Promise<IDefaultResponse> => {
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

    const deleteAthlete = async (id: number) : Promise<IDefaultResponse> => {
        const response = await AthleteService.deleteAthlete(id);

        if(response.success){
            setAthletes ( prevAthletes =>
                prevAthletes.filter(athlete => athlete.id !== id)
            );
        }
        return response;
    }



        // side 2 
    const registerAthlete = async (newAthlete: IAthlete, image: File) : Promise<IDefaultResponse> => {
        const response = await AthleteService.postAthlete(newAthlete, image);

        if(response.success) {
            setAthletes(
                prev => [response.data!, ...prev] // lager et nytt array og setter den nye athleten først, også resten av athletene (spreed operation)
            );
        }
        return response;
    }





    // denne kan slettes hvis vi ikke skal bruke den:
    const getAthleteQuantity = () : number => {
        return athletes.length;
    }


    

    return(
        <AthleteContext.Provider value ={{athletes, showAllAthletes : setAthletesFromService , getAthleteQuantity, showAthleteById: getAthleteById, searchAthleteByName : getAthleteByName, registerAthlete, updateAthlete, removeAthlete : deleteAthlete}}>
            {children}
        </AthleteContext.Provider>
    )
        

}






