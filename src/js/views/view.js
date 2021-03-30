export default class View {
   _parentEl = '';
   _data;

   render(data){
      if(!data && Array.isArray(data) && data.length === 0) return
      this._data = data;

      const markup = this._generateMarkup();
      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
   }

   _clear(){
      this._parentEl.innerHTML = '';
   }
}