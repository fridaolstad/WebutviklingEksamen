import AthleteForm from "../components/athletes/AthleteForm";
import AthleteList from "../components/athletes/AthleteList";
import AthleteEditForm from "../components/athletes/AthleteEditForm";
import AthleteDelete from "../components/athletes/AthleteDelete";
import { useAthleteAdmin } from "../components/athletes/hooks/UseAthleteAdmin";


const AthleteAdminPage = () => {

    const { athlteToEdit, athlteToDelete, startEdit, startDelete, handleUpdate, handleDelete, cancelEdit, cancelDelete}
     = useAthleteAdmin();

    return(
        <>
        <header /* styling med tailwind her? */>
            <h1 className="text-2xl"> Athlete AdminPage </h1>
            <p> Her kan du se alle forballspillere, søke etter dem på navn, endre eksisterende spillere og slette dem </p>
        </header>

        {/* Henter Form for å hente/vise søk og vis alle */}
        <AthleteForm></AthleteForm>
        {/* Henter Listen av spillere og sender funksjoner fra useAthleteAdmin */}
        <AthleteList 
        onEdit={startEdit}
        onDelete={startDelete}>
        </AthleteList>

        {/* Endre eksisterende utøver*/}
        {athlteToEdit && (
            <section /* husk styling med tailwind her */>
                <div /* husk styling med tailwind her */>
                    <AthleteEditForm 
                    athlete={athlteToEdit}
                    saveEdit={handleUpdate}
                    closeEdit={cancelEdit}
                    ></AthleteEditForm>
                </div>
            </section>
        )}

        {/* Slette eksisterende utøver */}
        {athlteToDelete && (


        
        <section /* husk styling med tailwind her */ >
            <div /* husk styling med tailwind her */>
            
            <AthleteDelete 
            athlete={athlteToDelete}
            onConfirm = {handleDelete} // Kaller slettefunksjonen når det er bekreftet fra brukeren
            onCancel = {cancelDelete}
            ></AthleteDelete>
            </div>
        </section>
         )}
        </>
    );
};
    

export default AthleteAdminPage;