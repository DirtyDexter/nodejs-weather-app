const form = document.querySelector('form')
const input = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = input.value
    msg1.textContent = 'Fetching info...'
    msg2.textContent = ''
    fetch('/weather?address='+address).then(response => response.json()).then(data => {
        if (data.error) {
            msg1.textContent = data.error
        } else {
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})