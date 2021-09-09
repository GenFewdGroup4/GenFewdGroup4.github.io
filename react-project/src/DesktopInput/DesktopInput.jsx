import React, { useState, useEffect } from 'react';
import './DesktopInput.css';
import { v4 } from 'uuid';

const DesktopInput =( {add} ) => {
    

    const [duedate, setduedate] = useState('')
    function duedateChange(e) {
        setduedate(e.target.value)
    }

    const [name, setName] = useState('')
    function nameChange(e) {
        setName(e.target.value)
    }

    const [description, setDescription] = useState('')
    function descriptionChange(e) {
        setDescription(e.target.value)
    }

    const [assignedto, setassignedto] = useState('')
    function assignedtoChange(e) {
        setassignedto(e.target.value)
    }

    const [status, setStatus] = useState('')
    function statusChange(e) {
        setStatus(e.target.value)
    }

    console.log(duedate, name, description, assignedto, status)

    function addList() {

        add(function(prev) {
            return [...prev, {
            id: v4(),
            duedate,
            name,
            description,
            assignedto,
            status,
            }]
        })
    }
    

    return (
        <div className="desktop-text-container">
                <div id="desktop-text-area" className="desktop-text-area">
                        <div className="desktopDuedate">
                            <label>Due Date:</label>
                            <br />
                            <input type="date" value={duedate} onChange={duedateChange} required={true} />
                        </div>

                        <div className="desktopName">
                            <label>Name:</label>
                            <br />
                            <input type="text" value={name} onChange={nameChange} required={true} />
                        </div>

                        <div className="desktopDescription">
                        <label>Description:</label>
                        <br />
                            <input type="text" value={description} onChange={descriptionChange} required={true} />
                        </div>

                        <div className="desktopAssignedto">
                            <label>Assigned:</label>
                            <br />
                            <input type="text" value={assignedto} onChange={assignedtoChange} required={true} />
                        </div>

                        <div className="desktopStatus">
                            <label>Status:</label>
                            <br />
                            <input type="text" value={status} onChange={statusChange} required={true} />
                        </div>

                        <div className="desktop-text-button">
                            <div className="desk-submit-button">
                                <button className="desktop-show-data" type="reset"  >Show List</button>
                                <button className="desktop-submit" type="submit" onClick={addList}>Submit</button>
                            </div>
                        </div>
                </div>
        </div>
    )
}

export default DesktopInput;
