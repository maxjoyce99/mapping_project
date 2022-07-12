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
            <h4>{location.title}</h4>
            <p><strong> Name : </strong>{location.name}</p>
            <p><strong> Place : </strong>{location.place}</p>
            <p>Created At: {location.createdAt}</p>

            <span onClick={handleDeleteClick}>Delete</span>


        </div>
    )
}

export default LocationDetails;