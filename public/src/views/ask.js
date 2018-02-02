import ListMixin from './list-mixin.js';

class Ask extends ListMixin(HTMLElement) {
  constructor() {
    super();

    this._type = 'ask';
  }
}

customElements.define('x-view-ask', Ask);
