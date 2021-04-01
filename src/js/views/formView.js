import View from './view.js';

class FormView extends View {
	_parentEl = document.querySelector('.form');
	_btnAdd = document.querySelector('.btn__add');
	_btnAddItem = document.querySelector('.btn__add-item');
	_btnDraft = document.querySelector('.btn__draft');
	_btnDiscard = document.querySelector('.btn__discard');
	_formBox = document.querySelector('.form__box');
	_overlay = document.querySelector('.form-overlay');
	_itemsContainer = document.querySelector('.form__group.items');
	_index = 0;

	constructor() {
		super();
		this._handlerOpenWindow();
		this._handlerCloseWindow();
		this.handlerAddItem();
		this.deleteItem();
	}

	toggleWindow() {
		this._formBox.classList.toggle('active');
		this._overlay.classList.toggle('active');
	}

	_handlerOpenWindow() {
		this._btnAdd.addEventListener('click', this.toggleWindow.bind(this));
	}

	_handlerCloseWindow() {
		// this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
		this._overlay.addEventListener('click', this.toggleWindow.bind(this));
	}

	handlerAddInvoice(handler) {
		this._parentEl.addEventListener('submit', function (e) {
			e.preventDefault();
			const dataArr = [...new FormData(this)];
			const data = Object.fromEntries(dataArr);
			handler(data);
			
		});
	}

	handlerAddItem() {
		this._btnAddItem.addEventListener('click', this._items.bind(this));
	}

	_items() {
		const markup = this._itemsMarkup(this._index);
		
		this._itemsContainer.insertAdjacentHTML('beforeend', markup);
		this._index++;
		
	}

	deleteItem() {
		this._itemsContainer.addEventListener('click', function (e) {
			const btn = e.target.closest('.delete__item');
			if (!btn) return;
			const parent = btn.parentElement;
			parent.remove()
		});
	}

	_itemsMarkup(index) {
		return `
			<div class="form__group--grid add-item">
				<div class="input__box item__name">
					<label for="items[${index}].name" class="input__label">Item Name</label
					><input id="items[${index}].name" name="items[${index}].name" class="form__input" value="" />
				</div>
				<div class="input__box quantity">
					<label for="items[${index}].quantity" class="input__label">Qty.</label>
					<input
						type="number"
						class="form__input"
						name="items[${index}].quantity"
						id="items[${index}].quantity"
						value=""
					/>
				</div>
				<div class="input__box price">
					<label for="items[${index}].price" class="input__label">Price</label
					><input type="number" id="items[${index}].price" name="items[${index}].price" class="form__input" value="" />
				</div>
				<div class="input__box total">
					<label for="items[${index}].total" class="input__label">Total</label
					><input
						id="items[${index}].total"
						name="items[${index}].total"
						disabled=""
						class="form__input"
						disabled
						value="0"
					/>
				</div>
				<button type="button" aria-label="delete item" class="delete delete__item">
					<svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
							fill-rule="nonzero"
						></path>
					</svg>
				</button>
			</div>
		`;
	}
}

export default new FormView();
