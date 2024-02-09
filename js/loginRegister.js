const email = document.getElementById('username');
const password = document.getElementById('password');
const login = document.getElementById('login');

userEmail = localStorage.getItem('email');
userPass = localStorage.getItem('password');
userLogedIn = document.getElementById('userlogedin');

login.addEventListener('click', (e) => {
    e.preventDefault();

    if (email.value != '' && password.value != '') {
        localStorage.setItem('log', 'true');
        if (email.value.trim() === userEmail && password.value.trim() === userPass) {
            setTimeout(() => {
                location.assign('index.html');
                userLogedIn.innerText = localStorage.getItem('user');
                document.querySelector('.userloged').style.display = 'block';
            }, 1000);
        } else {
            alert('Invalid password');
        }
    }
});

const user = document.getElementById('user');
const mail = document.getElementById('mail');
const pass = document.getElementById('pass');
const register = document.getElementById('register');

register.addEventListener('click', (e) => {
    e.preventDefault();
    if (user.value != '' && mail.value != '' && pass.value != '') {
        localStorage.setItem('user', user.value.trim());
        localStorage.setItem('email', mail.value.trim());
        localStorage.setItem('password', pass.value.trim());

        setTimeout(() => {
            location.assign('index.html');
        
        }, 1000);
    }
});

