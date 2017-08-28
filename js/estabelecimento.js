function carregar(){
    if ( localStorage.autenticado == "s") {
        carregarListaEstabelecimento();
    } else {
        window.location.href = 'login.html';
    }
}

function carregarListaEstabelecimento() {
    $.get(localStorage.servidor + "/consultarEstabelecimentosPorUsuario?usuario=" + localStorage.email).done(function (msg) {
        $('#listview').empty();
        localStorage.lista_estabelecimentos = JSON.stringify(msg);
        for (var i = 0; i < msg.length; i++) {
            var estabelecimento = 
            '<li>' +
                '<a href="#" class="texto-azul" onclick="selecionar(' + msg[i].id + ', \''+ msg[i].nome +'\');">' + msg[i].nome + '</a>'
            '</li>';

            $('#listview').append(estabelecimento);
        }
        $('#listview').listview('refresh');
    }).fail(function(msg) {
        alert('Ocorreu um erro ao consultar os estabelecimentos. Por favor tente novamente.');
    });
}


function selecionar(estabelecimento_id, estabelecimento_nome) {
    localStorage.estabelecimento_id = estabelecimento_id;
    localStorage.estabelecimento_nome = estabelecimento_nome;
    window.location.href = 'produto.html';
}