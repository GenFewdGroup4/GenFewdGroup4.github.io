import React from "react";
import './DesktopList.css';
import ListItem from '../ListItem';


const DesktopList =( {listData, deleteData } ) => {
    

    return(
        <div className="list-all-text-content">
                <div className="list-tetx">
                    {
                        listData.map((item) => {
                            const { duedate, name, description, assignedto, status, id } = item
                            return <ListItem 
                            key={id}
                            id={id}
                            duedate={duedate}
                            name={name} 
                            description={description} 
                            assignedto={assignedto} 
                            status={status}
                            deleteData={deleteData} />
                        })
                    }
                </div>
        </div>
     )
}

export default DesktopList;