let userText = document.getElementById("textoVerification");
let sairLink = document.getElementById("sairLink");

let Cadastros; // Onde será guardado todas as contas
try {
    Cadastros = JSON.parse(localStorage.Cadastros)
} catch {
    Cadastros = {}
    localStorage.setItem("Cadastros", JSON.stringify(Cadastros))
}

//Onde as credenciais atuais estão armazenadas
let Credentials = JSON.parse(localStorage.getItem("Credentials"))

//Se o nome não existe nos cadastros
if (!Cadastros[Credentials.name]) {
    console.log("Credenciais Incorretas.")
    localStorage.setItem("Credentials", JSON.stringify({}))
} else if (Cadastros[Credentials.name]["senha"] != Credentials.senha){ // Se a senha está incorreta
    console.log("Credenciais Incorretas.")
    localStorage.setItem("Credentials", JSON.stringify({}))
} else {
    userText.textContent = "Você está logado na conta: " + Credentials.unchangedname
    sairLink.classList.remove("d-none")
}

sairLink.addEventListener("click", () => {
    //Sair da conta atual (Remover as credenciais e atualizar a página)
    localStorage.setItem("Credentials", JSON.stringify({}))
    window.location.reload();
})