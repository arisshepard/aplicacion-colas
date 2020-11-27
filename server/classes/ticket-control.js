const fs = require('fs');

class Ticket {
	constructor(numero, mostrador) {
		this.numero = numero;
		this.mostrador = mostrador;
	}
}

class TicketControl {
	constructor() {
		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.ultimos4 = [];

		let data = require('../data/data.json');
		// console.log('Tickets: ', this.tickets);
		if (data.hoy === this.hoy) {
			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimos4 = data.ultimos4;
		} else {
			this.grabarDatos();
		}
	}

	atenderTicket(mostrador) {
		// console.log('DATOS RAROS 1: ', this.ultimos4);

		if (this.tickets.length === 0) {
			return { ok: false, message: 'No hay más tickets' };
		}

		let numeroTicket = this.tickets[0].numero;

		// eliminar el primer elemento
		this.tickets.shift();

		let atenderTicket = new Ticket(numeroTicket, mostrador);

		// console.log('ATENDER TICKET: ', atenderTicket);

		// agregar al inicio del array
		this.ultimos4.unshift(atenderTicket);

		if (this.ultimos4.length > 4) {
			// borrar el último elemento
			this.ultimos4.splice(-1, 1);
		}

		this.grabarDatos();

		// console.log('DATOS RAROS 3: ', this.ultimos4);

		return atenderTicket;
	}

	getUltimos4() {
		return this.ultimos4;
	}

	getUltimoTicket() {
		return `Ticket ${this.ultimo}`;
	}

	grabarDatos() {
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ultimos4: this.ultimos4,
		};

		let jsonDataString = JSON.stringify(jsonData);

		fs.writeFileSync('./server/data/data.json', jsonDataString);

		// console.log('Se ha inicializado el sistema');
	}

	siguienteTicket() {
		this.ultimo += 1;

		let ticket = new Ticket(this.ultimo, null);
		this.tickets.push(ticket);

		this.grabarDatos();

		return `Ticket ${this.ultimo}`;
	}

	reiniciarConteo() {
		this.ultimo = 0;
		this.tickets = [];
		this.ultimos4 = [];
		this.grabarDatos();
	}
}

module.exports = { TicketControl };
