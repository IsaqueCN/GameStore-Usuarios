// É necessário mostrar os dados do usuário
let formDiv = document.getElementById("formDiv");
let saveButton = document.getElementById("alterarButton");
let emailInput = document.getElementById("emailInput");
let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let addressInput = document.getElementById("addressInput");
let usernameText = document.getElementById("usernameText");
let logoutButton = document.getElementById("sair-Button");
let textErrors = {
    "username": [document.getElementById("errorUsername"), usernameInput.parentElement],
    "password": [document.getElementById("errorPassword"), passwordInput.parentElement],
    "email": [document.getElementById("errorEmail"), emailInput.parentElement]
}

let Cadastros; // Objeto que contem todas as contas
try {
    Cadastros = JSON.parse(localStorage.Cadastros);
} catch {
    Cadastros = {};
    localStorage.setItem("Cadastros", JSON.stringify(Cadastros));
}

let Credentials = JSON.parse(localStorage.getItem("Credentials"));

//Se a pessoa não está logada em uma conta redirecionar ela para a página de Login
if (
    !Cadastros[Credentials.name] ||
    Cadastros[Credentials.name]["senha"] != Credentials.senha
) {
    localStorage.setItem("Credentials", JSON.stringify({}));
    window.location.href = "../LoginPage/index.html";
} else {
    usernameText.textContent = Credentials["unchangedname"];
    usernameInput.value = Credentials["unchangedname"];
    emailInput.value = Cadastros[Credentials.name]["email"];
    if (Cadastros[Credentials.name]["address"] != "undefined") {
        addressInput.value = Cadastros[Credentials.name]["address"] ?? "";
    }
}

function checkUsername() {
    if (usernameInput.value.length <= 3) {
        textError("Username", "Nome Muito Pequeno!");
        return false;
    } else if (usernameInput.value.length >= 13) {
        textError("Username", "Nome Muito Grande!");
        return false;
    } else if (Cadastros[usernameInput.value.toLowerCase()] && usernameInput.value.toLowerCase() != Credentials.name) {
        textError("Username", "Nome Já Existente!");
        return false;
    } else {
        return true;
    }
}

function checkPassword() {
    if (passwordInput.value != "") {
        if (passwordInput.value.length <= 6) {
            textError("Password", "Senha Muito Curta!");
            return false;
        } else if (/\d/.test(passwordInput.value) == false) {
            textError("Password", "Senha Deve Ter Números!");
            return false;
        } else if (
            /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(passwordInput.value) ==
            false
        ) {
            textError("Password", "Senha Deve Ter Caracteres Especiais!");
            return false;
        }
    }
    return true;
}

function checkEmail() {
    //Regex para validação de e-mail retirado de: https://regexr.com/3e48o
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailInput.value) == false) {
        textError("Email", "Email Inválido");
        return false;
    } else {
        return true;
    }
}

function resetErrors() {
    for (let element in textErrors) {
        textErrors[element][0].style.setProperty("display", "none", "important");
        textErrors[element][0].style.setProperty("border", "none", "");
    }
}
function textError(type, text) {
    let errorDiv = textErrors[type.toLowerCase()][0];
    let normalDiv = textErrors[type.toLowerCase()][1]

    errorDiv.style.setProperty("display", "flex", "important");
    normalDiv.style.setProperty("border", "red 2px solid", "important")

    let errorText = errorDiv.children[0];
    errorText.textContent = text;
    console.log(errorText)
}

formDiv.addEventListener("submit", function (e) {
    e.preventDefault();
    resetErrors();
    let usernameCheck = checkUsername();
    let passwordCheck = checkPassword();
    let emailCheck = checkEmail();

    console.log( usernameCheck, passwordCheck, emailCheck)
    if (passwordCheck && usernameCheck && emailCheck) {

        //Setar username
        if (usernameInput.value.toLowerCase() != Credentials.name) {
            Object.defineProperty(Cadastros, usernameInput.value.toLowerCase(), Object.getOwnPropertyDescriptor(Cadastros, Credentials.name))
            console.log(Cadastros)
            delete Cadastros[Credentials.name];

            console.log(Cadastros);
            Credentials.name = usernameInput.value.toLowerCase();
            console.log(Cadastros[Credentials.name]);

            Credentials.unchangedname = usernameInput.value;
        }

        //Setar password
        if (passwordInput.value != "") {
            Cadastros[Credentials.name]["senha"] = passwordInput.value;
            Credentials.senha = passwordInput.value;
        }

        //Setar email

        Cadastros[Credentials.name].email = emailInput.value;

        //Setar address

        Cadastros[Credentials.name]["address"] = addressInput.value;

        // Atualizar no banco de dados
        localStorage.setItem("Credentials", JSON.stringify(Credentials));
        localStorage.setItem("Cadastros", JSON.stringify(Cadastros));
        window.location.reload();
    }
});

logoutButton.addEventListener("click", () => {
    // Sair da conta atual (Remover as credenciais e redirecionar para a página de login)
    localStorage.setItem("Credentials", JSON.stringify({}));
    window.location.href = "../LoginPage/index.html";
});