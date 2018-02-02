import CompostMixin from '../../build/libs/compost/compost-mixin.js';

class Router extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      path: {
        type: String,
        value: null,
        observer: 'observePath',
      },
      defaultPage: {
        type: String,
        value: null,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    requestAnimationFrame(() => {
      this.path = window.location.pathname;
      this.updatePath(this.path);
    });
  }

  observePath(oldValue, newValue) {
    if (newValue) {
      history.pushState({}, '', newValue);
    }
  }

  updatePath(path) {
    const [, page, subPage] = path.split('/');

    this.fire('x-update-path', {
      page: page || this.defaultPage,
      subPage: subPage || 0,
    });
  }
}

customElements.define('x-router', Router);
