import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import CompostRepeatMixin from '../../../node_modules/@lamplightdev/compost/src/repeat-mixin.js';

import './nav-item.js';

class Nav extends CompostRepeatMixin(CompostMixin(HTMLElement)) {
  static get properties() {
    return {
      items: {
        type: Array,
        value: [],
        observer: 'observeItems',
      },

      current: {
        type: String,
        value: null,
        observer: 'observeCurrent',
      },
    };
  }

  render() {
    return super.render(`
      <style>
        :host {
          contain: content;
          display: flex;
          align-items: center;
          justify-content: space-between;

          background-color: #86AB83;
          margin-bottom: 1rem;
        }

        #logo {
          padding: 5px;
          background-color: white;
          margin-left: 1rem;
          display: flex;
          align-items: center;
          border-radius: 3px;
        }

        #logo img {
          height: 20px;
          width: 20px;
        }

        ::slotted(x-nav-item) {
          display: flex;
          flex-grow: 0;
        }

        ::slotted(x-nav-item:first-of-type) {
          margin-left: 1rem;
        }

        ::slotted(x-nav-item:last-child) {
          margin-right: 1rem;
          flex-grow: 1;
          justify-content: flex-end;
        }
      </style>
      <div id="logo">
        <img src="/images/logo.svg" alt="compost">
      </div>
    `);
  }

  getTemplateString() {
    return `
      <x-nav-item></x-nav-item>
    `;
  }

  getKey(value) {
    return value.id;
  }

  observeCurrent(oldValue, newValue) {
    this.$('slot').assignedNodes().forEach((el) => {
      el.current = newValue === el.id;
    });
  }

  updateItem(el, value) {
    el.href = `/${value.id}`;
    el.name = value.name;
    el.id = value.id;
  }
}

customElements.define('x-nav', Nav);
