import React from "react"
import trashIcon from './img/trash-icon.svg';
import editIcon from './img/edit-icon.svg';


const ListItem =({id, duedate, name, description, assignedto, status, deleteData, }) => {

    function deleteList() {
        console.log(123)
        deleteData(function(prev) {
            return prev.filter(list => list.id !== id)
        })

    }

    return(
        <div>
            <div className="list-all-text-content">
                <div >
                    <p>Date:{duedate}</p>
                    <p>Name:{name}</p>
                    <p>Description:{description}</p>
                    <p>Assigned:{assignedto}</p>
                    <p>Status:{status}</p>
                </div>
            </div>
            <div className="list-all-text-content-button">
                <button className="desktopDeleteButton" onClick={deleteList}><img src={(trashIcon)} /></button>
                <button className="edit-button"><img src={(editIcon)} /></button>
            </div>
        </div>
    )
}

export default ListItem;