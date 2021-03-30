import data from './data.json';

export const state = {
	invoice: {},
	invoices: [],
	paidInvoices: [],
	pendingInvoices: [],
	draftInvoices: [],
};

export const Invoices = function(){
   if(state.invoices.length === 0){
      state.invoices = data;
   }
}

export const setInvoice = function(id){
	state.invoice = state.invoices.find(item => item.id === id);
	console.log(state.invoice);
}

export const deleteInvoice = function(id){
	const index = state.invoices.findIndex(item => item.id === id)
	state.invoices.splice(index, 1);
}

export const markAsPaid = function(id){
	state.invoices.forEach(item => {
		if(item.id === id) item.status = 'paid';
	})
}

