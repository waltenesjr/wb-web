function carregar() {
    localStorage.servidor = "http://www.warningbox.com.br/backend_producao";
    localStorage.autenticado = "n";
}

function entrar(){
    var email = $("#email").val();
    var senha = $("#senha").val();
    var senhaEncriptada = CryptoJS.SHA256(senha).toString();
    
    $.get(localStorage.servidor + "/autenticarUsuario?email=" + email + "&senha=" + senhaEncriptada).done(function (msg) {
        if (msg == '1') {
            localStorage.email = email;
            localStorage.autenticado = "s";
            window.location.href = 'estabelecimento.html';
        } else {
            alert('Senha incorreta.');
        }  
    }).fail(function (msg) {
        alert('Não foi possivel conectar ao servidor. Por favor tente novamente.');
    });
}