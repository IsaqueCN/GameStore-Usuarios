// É necessário mostrar os dados do usuário

let saveButton = document.getElementById("save-button");
let emailInput = document.getElementById("email");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let addressInput = document.getElementById("address");
let usernameText = document.getElementById("usernameText");
let logoutButton = document.getElementById("logout-button");
logoutButton.style.display = "none";

let Cadastros; // Objeto que contem todas as contas
try {
    Cadastros = JSON.parse(localStorage.Cadastros)
} catch {
    Cadastros = {}
    localStorage.setItem("Cadastros", JSON.stringify(Cadastros))
}

let Credentials = JSON.parse(localStorage.getItem("Credentials"))

//Se a pessoa não está logada em uma conta redirecionar ela para a página de Login
if (!Cadastros[Credentials.name] || (Cadastros[Credentials.name]["senha"] != Credentials.senha)) {
    localStorage.setItem("Credentials", JSON.stringify({}))
    window.location.href = "../LoginPage/index.html"
} else {
    console.log(Credentials)
    usernameText.textContent = Credentials["unchangedname"];
    usernameInput.value = Credentials["unchangedname"];
    emailInput.value = Cadastros[Credentials.name]["email"];
    addressInput.value = Cadastros[Credentials.name]["address"];
}

function toggleLogout() {
    if (logoutButton.style.display === "none") {
        logoutButton.style.display = "block";
    } else {
        logoutButton.style.display = "none";
    }
}

function alterarCampo(campo) {
    let input = document.getElementById(campo);
    input.readOnly = false;
    input.focus();
}

function checkUsername() {
    if (usernameInput.value.length <= 3) {
        textError("Username", "Nome Muito Pequeno!")
        return false;
    } else if (usernameInput.value.length >= 13) {
        textError("Username", "Nome Muito Grande!")
        return false;
    } else if(Cadastros[usernameInput.value.toLowerCase()]) {
        textError("Username", "Nome Já Existente!")
        return false;
    } else {
        return true;
    }
}

function checkPassword() {
    if (passwordInput.value.length <= 6) {
        textError("Password", "Senha Muito Pequena!")
        return false;
    } else {
        return true;
    }
}

function checkEmail() {
    //Regex para validação de e-mail retirado de: https://regexr.com/3e48o
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailInput.value) == false) {
        textError("Email", "Email Inválido")
    } else {
        return true;
    }
}

function textError(type, text) {
    let ele;
    if (type == "Password") {
        ele = document.getElementById("password")
    } else if (type == "Username") {
        ele = document.getElementById("username")
    } else {
        ele = document.getElementById("email")
    }
    if (!document.getElementById(`error-message-${type}`)) {
        let errorMessage = document.createElement("div");
        errorMessage.textContent = text;
        errorMessage.className = "error-message"
        errorMessage.id = `error-message-${type}`
        ele.insertAdjacentElement("afterend", errorMessage)
    } else {
        document.getElementById(`error-message-${type}`).textContent = text;
    }
}

saveButton.addEventListener("click", () => {
    // Username
    if (usernameInput.value.toLowerCase() != Credentials.name) {
        if (checkUsername()) {
            Cadastros[usernameInput.value.toLowerCase()] = Cadastros[Credentials.name];
            delete Cadastros[Credentials.name];
            Credentials.name = usernameInput.value.toLowerCase();
            localStorage.setItem("Credentials", JSON.stringify(Credentials));
            localStorage.setItem("Cadastros", JSON.stringify(Cadastros));
            window.location.reload();
        } else {
            return
        }
    }

    // Password
    if (passwordInput.value.length >= 1) {
        if (checkPassword()) {
            Cadastros[Credentials.name]["senha"] = passwordInput.value;
            Credentials.senha = passwordInput.value;
            localStorage.setItem("Credentials", JSON.stringify(Credentials))
            localStorage.setItem("Cadastros", JSON.stringify(Cadastros))
            window.location.reload();
        } else {
            return
        }
    }

    if (emailInput.value != Cadastros[Credentials.name]["email"]) {
        Cadastros[Credentials.name]["email"] = emailInput.value
        localStorage.setItem("Cadastros", JSON.stringify(Cadastros))
        window.location.reload();
    }

    if (addressInput.value != Cadastros[Credentials.name]["address"]) {
        Cadastros[Credentials.name]["address"] = addressInput.value
        localStorage.setItem("Cadastros", JSON.stringify(Cadastros))
        window.location.reload();
    }
});

logoutButton.addEventListener("click", () => {
    // Sair da conta atual (Remover as credenciais e redirecionar para a página de login)
    localStorage.setItem("Credentials", JSON.stringify({}))
    window.location.href = "../LoginPage/index.html
