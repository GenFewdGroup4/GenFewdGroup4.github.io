const dataForm = document.querySelector('#desktop-text-area')

dataForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const form = event.target
    const dataObj = {
        duedate: form.duedate.value,
        name: form.name.value,
        description: form.description.value,
        assignedto: form.assignedTo.value,
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
})