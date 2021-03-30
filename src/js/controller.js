import * as model from './model.js';
import invoiceListView from './views/invoiceListView.js';
import invoiceView from './views/invoiceView.js';


const controlLoadInvoices = function(){
   model.Invoices()
   invoiceListView.render(model.state.invoices)
}

const controlInvoice = function(){
   const id = window.location.hash.slice(1);
   if(!id) return;
   model.setInvoice(id);
   invoiceView.render(model.state.invoice)
}

const controlDeleteInvoice = function(id){
   model.deleteInvoice(id);
   invoiceView.back()
   invoiceListView.render(model.state.invoices)
}

const controlMarkAsPaid = function(id){
   model.markAsPaid(id);
   invoiceListView.render(model.state.invoices);
   invoiceView.render(model.state.invoice);
}





const init = function(){
   controlLoadInvoices()
   invoiceView.handlerInitialLoad(model.state.invoices)
   invoiceView.handlerEvents(controlInvoice);
   invoiceView.handlerDeleteInvoice(controlDeleteInvoice);
   invoiceView.handlerMarkAsPaid(controlMarkAsPaid)
}

init()