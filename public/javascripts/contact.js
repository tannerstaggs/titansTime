
const contactForm = document.querySelector('.needs-validation');
let firstName = document.getElementById('firstNameBox');
let lastName = document.getElementById('lastNameBox');
let email = document.getElementById('emailBox');
let message = document.getElementById('messageBox');

const contactFormListener = contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        if(xhr.responseText == 'success') {
            location.reload();
        } else {
            alert('Something went wrong');
        }
    }

    xhr.send(JSON.stringify(formData));
})


