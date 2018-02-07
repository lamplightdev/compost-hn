import CompostMixin from '../../build/libs/compost/compost-mixin.js';

class Loading extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      show: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: 'observeShow',
      },
    };
  }

  render() {
    return `
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :host(.hide) {
          display: none;
        }

        img {
          width: 20px;
          height: 20px;
        }
      </style>

      <img src="/images/loading.svg" alt="Loading...">
    `;
  }

  observeShow(oldValue, newValue) {
    if (newValue) {
      this.classList.remove('hide');
    } else {
      this.classList.add('hide');
    }
  }
}

customElements.define('x-loading', Loading);
