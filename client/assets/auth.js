const uri = window.location.pathname;

if((uri.indexOf('login.html') < 0)){

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
}

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.href = 'login.html';
}

function signIn(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://localhost:8000/login', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', data.data.user.name);

        window.location.href = "index.html";
    })
    .catch(error => console.error('Error:', error));
}