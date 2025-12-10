import AthleteForm from "../components/athletes/AthleteForm";
import AthleteItem from "../components/athletes/AthleteItem";
import AthleteList from "../components/athletes/AthleteList";
import AthleteEditForm from "../components/athletes/AthleteEditForm";

const AthletePage = () => {
    return(
        <>
        <header>
            <h1 className="text-2xl"> Athlete AdminPage </h1>
            <p> Her kan du se alle forballspillere, søke etter dem på navn, endre eksisterende spillere og slette dem </p>
        </header>
        <AthleteForm></AthleteForm>
        <AthleteItem></AthleteItem>
        <AthleteList></AthleteList>
        <AthleteEditForm></AthleteEditForm>
        
        </>
    )
}

export default AthletePage;