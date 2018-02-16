import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';

class NavItem extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      id: {
        type: String,
      },

      href: {
        type: String,
        value: null,
        observer: 'observeHref',
      },

      name: {
        type: String,
        value: null,
        observer: 'observeName',
      },

      current: {
        type: Boolean,
        value: false,
        observer: 'observeCurrent',
      },
    };
  }

  render() {
    return `
      <style>
        a {
          contain: content;
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          padding: 1rem 0.5rem;
          border-bottom: 3px solid transparent;
        }

        a.current {
          border-bottom-color: white;
        }
      </style>
      <a id="link" href="" on-click="navigate"></a>
    `;
  }

  observeHref(oldValue, newValue) {
    this.$id.link.href = newValue;
  }

  observeName(oldValue, newValue) {
    this.$id.link.textContent = newValue;
  }

  observeCurrent(oldValue, newValue) {
    if (newValue) {
      this.$id.link.classList.add('current');
    } else {
      this.$id.link.classList.remove('current');
    }
  }

  navigate(event) {
    event.preventDefault();

    // event will be consumed by x-router
    this.fire('x-update-path', {
      page: this.id,
    });
  }
}

customElements.define('x-nav-item', NavItem);
