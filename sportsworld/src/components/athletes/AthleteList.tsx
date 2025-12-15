import { useContext } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../context/AthleteContext";
import AthleteItem from "../athletes/AthleteItem";


// lager interface som matcher props i Item, sånn at finance også kan bruke AthleteList 
interface AthleteListProperties {
    onEdit?: (athlete: IAthlete) => void;
    onDelete?: (id: number) => void;
}

const AthleteList = ({onDelete, onEdit} : AthleteListProperties) => {

     // Koble opp til context - hentet athlete tilstanden 
    const {athletes} = useContext(AthleteContext) as IAthleteContext;

    const getAthleteJSX = () => {

        // Sjekker om listen er tom eller ikke 
        if(athletes.length === 0){
            return <p> Ingen spillere funnet, prøve å søke på nytt eller vise alle knappen</p>
        }

        const athleteJSX = athletes.map( (athlete) => {
            return (
                <AthleteItem 
                key={athlete.id}
                athlete={athlete}
                // Sender props funksjonene videre til item-komponenten 
                onDelete={onDelete}
                onEdit={onEdit}
                />
            )
        });
        return athleteJSX;
    }

    return (
        <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header>
                <h2 className="text-xl font-bold mb-6">Athleteliste</h2>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getAthleteJSX()}
            </section>
        
         </div>

    )
}

export default AthleteList;