function Message(text){
	this.text = text 
}

Message.messages = [];

Message.crear = function() {
	var text = document.getElementById('messagetext').value;
	var date = Date();
	var id = document.getElementById('messagetext').value.length-1;

	var message = new Message(text, date, id);
	Message.messages.push(message);
	console.log ('-- Guardado mensaje con texto: "' + Message.messages[Message.messages.length-1].text + ' "');
	Message.guardar();
	Message.limpiar();
	Message.mostrar();
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

Message.borrar = function () {

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

	if (keycode == 13) {
		Message.crear();
		return false;
		}
	else if (keycode == 27) {
		Message.limpiar();
		return false;
		}
	else
	   return true;
};

function clearall()  // función de limpiar todo el localStorage porque usar la consola es de ñoños.
{
	localStorage.clear();
	location.reload();

} 

Message.obtenerMessages();
