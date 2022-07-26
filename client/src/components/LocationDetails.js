import { useLocationsContext } from "../hooks/useLocationsContext";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; //alert css. can make custom one eventually

const LocationDetails = ({location}) => {
    const { dispatch } = useLocationsContext();



    const handleDeleteClick = async () => {
        confirmAlert({
        title: 'Confirm Location Deletion',
        message: 'Are you sure you want to delete this location? It will also delete all the pictures along with it.',
        buttons: [
          {
            label: 'Delete Location',
            onClick: handleDelete,
          },
          {
            label: 'Cancel',
            onClick: () => console.log("Clicked No")
          }
        ]
      });
    }

    const handleDelete = async () => {
            const response = await fetch('/api/locations/' + location._id, {
                method: 'DELETE'
            });

            const json = await response.json();

            if(response.ok){
                dispatch({type: 'DELETE_LOCATION', payload: json});
            }

            const picResponse = await fetch('/api/pictures/' + location._id, {
                method: 'DELETE'
            });

            const picJson = await response;

            if(picResponse.ok){
                console.log("Deleting Folder");
            }

            if(!picResponse.ok){
                console.log(picJson.err);
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