import { useLocationsContext } from "../hooks/useLocationsContext";

const LocationDetails = ({location}) => {
    const { dispatch } = useLocationsContext();

    const handleDeleteClick = async () => {
        const response = await fetch('/api/locations/' + location._id, {
            method: 'DELETE'
        });

        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_LOCATION', payload: json});
        }
    }

    const handleModifyClick = async () => {
        console.log("Modify button clicked");
    }



    return(
        <ul className="location-details">
            <h4 key="title">{location.title}</h4>
            <p key="name"><strong> Name : </strong>{location.name}</p>
            <p key="place"><strong> Place : </strong>{location.place}</p>
            <p key="timeCreated"><strong> Time Created: </strong>{location.createdAt}</p>

            <button className="deletelocation" onClick={handleDeleteClick}>Delete</button>
            <button className="modifylocation" onClick={handleModifyClick}>Modify</button>
        </ul>
    )
}

export default LocationDetails;