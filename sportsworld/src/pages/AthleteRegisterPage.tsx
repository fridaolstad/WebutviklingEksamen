import AthleteList from "../components/athletes/AthleteList";
import AthleteRegisterForm from "../components/athletes/AthleteRegisterForm";

// legge til AthleteItem nede i return?

const AthleteRegisterPage = () => {
    return(
        <>
        <header>
            <h1 className="text-2xl"> Registering av ny spiller  </h1>
            <p> Her kan du registrere en ny spiller  </p>
        </header>
        
        <AthleteRegisterForm></AthleteRegisterForm>
        <AthleteList></AthleteList>
        
        </>
    )
}

export default AthleteRegisterPage;