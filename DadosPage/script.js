function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function saveUserData() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const changes = [];
    const userData = {
        username: username,
        password: password,
        email: email,
        address: address
    };

    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    if (email && !validateEmail(email)) {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        errorMessage.innerText = 'E-mail inválido';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    if (username) {
        changes.push('Nome de usuario salvo com sucesso');
    }
    if (password) {
        changes.push('Senha salva com sucesso');
    }
    if (email) {
        changes.push('E-mail salvo com sucesso');
    }
    if (address) {
        changes.push('Endereço salvo com sucesso');
    }

    if (changes.length > 1) {
        successMessage.innerText = 'Informações salvas com sucesso';
    } else if (changes.length === 1) {
        successMessage.innerText = changes[0];
    } else {
        successMessage.innerText = '';
    }

    if (changes.length > 0) {
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}