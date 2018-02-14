import CompostMixin from '../../build/libs/compost/compost-mixin.js';

class Router extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      path: {
        type: String,
        value: null,
      },

      defaultPage: {
        type: String,
        value: null,
      },
    };
  }

  constructor() {
    super();

    this.onNavigate = this.onNavigate.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.on(this, 'x-update-path', this.updatePath);
    window.addEventListener('popstate', this.onNavigate);

    setTimeout(() => {
      this.onNavigate();
    });
  }

  disconnectedCallback() {
    this.off(this, 'x-update-path', this.updatePath);
    window.removeEventListener('popstate', this.onNavigate);
  }

  onNavigate() {
    this.path = window.location.pathname;

    let [, page, subPage] = this.path.split('/');
    if (page === 'index.html') {
      page = '';
    }

    this.fire('x-update-path', {
      page: page || this.defaultPage,
      subPage,
      replace: true,
    });
  }

  updatePath(event) {
    const { page, subPage, replace } = event.detail;
    this.path = `/${page}/${subPage || ''}`;

    if (replace) {
      history.replaceState({}, '', this.path);
    } else {
      history.pushState({}, '', this.path);
    }

    const app = this.$('slot').assignedNodes()[1];

    app.currentPage = {
      id: page,
      subId: subPage || 0,
    };
  }

  render() {
    return `<slot></slot>`;
  }
}

customElements.define('x-router', Router);
