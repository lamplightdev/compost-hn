import ListMixin from './list-mixin.js';

class Job extends ListMixin(HTMLElement) {
  constructor() {
    super();

    this._type = 'jobs';
  }
}

customElements.define('x-view-job', Job);
