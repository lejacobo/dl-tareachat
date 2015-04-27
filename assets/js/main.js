function Message(text){
	this.text = text 
}

Message.messages = [];

Message.crear = function() {
	var text = document.getElementById('messagetext').value; /* agregar validación para no guardar texto vacío */
	var date = Date();

	var message = new Message(text, date);
	Message.messages.push(message);
	console.log ('-- Guardado mensaje con texto: "' + Message.messages[Message.messages.length-1].text + ' "');
	Message.mostrar();
	Message.limpiar();
	Message.guardar();
	/* Message.limpiar(); << agregarfunción para limpiar campo */
}

Message.mostrar = function () {
	var areademensajes = '';
	Message.messages.map(function(elemento,indice) {
		areademensajes = areademensajes +
						'<div class="well">' +
						elemento.text + 
						// '<a href="javascript:void(0);" onclick="FUNCIONDEELIMINAR();"' +
						'<span class="glyphicon glyphicon glyphicon-remove pull-right" aria-hidden="true"' +

						'onclick=""></span></div>'
						
	});
	document.getElementById('areademensajes').innerHTML = areademensajes;
	}

Message.limpiar = function() {
	document.getElementById('messagetext').value = '';
};


Message.guardar = function() {
	var messages = Message.messages;
	var messagesEncoded = JSON.stringify(messages);
	localStorage.setItem ('messages', messagesEncoded);
};
Message.obtenerMessages = function() {
	var messagesEncoded = localStorage.getItem('messages');
	if (messagesEncoded != null ) {
		var messages = JSON.parse(messagesEncoded);
		Message.messages = messages;
		Message.mostrar();
	};

}
/* agregar función de eliminar mensajitos */


function presionaenter(campo,e) // función de enviar con enter
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if (keycode == 13)
	{
	Message.crear();
	return false;
	}
else if (keycode == 27)
	{
	Message.limpiar();
	return true;
	}
else
   return true;
};

Message.obtenerMessages();
