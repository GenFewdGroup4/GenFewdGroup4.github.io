const accountInfo = document.querySelector('#accountInfo ')

dataForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const form = event.target
    const dataObj = {
        username: form.username.value,
        password: form.password.value
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