
$(document).ready(function(){
	var orderCard = [];
	var index = 0;

	// var MXNUSD = 0;
	// var setRate = function(data) {
	//   fx.rates = data.rates;
	//   MXNUSD = fx(1).from("USD").to("MXN");
	//   console.log(MXNUSD);
	// }
	// $.getJSON("https://api.fixer.io/latest", setRate);

	var container = $("#Container");
	var mixer = container.mixItUp();
	/*Amount you send from USD, which excludes the transaction fee*/
	var amount_send;

	function sortFunction(a,b){
		if(a[0] === b[0]){
			return 0;
		}
		else{
			return(a[0] < b[0])? 1:-1;
		}
	}


	var confirmListener = function(id){
		amount_send = $("#amount_send").val();
		if(! $.isNumeric(amount_send) || amount_send <= 0){
			$('html,body').animate({scrollTop:$("#banner").offset().top},800);
			alert("Ingrese un número positivo en el campo 'Cantidad' antes de configurar opciones");
			return false;
		}

		var name = $("#"+id+"_name").val();
		var fee = $("#"+id+"_fee").val();
		var rate = $("#"+id+"_rate").val();

		if(!name){
			alert("Introduzca un nombre de opción");
			return false;
		}

		if(! $.isNumeric(fee)){
			alert("Ingrese un número en el campo 'Tarifa de transacción'");
			return false;
		}

		if(! $.isNumeric(rate) || rate <= 0){
			alert("Introduzca un número positivo en el campo 'Tipo de cambio'");
			return false;
		}
		container.empty();
		
		var card = $("<div/>",{'class': "filimg mix col-md-4 col-sm-4 col-xs-12 card category-1"});
		var cardName = $("<h3/>").text(name);
		var cardTable = $("<table/>",{'class':"card_table"});
		var mxnget_row = $("<tr/>",{'class':"card_row"});
		var mxnget_label = $("<td/>",{'class':"card_cell"});
		var mxnget_label_h3 = $("<h3/>").text("Receptor recibe (MXN):");
		var mxnget_cell = $("<td/>",{'class':"card_cell"});
		var mxnget_cell_h3 = $("<h3/>");
		var mxnget_cell_b = $("<b/>");
		var actrate_row = $("<tr/>",{'class':"card_row"});
		var actrate_label = $("<td/>",{'class':"card_cell"});
		var breakline = $("<br/>");
		var actrate_label_h3 = $("<h3/>").text("Tipo de cambio efectivo").append(breakline).append("(entre más alto mejor)");
		var actrate_cell = $("<td/>",{'class':"card_cell"});
		var actrate_cell_h3 = $("<h3/>");
		var actrate_cell_b = $("<b/>");
	
		var mxnGet = amount_send * rate;
		var actRate = mxnGet/(Number(amount_send)+Number(fee));
		console.log(mxnGet + "   "+ (Number(amount_send)+Number(fee)));

		mxnget_label.append(mxnget_label_h3);
		mxnget_cell_b.text(mxnGet.toFixed(2));
		mxnget_cell_h3.append(mxnget_cell_b);
		mxnget_cell.append(mxnget_cell_h3);
		actrate_label.append(actrate_label_h3);
		actrate_cell_b.text(actRate.toFixed(4));
		actrate_cell_h3.append(actrate_cell_b);
		actrate_cell.append(actrate_cell_h3);

		mxnget_row.append(mxnget_label).append(mxnget_cell);
		actrate_row.append(actrate_label).append(actrate_cell);
		cardTable.append(actrate_row).append(mxnget_row);
		card.append(cardName).append(cardTable);

		orderCard.push([actRate,card]);

		orderCard.sort(sortFunction);
		

		var addcard = $("<div/>",{'class': "mix col-md-4 col-sm-4 col-xs-12 card addcard category-1"}).click(function(){
			addcardListener();
		});

		container.mixItUp('insert',0, addcard, {filter: "all"});

		for(var i = 1; i <= orderCard.length; i++){
			container.mixItUp('insert',i ,orderCard[i-1][1], {filter: "all"});
		}

	}

	var addcardListener = function(){
		var id = index;

		var card = $("<div/>",{'class': "filimg mix col-md-4 col-sm-4 col-xs-12 card category-1", 'id':id+"_card"});
		var cardTable = $("<table/>",{'class':"card_table"});
		var name_row = $("<tr/>",{'class':"card_row"});
		var name_label = $("<td/>",{'class':"card_cell"}).text("Nombre de la Empresa");
		var name_cell = $("<td/>",{'class':"card_cell"});
		var name_input = $("<input/>",{'type':"text",'id':id+"_name",'placeholder':"Nombre de la Empresa"});
		name_cell.append(name_input);
		name_row.append(name_label).append(name_cell);

		var fee_row = $("<tr/>",{'class':"card_row"});
		var fee_label = $("<td/>",{'class':"card_cell"}).text("Comisión");
		var fee_cell = $("<td/>",{'class':"card_cell"});
		var fee_input = $("<input/>",{'type':"text",'id':id+"_fee",'placeholder':"USD"});
		fee_cell.append(fee_input);
		fee_row.append(fee_label).append(fee_cell);

		var rate_row = $("<tr/>",{'class':"card_row"});
		var rate_label = $("<td/>",{'class':"card_cell"}).text("Tipo de Cambio");
		var rate_cell = $("<td/>",{'class':"card_cell"});
		var rate_input = $("<input/>",{'type':"text",'id':id+"_rate",'placeholder':"1 USD = ? MXN"});
		rate_cell.append(rate_input);
		rate_row.append(rate_label).append(rate_cell)

		cardTable.append(name_row).append(fee_row).append(rate_row);

		var confirm_button = $("<button/>",{'id':index+"_confirm"}).text("Calcular").click(function(){
			confirmListener(id);
		});
		
		card.append(cardTable).append(confirm_button);
		$(".addcard").remove();

		 $("#Container").mixItUp('insert',0 ,card, {filter: "all"});
		index++;
	}

	$(".addcard").click(function(){
		addcardListener();
	});

	$("#search").click(function(){
		$('html,body').animate({scrollTop:$("#table").offset().top},800);
	})
});

