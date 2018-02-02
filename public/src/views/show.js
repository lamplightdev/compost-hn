import ListMixin from './list-mixin.js';

class Show extends ListMixin(HTMLElement) {
  constructor() {
    super();

    this._type = 'show';
  }
}

customElements.define('x-view-show', Show);
