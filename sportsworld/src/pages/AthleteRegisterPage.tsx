// husk  importer her: 
import AthleteForm from "../components/athletes/AthleteForm";
import AthleteItem from "../components/athletes/AthleteItem";
import AthleteList from "../components/athletes/AthleteList";
import AthleteEditForm from "../components/athletes/AthleteEditForm";

// legge til AthleteItem nede i return?

const AthleteRegisterPage = () => {
    return(
        <>
        <header>
            <h1 className="text-2xl"> Athlete AdminPage </h1>
            <p> Her kan du se alle forballspillere, søke etter dem på navn, endre eksisterende spillere og slette dem </p>
        </header>
        <AthleteForm></AthleteForm>
        <AthleteEditForm></AthleteEditForm>

        <AthleteList></AthleteList>

        
        </>
    )
}

export default AthleteRegisterPage;