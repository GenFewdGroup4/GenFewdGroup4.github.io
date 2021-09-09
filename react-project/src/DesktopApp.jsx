import React, { useEffect, useState } from "react";
import './DesktopApp.css'

import DesktopNavBar from './DesktopNavBar/DesktopNavbar';
import DesktopInput from './DesktopInput/DesktopInput'
import DesktopList from './DesktopList/DesktopList'
import DesktopFooter from './DesktopFooter/DesktopFooter'

const DesktopApp =() => {

    async function getDateFetch(){
        const res = await fetch ("http://localhost:8080/todolist")
        const data = await res.json()
        console.log(data)
    }
    useEffect(() => {
        getDateFetch()
    }, [])
    
    const [data, setData] = useState([]);
    

    return(
        <div className='Desktop-main'>
            <DesktopNavBar />
            <DesktopInput add={setData} />
            <DesktopList listData={data} deleteData={setData} />
            <DesktopFooter /> 
        </div>
    )
}

export default DesktopApp ;