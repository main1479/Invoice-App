import View from './view.js';

class InvoiceView extends View {
	_parentEl = document.querySelector('.invoice__view');
	_backBtn = document.querySelector('.back');
	_invoiceList = document.querySelector('.invoice__list--wrapper');
	_invoiceView = document.querySelector('.invoice__view--wrapper');

	constructor() {
		super();
		this.handlerInvoiceClick(this._invoiceView);
		this.handlerBackBtn();
	}

	handlerEvents(handler) {
		['hashchange', 'load'].forEach((event) => {
			window.addEventListener(event, handler);
		});
	}

	handlerInitialLoad(data) {
		const id = window.location.hash.slice(1);
		if (!id) return;
		const checker = data.findIndex((item) => item.id === id);
		console.log(checker);
		if (checker !== -1) {
			this._invoiceList.classList.remove('active');
			this._invoiceView.classList.add('active');
		}
	}

	handlerInvoiceClick(invoiceView) {
		this._invoiceList.addEventListener('click', function (e) {
			const invoice = e.target.closest('.invoice');
			if (!invoice) return;

			this.classList.remove('active');
			invoiceView.classList.add('active');
		});
	}

	back() {
		window.history.back();
		this._invoiceView.classList.remove('active');
		this._invoiceList.classList.add('active');
	}

	handlerBackBtn() {
		this._backBtn.addEventListener('click', this.back.bind(this));
	}

	_generateMarkup() {
		return `
         <div class="invoice__view--header">
            <div class="status">
               <span>Status</span>
               <div class="invoice__status ${this._data.status}">${this._data.status}</div>
            </div>
            <button class="btn btn__edit" data-id="${this._data.id}">edit</button>
            <button class="btn btn__delete" data-id="${this._data.id}">delete</button>
            ${
							this._data.status !== 'paid'
								? `<button class="btn btn__mark" data-id="${this._data.id}">mark as paid</button>`
								: ''
						}
         </div>

         <div class="invoice__view-box">
            <div class="invoice__view-box--top">
               <div class="left">
                  <h4 class="heading invoice__id"><span>#</span>${this._data.id}</h4>
                  <p class="p__text invoice__description">${this._data.description}</p>
               </div>
               <div class="right">
                  <p class="p__text street">${this._data.senderAddress.street}</p>
                  <p class="p__text city">${this._data.senderAddress.city}</p>
                  <p class="p__text post-code">${this._data.senderAddress.postCode}</p>
                  <p class="p__text country">${this._data.senderAddress.country}</p>
               </div>
            </div>
            <div class="invoice__view-box--middle">
               <div class="date">
                  <div class="invoice__date">
                     <p class="p__text">Invoice Date</p>
                     <h4 class="heading">${this._data.createdAt}</h4>
                  </div>
                  <div class="payment__date">
                     <p class="p__text">Payment Due</p>
                     <h4 class="heading">${this._data.paymentDue}</h4>
                  </div>
               </div>

               <div class="bill-to">
                  <p class="p__text">Bill To</p>
                  <h4 class="heading client__name">${this._data.clientName}</h4>
                  <p class="p__text street">${this._data.clientAddress.street}</p>
                  <p class="p__text city">${this._data.clientAddress.city}</p>
                  <p class="p__text post-code">${this._data.clientAddress.postCode}</p>
                  <p class="p__text country">${this._data.clientAddress.country}</p>
               </div>
               <div class="sent-to">
                  <p class="p__text">Sent To</p>
                  <h4 class="heading">${this._data.clientEmail}</h4>
               </div>
            </div>

            <div class="invoice__view-box--bottom">
               <table class="invoice__items">
                  <thead class="invoice__items--heading">
                     <tr>
                        <th>Item Name</th>
                        <th>QTY.</th>
                        <th>Price</th>
                        <th>Total</th>
                     </tr>
                  </thead>
                  <tbody class="invoice__item">
                     ${this._generateItemsMarkup()}
                  </tbody>
                  <tfoot class="invoice__footer">
                     <tr>
                        <th class="amount-due">Amount Due</th>
                        <td class="empty"></td>
                        <td class="empty"></td>
                        <td class="total__price">£${this._data.total}</td>
                     </tr>
                  </tfoot>
               </table>
            </div>
         </div>
      `;
	}

	_generateItemsMarkup() {
		return this._data.items
			.map((item) => {
				return `
            <tr>
               <td class="item__name">${item.name}</td>
               <td class="quantity">${item.quantity}</td>
               <td class="price">£${item.price}</td>
               <td class="total">£${+item.price * +item.quantity}</td>
            </tr>
         `;
			})
			.join('');
	}

	handlerDeleteInvoice(handler) {
		this._invoiceView.addEventListener('click', function (e) {
			const btn = e.target.closest('.btn__delete');
			if (!btn) return;
			const id = btn.dataset.id;
			handler(id);
		});
	}
   
	handlerMarkAsPaid(handler) {
		this._invoiceView.addEventListener('click', function (e) {
			const btn = e.target.closest('.btn__mark');
			if (!btn) return;
			const id = btn.dataset.id;
			handler(id);
		});
	}
}

export default new InvoiceView();
