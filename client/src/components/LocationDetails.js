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



    return(
        <div className="location-details">
            <h4 key="title">{location.title}</h4>
            <p key="name"><strong> Name : </strong>{location.name}</p>
            <p key="place"><strong> Place : </strong>{location.place}</p>
            <p key="timeCreated">Created At: {location.createdAt}</p>
            <p key="ID">Id {location._id}</p>

            <span onClick={handleDeleteClick}>Delete</span>


        </div>
    )
}

export default LocationDetails;