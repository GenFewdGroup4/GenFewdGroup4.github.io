const dataForm = document.querySelector('#desktop-text-area')
const toDoData = document.querySelector('#list-all-text-content')
const submit = document.querySelector('#submit')
const showDataButton = document.querySelector('#show-data')
const listDataFrom = document.querySelector('#list-all-text-content-form')


// set up Desktop POST input data to sever and addDate function in the end
dataForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const form = event.target
    const dataObj = {
        duedate: form.duedate.value,
        name: form.name.value,
        description: form.description.value,
        assignedto: form.assignedto.value,
        status: form.status.value
    }
    console.log(dataObj)

    const response = await fetch('http://localhost:8080/todolist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj)

    })
    const data = await response.json()
    console.log(data)
    addData()


})




// Show Data
async function showData() {

    const response = await fetch('http://localhost:8080/todolist', {
        method: 'GET'
    })
    const dataArr = await response.json()
    toDoData.innerHTML = ''
    for (let i = 0; i < dataArr.length; i++) {
        toDoData.innerHTML += `
        <div id="list-all-text-content" class="list-all-text-content">
            <form id="list-all-text-content-form">
                <div class="list-tetx">
                    <div>NO.${dataArr[i].id}</div>
                    <div>Date:${dataArr[i].duedate} </div>
                    <div>Name: ${dataArr[i].name}</div>
                    <div>Description:${dataArr[i].description} </div>
                    <div>Assigned: ${dataArr[i].assignedto}</div>
                    <div>Status: ${dataArr[i].status}</div>
                </div>
                <div class="list-all-text-content-button">
                    <button id="delete-button" class="delete-button" data-id="${dataArr[i].id}"><img src="./src/image/trash-icon.svg"></button>
                
                    <button id="edit-button" class="edit-button" data-id="${dataArr[i].id}"><img src="./src/image/edit-icon.svg"></i></button>
                
                    <button id="finish-button" class="finish-button"><img src="./src/image/finish-button.svg"></i></button>
                </div> 
            </form>
        </div>
        `
    }
    const updateButton = document.querySelectorAll('#edit-button')
    for (let elenment of updateButton) {
        elenment.addEventListener('click', (event) => {
            event.preventDefault();
            updateData(elenment.getAttribute('data-id'))
        })
    }

    const deleteButton = document.querySelectorAll('#delete-button')
    for (let elenment of deleteButton) {
        elenment.addEventListener('click', (event) => {
            event.preventDefault()
            deleteItem(elenment.getAttribute('data-id'))
        })
    }

    const finishButton = document.querySelector('#finish-button')
    finishButton.addEventListener('click', (event) => {
        event.preventDefault()
        line()
    })

}

showDataButton.addEventListener('click', showData)





// set up Desktop addData function
async function addData() {
    const response = await fetch('http://localhost:8080/todolist', {
        method: 'GET'
    })
    const dataArr = await response.json()
    toDoData.innerHTML = ''
    for (let i = 0; i < dataArr.length; i++) {
        toDoData.innerHTML += `
        <div id="list-all-text-content" class="list-all-text-content">
            <form id="list-all-text-content-form">
                <div class="list-tetx">
                    <div>NO.${dataArr[i].id}</div>
                    <div>Date:${dataArr[i].duedate} </div>
                    <div>Name: ${dataArr[i].name}</div>
                    <div>Description:${dataArr[i].description} </div>
                    <div>Assigned: ${dataArr[i].assignedto}</div>
                    <div>Status: ${dataArr[i].status}</div>
                </div>
                <div class="list-all-text-content-button">
                    <button id="delete-button" class="delete-button"><img src="./src/image/trash-icon.svg"></button>

                    <button id="edit-button" class="edit-button"><img src="./src/image/edit-icon.svg"></i></button>

                    <button class="finish-button"><img src="./src/image/finish-button.svg"></i></button>
                </div> 
            </form>
        </div>
        `
    }

    if (response.ok) {
        showData()
    }

}



// update todolist setup
const updateData = async(id) => {
    let selectedItem = {}
    let updatedItem = {}
    let response = await fetch('http://localhost:8080/todolist')
    let resArr = await response.json()
    for (let resItem of resArr) {
        if (resItem.id === id) {
            selectedItem = {...resItem }
        }
    }

    toDoData.innerHTML = `
    <form id='update-form'>
        <div id="id" class="id">
            <label for="id">ID:</label>
            <br>    
            <input type="text" name="id" value="${selectedItem.id}" disabled>
        </div>

        <div id="due-date" class="due-date">
            <label for="duedate">Due Date:</label>
            <br>
            <input type="date" name="duedate" value="${selectedItem.duedate}" required>
        </div>

        <div id="name" class="name">
            <label for="name'">Name:</label>
            <br>
            <input type="text" name="name" value="${selectedItem.name}" required>
        </div>

        <div id="description" class="description">
            <label for="description'">Description:</label>
            <br>
            <input type="text" name="description" value="${selectedItem.description}" required>
        </div>

        <div id="assigned-to" class="assigned-to">
            <label for="assignedto'">Assigned:</label>
            <br>
            <input type="text" name="assignedto" value="${selectedItem.assignedto}" required>
        </div>

        <div id="status" class="status">
            <label for="status'">Status:</label>
            <br>
            <input type="text" name="status" value="${selectedItem.status}" required>
        </div>
    <button class='button' type='submit'>UPDATED!</button>
    </form>
    <button id='cancelButton'>Cancel</button>
    `

    document.querySelector('#cancelButton').addEventListener('click', () => {
        showData()
    })


    document.querySelector('#update-form').addEventListener('submit', (event) => {
        event.preventDefault();
        updatedItem.id = event.target.id.value
        updatedItem.duedate = event.target.duedate.value
        updatedItem.name = event.target.name.value
        updatedItem.description = event.target.description.value
        updatedItem.assignedto = event.target.assignedto.value
        updatedItem.status = event.target.status.value
        update(updatedItem)
    })

    toDoData.style = 'text-align:center'
}

const update = async(data) => {
    let dataObj = {
        id: data.id,
        duedate: data.duedate,
        name: data.name,
        description: data.description,
        assignedto: data.assignedto,
        status: data.status
    }
    const ulr = 'http://localhost:8080/todolist/' + data.id

    let response = await fetch(ulr, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj)
    })

    if (response.ok) {
        toDoData.innerHTML = `
        Your list has been updated please click show list to check!!
        `
    }
}




// delete button
async function deleteItem(id) {
    const url = 'http://localhost:8080/todolist/' + id
    const setting = {
        method: 'DELETE'
    }
    const response = await fetch(url, setting)
    if (response.ok) {
        toDoData.innerHTML = `
        Your item has been deleted please click show list to check!!
        `
    }
}