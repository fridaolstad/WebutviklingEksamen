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
        // sjekker om listen er tom eller ikke -F
        if(athletes.length === 0){
            return <p> Ingen spillere funnet, prøve å søke eller vise alle</p>
        }

        const athleteJSX = athletes.map( (athlete) => {
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
        <section className="p-3 border mb-3">
            <header>
                <h2 className="text-xl">Athleteliste</h2>
            </header>
            <section>
                {getAthleteJSX()}
            </section>
        </section>

    )
}

export default AthleteList;