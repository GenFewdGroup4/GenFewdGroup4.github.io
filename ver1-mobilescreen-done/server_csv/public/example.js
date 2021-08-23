// show data
// 用document.querySelector選擇在html 內，id 是 show-button 的element, 存放在 showButton 內
const showButton = document.querySelector('#show-button')

// 設定一個名為showData的function
async function showData() {

    // 選擇html內 id 是display-data-area的 element，放在displayDataArea內
    const displayDataArea = document.querySelector('#display-data-area')

    // 用 innerHTML 更改 displayDataArea的內容
    displayDataArea.innerHTML = `
    <div id='data-heading' class='data-field'>
    <div class='id'>ID</div>
    <div class="name">Name</div>
    <div class="description">Description</div>
    <div class="assigned-to">Assigned To</div>
    <div class="due-date">Due Date</div>
    <div class="">UPDATE</div>
    <div class="">DELETE</div>
    </div>
    `
    // 用 fetch 問 http://localhost:8080/todolist 拎 data，拎完，將 data 放入 variable "res"內。記得要await，因為拎data要時間，要等。
    // fetch食兩個 parameter, fetch(a,b) -> a 是網址，b 是設定（以object格式表達）, 若果用 'GET'的方法取資料，可以唔寫設定都得： fetch('http://localhost:8080/todolist')
    const res = await fetch('http://localhost:8080/todolist',
        {
            method: 'GET'
        })

    // sever 處理要求後，會將相關資料以 json 格式 send返俾你(這個例子，回覆的內容放在 res 內)，你要將資料用 .json() 拆解 json，記得要加 await 
    const dataArr = await res.json()

    // 拆解 json 後，data本身是array，所以用for loop將它分開，再砌成html格式，直接用.innerHTML，放入displayDataArea 內
    for (let i = 0; i < dataArr.length; i++) {
        displayDataArea.innerHTML += `
        <form id='data-detail-form'>
            <div id='data-${i}' class='data-field'>
            <div class='id'>${dataArr[i].id}</div>
            <div class="name">${dataArr[i].name}</div>
            <div class="description">${dataArr[i].description}</div>
            <div class="assigned-to">${dataArr[i].assignedto}</div>
            <div class="due-date">${dataArr[i].duedate}</div>
            <div class="status">${dataArr[i].status}</div>
            <div class="button update" id="${dataArr[i].id}">UPDATE</div>
            <div class="button delete" id="${dataArr[i].id}">DELETE</div>
            </div>
        </form>
        `
    }
    const updateButtons = document.querySelectorAll('.button.update')
    for (let updateButton of updateButtons) {
        updateButton.addEventListener('click', () => {
            updateItem(updateButton.id)
        })
    }
    const deleteButtons = document.querySelectorAll('.button.delete')
    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', () => {
            deleteItem(deleteButton.id)
        })
    }


}

// 要先設定好function才，可以用。 addEventListener(a, b) -> a 是引發的行動，b是行動被引發後，要執行的function
showButton.addEventListener('click', showData)








// add data
// show data input table
// 用querySelector揀了 add-button，然後加eventListener，當按add-button一下，就會顯項 data-form 入資料，再按就消失
document.querySelector('#add-button').addEventListener('click', () => {
    if (document.querySelector('#data-form').style.display === 'none') {
        document.querySelector('#data-form').style.display = 'flex'
    } else {
        document.querySelector('#data-form').style.display = 'none'
    };
})

// 在加data的form裏面，加eventListener，改用javascript fetch做 add data.
document.querySelector('#data-form').addEventListener('submit', async (event) => {

    // 停止原先form submission的動作
    event.preventDefault();

    // 用form 這個variable 裝住個form
    const form = event.target

    // 砌一個 object 用來放 data ，配合server要的data
    const dataObj = {
        id: form.id.value,
        name: form.name.value,
        description: form.description.value,
        assignedto: form.assignedto.value,
        duedate: form.duedate.value,
        status: form.status.value
    }

    // 用fetch的 POST 來送資料去server。
    const res = await fetch('http://localhost:8080/todolist',
        {
            method: 'POST',
            // POST，要加headers。如以json格式送出，Content-Type設定要配合返
            headers: {
                'Content-Type': 'application/json'
            },
            // 送出的資料放在body內。但要以JSON.stringify()來將object轉為json格式
            body: JSON.stringify(dataObj)
        })

    // 如果資料成功送了去server，res.ok就會等如true
    if (res.ok) {
        console.log(await res.json())
        showData()
    }
})

// 隱藏及顯示navbar
const navBar = document.querySelector('.nav-bar')
document.querySelector('#nav-bar-button').addEventListener('click', () => {
    if (navBar.style.width === '0px') {
        navBar.style.width = "200px"
    } else {
        navBar.style.width = "0px"
    }
})



const updateItem = async (id) => {
    let res = await fetch('http://localhost:8080/todolist')
    let selectedItem = {}
    let updatedItem = {}
    let resArr = await res.json()
    for (let resItem of resArr){
        if (resItem.id === id){
            selectedItem = {...resItem}
        }
    }
    document.querySelector('#display-data-area').innerHTML = `
    <form id='update-form'>
    <input type='text' name='id' value="${selectedItem.id}">
    <input type='text' name='name' value="${selectedItem.name}">
    <input type='text' name='description' value="${selectedItem.description}">
    <input type='text' name='assignedto' value= "${selectedItem.assignedto}">
    <input type='text' name='duedate' value="${selectedItem.duedate}">
    <input type='text' name='status' value="${selectedItem.status}">
    <button class='button' >UPDATE</button>
    </form>
    `
    document.querySelector('#update-form').addEventListener('submit', (event) => {
        event.preventDefault();
        updatedItem.id = event.target.id.value
        updatedItem.name = event.target.name.value
        updatedItem.description = event.target.description.value
        updatedItem.assignedto = event.target.assignedto.value
        updatedItem.duedate = event.target.duedate.value
        updatedItem.status = event.target.status.value
        performUpdate(updatedItem)
    })
}

const performUpdate = async (data) => {
    let dataObj = {
        id: data.id,
        name: data.name,
        description: data.description,
        assignedto: data.assignedto,
        duedate: data.duedate,
        status: data.status
    }
    const url = 'http://localhost:8080/todolist/' + data.id
    let res = await fetch(url, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataObj)
    })
    if(res.ok){
        document.querySelector('#display-data-area').innerHTML = `
        <div>Item ${data.id} is updated</div>
        <div id='data-${data.id}' class='data-field'>
        <div class='id'>ID: ${data.id}</div>
        <div class="name">Name: ${data.name}</div>
        <div class="description">Description: ${data.description}</div>
        <div class="assigned-to">Assigned To: ${data.assignedto}</div>
        <div class="due-date">DUE Date: ${data.duedate}</div>
        <div class="status">Status: ${data.status}</div>
        </div>
        `
    }
}

const deleteItem = async (id) => {
    const url = 'http://localhost:8080/todolist/' + id
    const setting = {
        method: 'DELETE'
    }
    const res = await fetch(url, setting)
    // if(res.status === 200) is the same as if(res.ok)
    if(res.ok){
        document.querySelector('#display-data-area').innerHTML = "<div> item: " + id +" is deleted.</div>"
    }
}