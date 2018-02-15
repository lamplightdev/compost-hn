// import 'babel-polyfill/dist/polyfill.js';
import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import './router.js';
import './nav.js';
import './view.js';

class App extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      nav: {
        type: Array,
        value: [{
          id: 'top',
          name: 'top',
        }, {
          id: 'new',
          name: 'new',
        }, {
          id: 'show',
          name: 'show',
        }, {
          id: 'ask',
          name: 'ask',
        }, {
          id: 'job',
          name: 'jobs',
        }, {
          id: 'about',
          name: 'about',
        }],
        observer: 'observeNav',
      },

      currentPage: {
        type: Object,
        value: {
          id: null,
          subId: null,
        },
        observer: 'observeCurrentPage',
      }
    }
  }

  render() {
    return `
      <style>
        :host {
          contain: content;
          display: flex;
          flex-direction: column;
          max-width: 1280px;
          margin: 0 auto;
        }
      </style>

      <x-nav></x-nav>
      <main>
        <x-view id="view"></x-view>
      </main>
    `;
  }

  observeNav(oldValue, newValue) {
    this.$('x-nav').items = newValue;
  }

  observeCurrentPage(oldValue, newValue) {
    window.scrollTo(0, 0);

    this.$('x-nav').current = newValue.id;
    this.$('x-view').current = newValue;
  }
}

customElements.define('x-app', App);
