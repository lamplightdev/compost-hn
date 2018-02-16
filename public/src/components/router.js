import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';

class Router extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      // current path
      path: {
        type: String,
        value: null,
      },

      // page to load if path === /
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

    // on load, navigate to correct page
    setTimeout(() => {
      this.onNavigate();
    });
  }

  disconnectedCallback() {
    this.off(this, 'x-update-path', this.updatePath);
    window.removeEventListener('popstate', this.onNavigate);
  }

  // called when url is changed
  onNavigate() {
    this.path = window.location.pathname;

    let [, page] = this.path.split('/');
    const [, , subPage] = this.path.split('/');

    if (page === 'index.html') {
      page = '';
    }

    this.fire('x-update-path', {
      page: page || this.defaultPage,
      subPage,
      replace: true,
    });
  }

  // update path on x-update-path event
  updatePath(event) {
    const { page, subPage, replace } = event.detail;
    this.path = `/${page}/${subPage || ''}`;

    if (replace) {
      // replace will be true on page load, and browser back/forward
      window.history.replaceState({}, '', this.path);
    } else {
      window.history.pushState({}, '', this.path);
    }

    // bit hacky to get x-app element (should be only child of this element)
    const app = this.$('slot').assignedNodes()[1];

    app.currentPage = {
      id: page,
      subId: subPage || 0,
    };
  }

  render() {
    // render child elements in light DOM
    return '<slot></slot>';
  }
}

customElements.define('x-router', Router);
