import ListMixin from './list-mixin.js';

class Top extends ListMixin(HTMLElement) {
  constructor() {
    super();

    this._type = 'news';
  }
}

customElements.define('x-view-top', Top);
