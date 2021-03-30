import View from './view.js';
import icon from 'url:../../img/icon-arrow-right.svg';

class InvoiceListView extends View {
	_parentEl = document.querySelector('.invoice__lists');
	_invoiceCount = document.querySelector('.invoice__count');

	_generateMarkup() { 
		return this._data
			.map((item) => {
            this._invoiceCount.innerHTML = `There is ${this._data.length === 0? 'no': this._data.length} invoice${this._data.length > 1? 's' : ''}`;
				return `
            <li class="invoice__item">
               <a href="#${item.id}" class="invoice" data-id="${item.id}">
                  <h4 class="invoice__id"><span>#</span>${item.id}</h4>
                  <div class="invoice__date">${item.paymentDue}</div>
                  <div class="client__name">${item.clientName}</div>
                  <div class="invoice__amount">$${item.total}</div>
                  <div class="invoice__status ${item.status}">${item.status}</div>
                  <img src="${icon}" alt="Invoice" class="icon" />
               </a>
            </li>
         `;
			})
			.join('');
	}
}

export default new InvoiceListView();
