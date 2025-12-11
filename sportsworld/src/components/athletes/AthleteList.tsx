import { useContext } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../context/AthleteContext";
import AthleteItem from "../athletes/AthleteItem";


// lager interface som matcher props i Item, sånn at finance også kan bruke AthleteList -F, thea du treger ikke bruke disse
// med mindre du trenger slette og endre funksjoner og knapp
interface AthleteListProperties {
    onEdit?: (athlete: IAthlete) => void;
    onDelete?: (id: number) => void;
}

const AthleteList = ({onDelete, onEdit} : AthleteListProperties) => {

     // koble opp til context - hentet kake tilstanden -F
    const {athletes} = useContext(AthleteContext) as IAthleteContext;

    const getAthleteJSX = () => {
        // sjekker for å vise spilleren med gyldig nav og id - LURERE PÅ OM DETTE KAN SLETTES!!
        const validAthletes = athletes.filter(athlete => athlete.id > 0 && athlete.name && athlete.name.trim() != "");
        // sjekker om listen er tom eller ikke -F
        if(validAthletes.length === 0){
            return <p> Ingen spillere funnet, prøve å søke eller vise alle</p>
        }

        const athleteJSX = validAthletes.map( (athlete) => {
            return (
                <AthleteItem 
                key={"athlete" + athlete.id}
                athlete={athlete}
                // sender props funksjonene videre til item-komponenten -F
                onDelete={onDelete}
                onEdit={onEdit}
                />
            )
        });
        return athleteJSX;
    }

    // tailwind styling er bare samme som rolando, sa dette kan vi ofc endre på -F
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