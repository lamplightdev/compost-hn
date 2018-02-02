import ListMixin from './list-mixin.js';

class New extends ListMixin(HTMLElement) {
  constructor() {
    super();

    this._type = 'new';
  }
}

customElements.define('x-view-new', New);
