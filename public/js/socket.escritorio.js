var socket = io();

var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
	window.location = 'index.html';
	throw new Error('El escritorio es necesario');
}

var mostrador = searchParams.get('escritorio');
var label = $('small');

socket.on('connect', function () {
	console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
	console.log('Desconectado del servidor');
});

$('h1').text('Mostrador ' + mostrador);

$('button').on('click', function () {
	socket.emit('atenderTicket', { mostrador: mostrador }, function (resp) {
		// console.log('RESP: ', resp.numero);

		if (resp.message) {
			label.text(resp.message);
			alert(resp.message);
			return;
		}
		label.text('Ticket ' + resp.numero);
	});
});
