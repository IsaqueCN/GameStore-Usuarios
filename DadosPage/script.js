// É necessário fazer uma funcionalidade de sair do site
// É necessário fazer uma funcionalidade de um texto de error aparecer quando errar
// É necessário mostrar os dados do usuário

let saveButton = document.getElementById("save-button");
let emailInput = document.getElementById("email");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let usernameText = document.getElementById("usernameText");

let Cadastros; // Onde será guardado todas as contas
try {
    Cadastros = JSON.parse(localStorage.Cadastros)
} catch {
    Cadastros = {}
    localStorage.setItem("Cadastros", JSON.stringify(Cadastros))
}

let Credentials = JSON.parse(localStorage.getItem("Credentials"))

//Se a pessoa não está logada em uma conta
if (!Cadastros[Credentials.name] || (Cadastros[Credentials.name]["senha"] != Credentials.senha)) {
    localStorage.setItem("Credentials", JSON.stringify({}))
    window.location.href = "../LoginPage/index.html"
} else {
    console.log(Credentials)
    usernameText.textContent = Credentials["unchangedname"];
}

// FUNCIONALIDADE PARA SAIR DA CONTA
/* 
sairLink.addEventListener("click", () => {
    //Sair da conta atual (Remover as credenciais e atualizar a página)
    localStorage.setItem("Credentials", JSON.stringify({}))
    window.location.reload();
})
*/

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
        textError("Password", "Senha Muito Curta!");
        return false;
    } else if (/\d/.test(passwordInput.value) == false) {
        textError("Password", "Senha Deve Ter Números!");
        return false;
    } else if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(passwordInput.value) == false) {
        textError("Password", "Senha Deve Ter Caracteres Especiais!");
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

function textError(errorElement, errorMessage) {
    console.log(`Erro em ${errorElement.name}, mensagem: ${errorMessage}`)
}

saveButton.addEventListener("click", () => {
    //resetErrors();
    let usernameCheck = checkUsername();
    let passwordCheck = checkPassword();
    let emailCheck = checkEmail();

    if (usernameCheck && passwordCheck && emailCheck) {
        //Se estiver tudo certo
        Cadastros[usernameInput.value.toLowerCase()] = {
            "senha": passwordInput.value,
            "email": emailInput.value 
        }
        localStorage.setItem("Cadastros", JSON.stringify(Cadastros))
        saveButton.value = "Atualizado!"
        
        localStorage.setItem("Credentials", JSON.stringify({
            "unchangedname": usernameInput.value,
            "name": usernameInput.value.toLowerCase(),
            "senha": passwordInput.value,
        }))

        //Aguardar 2 segundos e ir para a página de acesso
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
});