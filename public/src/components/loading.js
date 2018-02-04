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

          animation: rotation 2s infinite linear;
        }

        @keyframes rotation {
		      from {
				    transform: rotate(0deg);
          }

		      to {
				    transform: rotate(359deg);
		      }
        }

        :host(.hide) {
          display: none;
        }

        img {
          width: 20px;
          height: auto;
          margin-top: -6px;
        }
      </style>

      <img src="/images/logo.svg" alt="Loading...">
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
