// Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
	console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
	console.log('Desconectado del servidor');
});

socket.on('estadoActual', function (data) {
	label.text(data.actual);
});

// socket.on('siguienteTicket', function (data) {
// 	console.log('SIGUIENTE TICKET: ', data);
// });

$('button').on('click', function () {
	socket.emit('siguienteTicket', null, function (siguienteTicket) {
		label.text(siguienteTicket);
	});
});
