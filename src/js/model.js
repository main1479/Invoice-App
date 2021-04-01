import data from './data.json';

export const state = {
	invoice: {},
	invoices: [],
	paidInvoices: [],
	pendingInvoices: [],
	draftInvoices: [],
};

export const Invoices = function () {
	if (state.invoices.length === 0) {
		state.invoices = data;
		console.log(state.invoices);
	}
};

export const setInvoice = function (id) {
	state.invoice = state.invoices.find((item) => item.id === id);
	console.log(state.invoice);
};

export const deleteInvoice = function (id) {
	const index = state.invoices.findIndex((item) => item.id === id);
	state.invoices.splice(index, 1);
};

export const markAsPaid = function (id) {
	state.invoices.forEach((item) => {
		if (item.id === id) item.status = 'paid';
	});
};

export const addInvoice = function (invoice) {
	const targetDate = new Date();
	targetDate.setDate(targetDate.getDate() + +invoice.paymentTerms);

	const date = targetDate.getDate();
	const month = targetDate.getMonth() + 1;
	const year = targetDate.getFullYear();

	// const dateString = `${year}-${month}-${date}`;

	const items = Object.entries(invoice);
	const invoiceItems = [];

	const itemArr = items.filter((item, i) => item[0].startsWith(`items`));
	itemArr.forEach((item, i) => {
		
		console.log(item);
		
	});

	state.invoices.push({
		id: (Date.now() + '').slice(-8),
		createdAt: invoice.createdAt,
		paymentDue: `${year}-${month}-${date}`,
		description: invoice.description,
		paymentTerms: invoice.paymentTerms,
		clientName: invoice.clientName,
		clientEmail: invoice.clientEmail,
		status: invoice.status,
		senderAddress: {
			street: invoice.senderAddress.street,
			city: invoice.senderAddress.city,
			postCode: invoice.senderAddress.postCode,
			country: invoice.senderAddress.country,
		},
		clientAddress: {
			street: invoice.clientAddress.street,
			city: invoice.clientAddress.city,
			postCode: invoice.clientAddress.postCode,
			country: invoice.clientAddress.country,
		},
		items: invoiceItems,
		total: 1800.9,
	});

	console.log(state.invoices);
};

/*
{
		"id": "58423080",
		"createdAt": "2021-08-18",
		"paymentDue": "2021-08-19",
		"description": "Re-branding",
		"paymentTerms": 1,
		"clientName": "Jensen Huang",
		"clientEmail": "jensenh@mail.com",
		"status": "paid",
		"senderAddress": {
			"street": "19 Union Terrace",
			"city": "London",
			"postCode": "E1 3EZ",
			"country": "United Kingdom"
		},
		"clientAddress": {
			"street": "106 Kendell Street",
			"city": "Sharrington",
			"postCode": "NR24 5WQ",
			"country": "United Kingdom"
		},
		"items": [
			{
				"name": "Brand Guidelines",
				"quantity": 1,
				"price": 1800.9,
				"total": 1800.9
			}
		],
		"total": 1800.9
	},
	*/
