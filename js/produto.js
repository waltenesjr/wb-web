function carregar() {
	$(document).ready(function() {
		$("#estabelecimento").text(localStorage.estabelecimento_nome);
	});
    listar();
}

function listar() {
	$(document).ready(function() {
		var estabelecimento_id = localStorage.estabelecimento_id;
		$.get(localStorage.servidor + "/avencer.json?estabelecimento_id=" + estabelecimento_id).done(function (msg) {
	        var listview = $('#listview');
	        var popup = $('#popup');
	        var maxHeight = $( window ).height() - 60 + "px";
	        popup.empty();
	        listview.empty();
	        if (msg.length == 0) {
	            $("#nenhumvencido").show();
	        } else {
	            $("#nenhumvencido").hide();
		        for (var i = 0; i < msg.length; i++) {
                	var ano = msg[i].data_vencimento.substr(0, 4);
                	var mes = msg[i].data_vencimento.substr(5, 2);
                	var dia = msg[i].data_vencimento.substr(8, 2);
				  	var novoproduto = 
                    '<li produto="' + msg[i].id + '" >' +
                        '<a href="#popupProduto' + msg[i].id + '" data-rel="popup" data-position-to="window">' +
                            '<img src="data:image/jpeg;base64,' + msg[i].imagem + '" />' +
                            '<p>Data de Validade: </p>' +
                            '<h4>' + dia + '/' + mes + '/' + ano + '</h4>' +
                        '</a>' +
                    '</li>';
	    		    listview.append(novoproduto);

	                var popupproduto = 
		                '<div data-role="popup" id="popupProduto' + msg[i].id + '" class="photopopup" data-overlay-theme="b" data-theme="b" data-corners="false">' +
		                    '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Fechar</a>' + 
		                    '<img src="data:image/jpeg;base64,' + msg[i].imagem + '" style="max-height:'+ maxHeight +'"/>' +
		                '</div>';
	                popup.after(popupproduto);

	                $("#popupProduto" + msg[i].id ).enhanceWithin().popup();
		        }
		    }
			listview.listview('refresh');
	    }).fail(function(msg) {
	    	alert('Ocorreu um erro ao listar os produtos a vencer. Por favor tente novamente.');
	    });
	});
}